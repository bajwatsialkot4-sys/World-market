
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Product, CartItem, SaleRecord, Customer, Currency, Language, CurrencyCode, LanguageCode, SellerInfo, AppNotification } from '../types';
import { PRODUCTS, CATEGORIES, MOCK_CUSTOMERS, CURRENCIES, LANGUAGES, SELLERS, ADMIN_EMAILS } from '../constants';
import { detectShowName } from '../services/routingUtils';
import { 
  collection, 
  onSnapshot, 
  doc, 
  setDoc, 
  updateDoc, 
  query, 
  orderBy,
  addDoc,
  serverTimestamp,
  getDocs,
  writeBatch,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db, auth, validateConnection } from '../services/firebase';

const getSafeTime = (datePosted: any): number => {
  if (!datePosted) return 0;
  if (typeof datePosted === 'object') {
    if (typeof datePosted.toDate === 'function') {
      try { return datePosted.toDate().getTime(); } catch (e) {}
    }
    if (typeof datePosted.seconds === 'number') {
      return datePosted.seconds * 1000;
    }
  }
  if (typeof datePosted === 'string') {
    const isoStr = datePosted.trim().replace(' ', 'T');
    const parsed = Date.parse(isoStr);
    return isNaN(parsed) ? 0 : parsed;
  }
  const parsed = Number(datePosted);
  return isNaN(parsed) ? 0 : parsed;
};

export const normalizeCategory = (cat: string): string => {
  if (!cat) return '';
  const c = cat.toLowerCase().trim();
  if (c === 'hoodie' || c === 'hoodies' || c.includes('hoodie')) return 'hoodie';
  if (c === 'tshirt' || c === 't-shirt' || c === 't shirt' || c === 't-shirts' || c.includes('t-shirt') || c.includes('tshirt') || c.includes('tee') || c === 'polo') return 'tshirt';
  if (c === 'jacket' || c === 'jackets' || c.includes('jacket') || c.includes('coat') || c.includes('blazer') || c.includes('windbreaker')) return 'jacket';
  if (c === 'shoes' || c === 'shoe' || c.includes('shoe') || c.includes('footwear') || c.includes('sneaker') || c.includes('boot')) return 'shoes'; 
  if (c === 'cap' || c === 'caps' || c.includes('cap') || c.includes('hat')) return 'cap';
  if (c === 'shorts' || c === 'short' || c.includes('short') || c.includes('jogger') || c.includes('pant') || c.includes('yoga')) return 'shorts';
  if (c === 'tracksuit' || c === 'tracksuits' || c.includes('tracksuit')) return 'tracksuit';
  if (c === 'jersey' || c === 'jerseys' || c.includes('jersey') || c.includes('uniform')) return 'jersey';
  if (c.includes('electronic')) return 'electronics';
  if (c.includes('book')) return 'books';
  if (c.includes('jean') || c.includes('denim')) return 'jeans';
  if (c.includes('accessory') || c.includes('bag') || c.includes('belt') || c.includes('sock') || c.includes('backpack')) return 'accessories';
  return c;
};

export const sanitizeProduct = (docId: string, data: Record<string, any>): Product => {
  let datePosted = new Date().toISOString();
  if (data.datePosted) {
    if (typeof data.datePosted === 'object' && typeof data.datePosted.toDate === 'function') {
      datePosted = data.datePosted.toDate().toISOString();
    } else if (typeof data.datePosted === 'string') {
      datePosted = data.datePosted;
    } else if (typeof data.datePosted === 'number') {
      datePosted = new Date(data.datePosted).toISOString();
    } else if (data.datePosted.seconds) {
      datePosted = new Date(data.datePosted.seconds * 1000).toISOString();
    }
  }

  const rawCategory = (data.category || '').toString().trim();
  const rawId = (docId || '').toLowerCase();
  const rawName = (data.name || '').toLowerCase();

  let category = rawCategory;
  if (!category || category === 'Clothing' || category === 'Sportswear' || category === 'sportswear' || category === 'General' || category === 'Outdoor') {
    if (rawId.includes('hoodie') || rawName.includes('hoodie')) category = 'hoodie';
    else if (rawId.includes('jacket') || rawName.includes('jacket') || rawName.includes('blazer') || rawName.includes('sweater')) category = 'jacket';
    else if (rawId.includes('shoe') || rawId.includes('sneaker') || rawId.includes('boot') || rawName.includes('shoe') || rawName.includes('sneaker')) category = 'shoes';
    else if (rawId.includes('shorts') || rawId.includes('jogger') || rawName.includes('short') || rawName.includes('jogger') || rawName.includes('yoga')) category = 'shorts';
    else if (rawId.includes('tracksuit') || rawName.includes('tracksuit')) category = 'tracksuit';
    else if (rawId.includes('jersey') || rawName.includes('jersey') || rawName.includes('uniform') || rawName.includes('kit')) category = 'jersey';
    else if (rawId.includes('polo') || rawId.includes('tshirt') || rawName.includes('t-shirt') || rawName.includes('polo') || rawName.includes('graphic')) category = 'tshirt';
    else if (rawId.includes('cap') || rawName.includes('cap')) category = 'cap';
  }

  const normalizedCat = normalizeCategory(category);

  const mainImage = data.image || (Array.isArray(data.images) && data.images[0]) || 'https://picsum.photos/seed/product/400/400';
  const imagesList = Array.isArray(data.images) && data.images.length > 0 ? data.images : [mainImage];

  return {
    id: docId,
    name: (data.name || 'Untitled Product').toString(),
    category: normalizedCat || rawCategory || 'general',
    description: (data.description || '').toString(),
    image: mainImage,
    images: imagesList,
    price: Number(data.price) || 0,
    oldPrice: data.oldPrice ? Number(data.oldPrice) : undefined,
    discount: data.discount ? Number(data.discount) : undefined,
    offer: data.offer && String(data.offer).trim() !== '' ? String(data.offer).trim() : undefined,
    rating: Number(data.rating) || 5.0,
    stock: typeof data.stock === 'number' ? data.stock : 100,
    datePosted: datePosted,
    fabric: data.fabric?.toString(),
    quality: data.quality || 'Export Quality',
    sizes: Array.isArray(data.sizes) && data.sizes.length > 0 ? data.sizes : ['S', 'M', 'L', 'XL'],
    colors: Array.isArray(data.colors) && data.colors.length > 0 ? data.colors : ['Black', 'White'],
    reviews: Array.isArray(data.reviews) ? data.reviews : [],
    shippingCountry: data.shippingCountry || 'Worldwide',
    sellerId: data.sellerId,
    sales: Number(data.sales) || 0,
    viewers: Number(data.viewers) || 0,
    metaTitle: data.metaTitle,
    metaDescription: data.metaDescription,
    metaKeywords: data.metaKeywords,
    imageAlt: data.imageAlt || data.name,
    badges: Array.isArray(data.badges) ? data.badges : ['New'],
    tags: Array.isArray(data.tags) ? data.tags : [normalizedCat, data.name],
    ratingCount: Number(data.ratingCount) || 0
  };
};

const normalizedStaticProducts: Product[] = PRODUCTS.map(p => sanitizeProduct(p.id, p));

const getInitialProducts = (): Product[] => {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('cached_firestore_products');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const sanitizedCached = parsed.map(p => sanitizeProduct(p.id || p.docId, p));
          const dbIds = new Set(sanitizedCached.map(p => p.id));
          return [...sanitizedCached, ...normalizedStaticProducts.filter(p => !dbIds.has(p.id))];
        }
      }
    } catch (e) {
      console.warn("Failed to load cached products:", e);
    }
  }
  return normalizedStaticProducts;
};

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  sales: SaleRecord[];
  customers: Customer[];
  activeShowName: string | null;
  referralCode: string | null;
  activeSeller: SellerInfo | null;
  sellers: SellerInfo[];
  currency: Currency;
  language: Language;
  quickViewProduct: Product | null;
  isProductsLoading: boolean;
  hasMoreProducts: boolean;
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  normalizeCategory: (cat: string) => string;
  setCurrency: (code: CurrencyCode) => void;
  setLanguage: (code: LanguageCode) => void;
  setQuickViewProduct: (product: Product | null) => void;
  formatPrice: (amount: number) => string;
  addProduct: (product: Omit<Product, 'id' | 'datePosted'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void;
  clearCart: () => void;
  addSale: (sale: Omit<SaleRecord, 'id' | 'date'>) => Promise<void>;
  addSeller: (seller: Omit<SellerInfo, 'id' | 'joinedDate' | 'totalSales' | 'rating' | 'rank' | 'isVerified' | 'verificationStatus'>) => Promise<void>;
  updateSaleStatus: (id: string, status: SaleRecord['status']) => Promise<void>;
  loadMoreProducts: () => Promise<void>;
  searchProducts: (query: string, category?: string) => Product[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => Promise<void>;
  markNotificationAsRead: (id: string) => Promise<void>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(getInitialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [sales, setSales] = useState<SaleRecord[]>([]);
  const [sellers, setSellers] = useState<SellerInfo[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  // Real-time synchronization with Firestore
  useEffect(() => {
    validateConnection();
    
    // Request notification permission safely (prevent iOS Safari crash)
    if (typeof window !== 'undefined' && 'Notification' in window) {
      try {
        if (Notification.permission === 'default') {
          Notification.requestPermission().catch(() => {});
        }
      } catch (e) {
        // Safe fallback for iOS Safari
      }
    }

    const q = query(collection(db, 'products')); 
    const unsubscribeProducts = onSnapshot(q, (snapshot) => {
      const dbProducts = snapshot.docs.map(doc => sanitizeProduct(doc.id, doc.data()));
      
      // Sort products by post date descending
      dbProducts.sort((a, b) => getSafeTime(b.datePosted) - getSafeTime(a.datePosted));

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('cached_firestore_products', JSON.stringify(dbProducts));
        } catch (e) {
          console.warn("Failed to update cached products:", e);
        }
      }

      // Merge Firestore products with static PRODUCTS but deduplicate by ID
      const dbIds = new Set(dbProducts.map(p => p.id));
      const combined = [...dbProducts, ...normalizedStaticProducts.filter(p => !dbIds.has(p.id))];
      
      console.log(`[StoreContext Sync] Total hardcoded products loaded: ${normalizedStaticProducts.length}`);
      console.log(`[StoreContext Sync] Total Firestore products loaded: ${dbProducts.length}`);
      console.log(`[StoreContext Sync] Total merged products: ${combined.length}`);

      setProducts(combined);
      setHasMoreProducts(false);
      setIsProductsLoading(false);
    }, (error) => {
      console.error("Products sync error:", error);
      setIsProductsLoading(false);
    });

    const unsubscribeSales = onSnapshot(
      query(collection(db, 'sales'), orderBy('date', 'desc')), 
      (snapshot) => {
        const salesList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SaleRecord));
        setSales(salesList);
      },
      (error) => console.warn("Sales access restricted:", error.message)
    );

    const unsubscribeSellers = onSnapshot(
      collection(db, 'sellers'), 
      (snapshot) => {
        const sellerList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SellerInfo));
        if (sellerList.length === 0) {
          const userEmail = auth.currentUser?.email;
          if (userEmail && ADMIN_EMAILS.includes(userEmail)) {
            const batch = writeBatch(db);
            SELLERS.forEach(s => {
              const docRef = doc(db, 'sellers', s.id);
              batch.set(docRef, s);
            });
            batch.commit().catch(err => console.warn("Failed to bootstrap sellers:", err));
          }
        } else {
          setSellers(sellerList);
        }
      },
      (error) => console.error("Sellers sync error:", error)
    );

    const unsubscribeNotifications = onSnapshot(
      query(collection(db, 'notifications'), orderBy('timestamp', 'desc'), limit(50)),
      (snapshot) => {
        const notifList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as AppNotification));
        
        const newItems = snapshot.docChanges().filter(change => change.type === 'added');
        if (newItems.length > 0 && !snapshot.metadata.fromCache) {
          newItems.forEach(change => {
            const data = change.doc.data();
            if (Notification.permission === 'granted') {
              new Notification(data.title, { body: data.message });
            }
          });
        }
        setNotifications(notifList);
      },
      (error) => console.warn("Notifications sync error:", error)
    );
    
    return () => {
      unsubscribeProducts();
      unsubscribeSales();
      unsubscribeSellers();
      unsubscribeNotifications();
    };
  }, []);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter(n => !n.isRead).length;
  }, [notifications]);

  const loadMoreProducts = async () => {
    if (!lastVisible || !hasMoreProducts || isProductsLoading) return;
    setIsProductsLoading(true);
    try {
      const q = query(
        collection(db, 'products'), 
        orderBy('datePosted', 'desc'), 
        startAfter(lastVisible), 
        limit(24)
      );
      const snapshot = await getDocs(q);
      const newProducts = snapshot.docs.map(doc => sanitizeProduct(doc.id, doc.data()));
      if (newProducts.length > 0) {
        setProducts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNew = newProducts.filter(p => !existingIds.has(p.id));
          return [...prev, ...uniqueNew];
        });
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMoreProducts(snapshot.docs.length === 24);
      } else {
        setHasMoreProducts(false);
      }
    } catch (error) {
      console.error("Load more products error:", error);
    } finally {
      setIsProductsLoading(false);
    }
  };

  const searchProducts = useCallback((term: string, category: string = 'All'): Product[] => {
    const rawCategoryInput = (category || 'All').trim();
    const normSearchCategory = normalizeCategory(rawCategoryInput);
    
    // Clean and decode search term robustly (handling potential percent encodings and URL parameters)
    let processedTerm = '';
    try {
      processedTerm = decodeURIComponent(term || '');
    } catch (e) {
      try {
        processedTerm = decodeURI(term || '');
      } catch (err) {
        processedTerm = term || '';
      }
    }

    processedTerm = processedTerm.toLowerCase().trim();
    if (processedTerm.includes('?q=')) {
      processedTerm = processedTerm.split('?q=').pop() || '';
    }
    if (processedTerm.includes('&')) {
      processedTerm = processedTerm.split('&')[0] || processedTerm;
    }

    // Safely remove trailing slashes before path splitting
    processedTerm = processedTerm.replace(/\/+$/, '');
    if (processedTerm.includes('/')) {
      const parts = processedTerm.split('/').filter(Boolean);
      processedTerm = parts.pop() || processedTerm;
    }
    
    // Standardize all types of whitespace (including non-breaking spaces \u00A0 often sent by iOS keyboard/autocorrect) to normal single spaces
    processedTerm = processedTerm.replace(/[\s\u00A0\u1680\u180e\u2000-\u200a\u2028\u2029\u202f\u205f\u3000]+/g, ' ');
    
    // Normalize smart/curly quotes (which iOS autocorrect inserts automatically)
    processedTerm = processedTerm.replace(/[\u201c\u201d\u2018\u2019"']/g, '');

    // Safely remove leading and trailing garbage punctuation without stripping non-English letters
    processedTerm = processedTerm.replace(/^[\?\*!\.,\-\+\/\\_]+/, '').replace(/[\?\*!\.,\-\+\/\\_]+$/, '').trim();
    
    const isCategoryAll = !rawCategoryInput || 
                          rawCategoryInput.toLowerCase() === 'all' || 
                          normSearchCategory.toLowerCase() === 'all';

    let filtered = [...products];

    // 1. Category Filtering
    if (!isCategoryAll) {
      const catLower = rawCategoryInput.toLowerCase();
      const normTarget = normSearchCategory.toLowerCase();

      filtered = filtered.filter(p => {
        const pCatRaw = (p.category || '').toLowerCase().trim();
        const pCatNorm = normalizeCategory(p.category || '').toLowerCase().trim();

        return pCatNorm === normTarget || pCatRaw === catLower;
      });
    }

    // 2. Search Term Filtering
    if (processedTerm) {
      let queryNorm = processedTerm;
      queryNorm = queryNorm.replace(/\bt[\s\-_]*shirt(s)?\b/g, 'tshirt');
      queryNorm = queryNorm.replace(/\bgraphic[\s\-_]*tshirt(s)?\b/g, 'graphic tshirt');
      queryNorm = queryNorm.replace(/\bgym[\s\-_]*tank(s)?\b/g, 'gym tank');

      const rawTokens = queryNorm
        .split(/[\s\-_]+/)
        .filter(w => w.length > 0);

      const STOP_WORDS = new Set(['best', 'top', 'cheap', 'buy', 'online', 'good', 'great', 'quality', 'the', 'a', 'an', 'for', 'with', 'and', 'in', 'of', 'on', 'to']);
      
      const meaningfulTokens = rawTokens.filter(w => !STOP_WORDS.has(w));
      const activeTokens = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens;

      filtered = filtered.filter(p => {
        const pName = (p.name || '').toLowerCase();
        const pCatRaw = (p.category || '').toLowerCase();
        const pCatNorm = normalizeCategory(pCatRaw).toLowerCase();
        const pTags = (p.tags || []).map(t => String(t).toLowerCase());
        const pKeywords = (p.metaKeywords || '').toLowerCase();
        const pDesc = (p.description || '').toLowerCase();
        const pOffer = (p.offer || '').toLowerCase();

        // Exact term or phrase match
        if (pName.includes(processedTerm) || 
            pName.includes(queryNorm) || 
            pCatRaw.includes(processedTerm) || 
            pCatNorm.includes(processedTerm) || 
            pKeywords.includes(processedTerm) || 
            pOffer.includes(processedTerm) ||
            pTags.some(t => t.includes(processedTerm) || t.includes(queryNorm))) {
          return true;
        }

        if (activeTokens.length === 0) return false;

        return activeTokens.every(token => {
          const isHoodieToken = token === 'hoodie' || token === 'hoodies';
          const isShoeToken = token === 'shoe' || token === 'shoes' || token === 'sneaker' || token === 'sneakers' || token === 'boot' || token === 'boots' || token === 'footwear';
          const isTshirtToken = token === 'tshirt' || token === 'shirt' || token === 'shirts' || token === 'tee' || token === 'tees' || token === 'polo' || token === 'graphic';
          const isJacketToken = token === 'jacket' || token === 'jackets' || token === 'coat' || token === 'blazer';
          const isTracksuitToken = token === 'tracksuit' || token === 'tracksuits';
          const isCapToken = token === 'cap' || token === 'caps' || token === 'hat' || token === 'hats';
          const isShortsToken = token === 'shorts' || token === 'short' || token === 'jogger' || token === 'joggers';

          if (isHoodieToken) return pCatNorm === 'hoodie' || pName.includes('hoodie');
          if (isShoeToken) return pCatNorm === 'shoes' || pName.includes('shoe') || pName.includes('sneaker') || pName.includes('boot') || pName.includes('footwear');
          if (isTshirtToken) return pCatNorm === 'tshirt' || pName.includes('tshirt') || pName.includes('t-shirt') || pName.includes('polo') || pName.includes('shirt') || pName.includes('graphic');
          if (isJacketToken) return pCatNorm === 'jacket' || pName.includes('jacket') || pName.includes('coat') || pName.includes('blazer');
          if (isTracksuitToken) return pCatNorm === 'tracksuit' || pName.includes('tracksuit');
          if (isCapToken) return pCatNorm === 'cap' || pName.includes('cap') || pName.includes('hat');
          if (isShortsToken) return pCatNorm === 'shorts' || pName.includes('short') || pName.includes('jogger');

          return pName.includes(token) || 
                 pCatRaw.includes(token) || 
                 pCatNorm.includes(token) ||
                 pTags.some(t => t.includes(token)) ||
                 pKeywords.includes(token) ||
                 pDesc.includes(token) ||
                 pOffer.includes(token);
        });
      });
    }

    console.log(`[StoreContext Search] Total products before filtering: ${products.length} | Total products after filtering: ${filtered.length} (Query: "${term}", Category: "${category}")`);

    // Deduplicate and return
    const uniqueMap = new Map();
    filtered.forEach(p => uniqueMap.set(p.id, p));
    
    return Array.from(uniqueMap.values());
  }, [products]);

  const [activeShowName, setActiveShowName] = useState<string | null>(detectShowName());
  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [activeSeller, setActiveSeller] = useState<SellerInfo | null>(null);
  
  const [currency, setCurrencyState] = useState<Currency>(CURRENCIES[0]);
  const [language, setLanguageState] = useState<Language>(LANGUAGES[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    const detected = detectShowName();
    if (detected) setActiveShowName(detected);
    
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    const sellerParam = urlParams.get('seller');
    
    if (sellerParam) {
      setReferralCode(sellerParam);
      sessionStorage.setItem('referralCode', sellerParam);
    } else if (ref) {
      setReferralCode(ref);
      sessionStorage.setItem('referralCode', ref);
    } else {
      const storedRef = sessionStorage.getItem('referralCode');
      if (storedRef) setReferralCode(storedRef);
    }
    
    const browserLang = navigator.language.split('-')[0];
    const foundLang = LANGUAGES.find(l => l.code === browserLang);
    if (foundLang) setLanguageState(foundLang);

    const locale = navigator.language;
    if (locale.includes('GB')) setCurrency('GBP');
    else if (locale.includes('PK')) setCurrency('PKR');
    else if (locale.includes('AE')) setCurrency('AED');
    else if (locale.includes('DE') || locale.includes('FR') || locale.includes('ES')) setCurrency('EUR');
    else setCurrency('USD');
  }, []);

  useEffect(() => {
    const sellerId = referralCode || activeShowName;
    if (sellerId) {
      const found = sellers.find(s => s.showName.toLowerCase() === sellerId.toLowerCase());
      if (found) {
        setActiveSeller(found);
      } else {
        setActiveSeller(null);
      }
    } else {
      setActiveSeller(null);
    }
  }, [activeShowName, referralCode, sellers]);

  const setCurrency = (code: CurrencyCode) => {
    const found = CURRENCIES.find(c => c.code === code);
    if (found) setCurrencyState(found);
  };

  const setLanguage = (code: LanguageCode) => {
    const found = LANGUAGES.find(l => l.code === code);
    if (found) {
      setLanguageState(found);
      document.documentElement.dir = found.dir;
      document.documentElement.lang = found.code;
    }
  };

  const formatPrice = (amount: number) => {
    const safeAmount = typeof amount === 'number' && !isNaN(amount) ? amount : 0;
    const converted = safeAmount * (currency?.rate || 1);
    return `${currency?.symbol || '$'}${converted.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const addProduct = async (newP: Omit<Product, 'id' | 'datePosted'>) => {
    try {
      const docRef = doc(collection(db, 'products'));
      const productData = {
        ...newP,
        category: normalizeCategory(newP.category || ''),
        id: docRef.id,
        datePosted: new Date().toISOString()
      };
      await setDoc(docRef, sanitizeFirestoreData(productData));
    } catch (e) {
      console.error("Error adding product:", e);
      throw e;
    }
  };

  const updateProduct = async (id: string, updatedP: Partial<Product>) => {
    try {
      const docRef = doc(db, 'products', id);
      const finalUpdate = { ...updatedP };
      if (finalUpdate.category) {
        finalUpdate.category = normalizeCategory(finalUpdate.category);
      }
      await updateDoc(docRef, sanitizeFirestoreData(finalUpdate));
    } catch (e) {
      console.error("Error updating product:", e);
      throw e;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, 'products', id));
      await batch.commit();
    } catch (e) {
      console.error("Error deleting product:", e);
      throw e;
    }
  };

  const addToCart = (product: Product, quantity: number = 1, selectedSize?: string, selectedColor?: string) => {
    if (!product || !product.id) {
      console.warn("addToCart called with invalid product:", product);
      return;
    }
    const safeQty = Math.max(1, Number(quantity) || 1);
    const size = selectedSize || product.sizes?.[0] || 'Standard';
    const color = selectedColor || product.colors?.[0] || 'Default';
    const safePrice = typeof product.price === 'number' && !isNaN(product.price) ? product.price : 0;
    const safeProduct: Product = {
      ...product,
      price: safePrice,
      image: product.image || (Array.isArray(product.images) && product.images[0]) || 'https://picsum.photos/seed/product/400/400',
      sizes: Array.isArray(product.sizes) && product.sizes.length > 0 ? product.sizes : ['Standard'],
      colors: Array.isArray(product.colors) && product.colors.length > 0 ? product.colors : ['Default'],
      sellerId: product.sellerId || 'seller-1'
    };

    setCart(prev => {
      const exists = prev.find(item => 
        item.id === safeProduct.id && item.selectedSize === size && item.selectedColor === color
      );
      if (exists) {
        return prev.map(item => 
          (item.id === safeProduct.id && item.selectedSize === size && item.selectedColor === color) 
          ? { ...item, quantity: item.quantity + safeQty } 
          : item
        );
      }
      return [...prev, { ...safeProduct, quantity: safeQty, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (id: string, selectedSize?: string, selectedColor?: string) => {
    setCart(prev => prev.filter(item => 
      !(item.id === id && item.selectedSize === selectedSize && item.selectedColor === selectedColor)
    ));
  };

  const clearCart = () => setCart([]);

  const sanitizeFirestoreData = (data: any): any => {
    if (data === undefined) return null;
    if (data === null) return null;
    if (Array.isArray(data)) {
      return data.map(item => sanitizeFirestoreData(item));
    }
    if (typeof data === 'object') {
      const clean: any = {};
      for (const key of Object.keys(data)) {
        const val = data[key];
        if (val !== undefined) {
          clean[key] = sanitizeFirestoreData(val);
        } else {
          clean[key] = null;
        }
      }
      return clean;
    }
    return data;
  };

  const addSale = async (newSale: Omit<SaleRecord, 'id' | 'date'>) => {
    try {
      const docRef = doc(collection(db, 'sales'));
      
      const safeProducts = (newSale.products || []).map(p => ({
        productId: p.productId || '',
        name: p.name || '',
        price: p.price || 0,
        quantity: p.quantity || 1,
        size: p.size || 'Standard',
        color: p.color || 'Default'
      }));

      const saleData = {
        ...newSale,
        id: docRef.id,
        date: new Date().toISOString(),
        status: newSale.status || 'Pending Payment',
        customerName: newSale.customerName || '',
        customerPhone: newSale.customerPhone || '',
        customerEmail: newSale.customerEmail || 'N/A',
        customerAddress: newSale.customerAddress || '',
        customerCity: newSale.customerCity || 'N/A',
        customerCountry: newSale.customerCountry || 'N/A',
        customerZip: newSale.customerZip || 'N/A',
        amount: newSale.amount || 0,
        sellerId: newSale.sellerId || 'admin',
        sellerShopName: newSale.sellerShopName || 'Main Admin',
        products: safeProducts
      };

      const cleanSaleData = sanitizeFirestoreData(saleData);
      console.log("FINAL ORDER DATA:", cleanSaleData);
      await setDoc(docRef, cleanSaleData);
      
      const productSummary = saleData.products?.map(p => `${p.name} x${p.quantity}`).join(', ') || 'Items';
      const sellerInfo = saleData.sellerShopName ? `[${saleData.sellerShopName}]` : '[Main Admin]';

      await addNotification({
        type: 'New Order',
        title: `Entry: ${saleData.customerName}`,
        message: `${sellerInfo} - ${productSummary}`,
        targetId: docRef.id,
        targetRole: 'admin'
      });

      if (saleData.sellerId && saleData.sellerId !== 'Direct') {
        await addNotification({
          type: 'New Order',
          title: 'You have a new order!',
          message: `Products: ${productSummary} for delivery to ${saleData.customerCity}, ${saleData.customerCountry}`,
          targetId: docRef.id,
          targetRole: 'seller',
          sellerId: saleData.sellerId
        });
      }
    } catch (error) {
      console.error("Error creating sale:", error);
      throw error;
    }
  };

  const addNotification = async (newNotif: Omit<AppNotification, 'id' | 'timestamp' | 'isRead'>) => {
    try {
      const docRef = doc(collection(db, 'notifications'));
      const notifData = {
        ...newNotif,
        id: docRef.id,
        isRead: false,
        timestamp: new Date().toISOString()
      };
      await setDoc(docRef, sanitizeFirestoreData(notifData));
    } catch (e) {
      console.error("Error adding notification:", e);
    }
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      const docRef = doc(db, 'notifications', id);
      await updateDoc(docRef, { isRead: true });
    } catch (e) {
      console.error("Error marking notif as read:", e);
    }
  };

  const addSeller = async (newS: Omit<SellerInfo, 'id' | 'joinedDate' | 'totalSales' | 'rating' | 'rank' | 'isVerified' | 'verificationStatus'>) => {
    const docRef = doc(collection(db, 'sellers'));
    const sellerData = {
      ...newS,
      id: docRef.id,
      joinedDate: new Date().toISOString(),
      totalSales: 0,
      rating: 5.0,
      rank: 'Standard',
      isVerified: false,
      verificationStatus: 'Pending',
      responseTime: "24h"
    };
    await setDoc(docRef, sanitizeFirestoreData(sellerData));
  };

  const updateSaleStatus = async (id: string, status: SaleRecord['status']) => {
    const docRef = doc(db, 'sales', id);
    await updateDoc(docRef, { status });
  };

  return (
    <StoreContext.Provider value={{ 
      products, cart, sales, customers, activeShowName, referralCode, activeSeller, sellers,
      notifications, unreadNotificationsCount, normalizeCategory,
      currency, language, quickViewProduct, isProductsLoading, hasMoreProducts,
      setCurrency, setLanguage, setQuickViewProduct, formatPrice,
      addProduct, updateProduct, deleteProduct, addToCart, removeFromCart, clearCart,
      addSale, addSeller, updateSaleStatus, loadMoreProducts, searchProducts,
      addNotification, markNotificationAsRead
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};
