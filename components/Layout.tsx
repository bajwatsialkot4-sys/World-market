
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import SEO from './SEO';
import { useStore } from '../context/StoreContext';
import { detectShowName } from '../services/routingUtils';
import { CATEGORIES, CURRENCIES, LANGUAGES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ShoppingCart, 
  Globe, 
  ShieldCheck, 
  ChevronDown, 
  User, 
  Menu, 
  X,
  Star,
  Clock,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Package,
  Heart,
  HelpCircle
} from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    products, cart, currency, language, setCurrency, setLanguage, formatPrice,
    quickViewProduct, setQuickViewProduct, addToCart, activeSeller, searchProducts
  } = useStore();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [currentShow, setCurrentShow] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);

  // Load search history from localStorage
  useEffect(() => {
    const history = localStorage.getItem('search_history');
    if (history) {
      setSearchHistory(JSON.parse(history).slice(0, 5));
    }
  }, []);

  const addToHistory = (query: string) => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return;
    const newHistory = [cleanQuery, ...searchHistory.filter(q => q !== cleanQuery)].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('search_history', JSON.stringify(newHistory));
  };

  // Sync current show based on the URL
  useEffect(() => {
    const detected = detectShowName();
    setCurrentShow(detected);
  }, [location]);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedSize(quickViewProduct.sizes?.[0] || '');
      setSelectedColor(quickViewProduct.colors?.[0] || '');
      setQuantity(1);
    }
  }, [quickViewProduct]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      
      // Prevent click/touch disruption on the cart buttons by bypassing state changes
      if (target instanceof Element && (
        target.closest('#mobile-cart-btn') || 
        target.closest('#desktop-cart-btn') || 
        target.closest('a[href*="/cart"]')
      )) {
        return;
      }

      const inDesktop = desktopSearchRef.current && desktopSearchRef.current.contains(target);
      const inMobile = mobileSearchRef.current && mobileSearchRef.current.contains(target);
      if (!inDesktop && !inMobile) {
        setShowSuggestions(prev => {
          if (prev) return false;
          return prev;
        });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const suggestions = useMemo(() => {
    if (!searchQuery.trim()) {
      return {
        products: [...products].sort((a, b) => (b.sales || 0) - (a.sales || 0)).slice(0, 5),
        categories: CATEGORIES.slice(0, 4),
        history: searchHistory,
        isTrending: true
      };
    }
    
    const productResults = searchProducts(searchQuery, searchCategory).slice(0, 8);
    
    // Simple category match
    const searchLower = searchQuery.toLowerCase().trim();
    const categoryMatches = CATEGORIES.filter(c => 
      c.toLowerCase().includes(searchLower) || searchLower.includes(c.toLowerCase())
    ).slice(0, 3);

    return {
      products: productResults,
      categories: categoryMatches,
      history: [],
      isTrending: false
    };
  }, [searchQuery, searchCategory, products, searchProducts, searchHistory]);

  const handleMobileNav = (to: string, e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
    }
    setIsMobileMenuOpen(false);
    navigate(to);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = searchQuery.trim();
    const encodedQuery = encodeURIComponent(cleanQuery);
    const encodedCat = searchCategory !== 'All' ? `category=${encodeURIComponent(searchCategory)}` : '';
    
    let path = currentShow ? `/${currentShow}/search` : '/search';
    
    if (cleanQuery) {
      addToHistory(cleanQuery);
      const separator = encodedCat ? '&' : '';
      navigate(`${path}?q=${encodedQuery}${separator}${encodedCat}`);
    } else if (encodedCat) {
      navigate(`${path}?${encodedCat}`);
    } else {
      navigate(path);
    }
    
    setShowSuggestions(false);
    setIsMobileMenuOpen(false);
  };

  const clearHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('search_history');
  };

  const getLink = (to: string) => {
    const RESERVED_GLOBAL = ['/admin', '/register-show'];
    if (currentShow && !RESERVED_GLOBAL.includes(to)) {
      const cleanTo = to === '/' ? '' : to.startsWith('/') ? to : `/${to}`;
      return `/${currentShow}${cleanTo}`;
    }
    return to;
  };

  const renderSuggestions = () => {
    if (!showSuggestions) return null;
    
    return (
      <AnimatePresence>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-[100]"
        >
          <div className="max-h-[60vh] overflow-y-auto">
            {/* Search History */}
            {suggestions.isTrending && searchHistory.length > 0 && (
              <div className="p-2 border-b border-gray-50">
                <div className="flex justify-between items-center px-4 py-2">
                   <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Recent Searches</p>
                   <button onClick={clearHistory} className="text-[9px] font-bold text-blue-600 hover:underline">Clear</button>
                </div>
                {searchHistory.map(q => (
                  <button
                    key={q}
                    type="button"
                    onMouseDown={() => {
                        setSearchQuery(q);
                        navigate(getLink(`/search?q=${encodeURIComponent(q)}`));
                        setShowSuggestions(false);
                    }}
                    onClick={() => {
                        setSearchQuery(q);
                        navigate(getLink(`/search?q=${encodeURIComponent(q)}`));
                        setShowSuggestions(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-3 group transition-colors cursor-pointer select-none"
                  >
                    <Clock size={14} className="text-gray-300 group-hover:text-blue-500" />
                    <span className="text-sm font-bold text-gray-700 capitalize">{q}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Departments Matching */}
            {suggestions.categories.length > 0 && (
              <div className="p-2 border-b border-gray-50 bg-blue-50/10">
                <p className="px-4 py-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">Departments</p>
                {suggestions.categories.map(cat => (
                  <Link
                    key={cat}
                    to={getLink(`/search?category=${cat}`)}
                    onMouseDown={() => setShowSuggestions(false)}
                    onClick={() => setShowSuggestions(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-white hover:shadow-sm rounded-lg transition-all group cursor-pointer select-none"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                       <Search size={14} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase italic">{cat}</span>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">Shop this collection</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Product Matches */}
            <div className="p-2">
              <p className="px-4 py-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                {suggestions.isTrending ? "Global Trending Selection" : "Store Results"}
              </p>
              {suggestions.products.map(p => (
                <Link 
                  key={p.id}
                  to={getLink(`/products/${p.id}`)}
                  onMouseDown={() => {
                      setShowSuggestions(false);
                      setSearchQuery('');
                  }}
                  onClick={() => {
                      setShowSuggestions(false);
                      setSearchQuery('');
                  }}
                  className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-xl transition-all group border-b border-gray-50 last:border-none cursor-pointer select-none"
                >
                  <div className="w-14 h-14 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 p-1">
                    <img src={p.image} alt={p.name} className="w-full h-full object-contain mix-blend-multiply" loading="lazy" decoding="async" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase truncate italic">{p.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[12px] font-black text-blue-600">{formatPrice(p.price)}</span>
                      <div className="flex items-center gap-1">
                         <Star size={10} fill="currentColor" className="text-yellow-400" />
                         <span className="text-[10px] font-black text-gray-900">{p.rating}</span>
                      </div>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>

            {searchQuery.length > 0 && (
              <button 
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSearch(e);
                }}
                onClick={handleSearch}
                className="w-full py-4 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group cursor-pointer select-none"
              >
                Search all items matching "{searchQuery}"
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-all" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    );
  };

  const t = (key: string, options?: { count?: number }) => {
    const translations: Record<string, any> = {
      en: {
        search_placeholder: "Search for items, brands and more...",
        cart: "Cart",
        account: "Account",
        returns: "Returns",
        orders: "Orders",
        menu: "Menu",
        cart_items_count: (count: number) => `${count} Item${count !== 1 ? 's' : ''}`
      },
      es: {
        search_placeholder: "Buscar artículos, marcas y más...",
        cart: "Carrito",
        account: "Cuenta",
        returns: "Devoluciones",
        orders: "Pedidos",
        menu: "Menú",
        cart_items_count: (count: number) => `${count} Artículo${count !== 1 ? 's' : ''}`
      }
    };

    const lang = language.code as string;
    const langSet = translations[lang] || translations['en'];
    const value = langSet[key] || (translations['en'] && translations['en'][key]) || key;
    
    if (typeof value === 'function' && options?.count !== undefined) {
      return value(options.count);
    }
    return value;
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-yellow-400 selection:text-black bg-white ${language.dir === 'rtl' ? 'rtl' : 'ltr'}`}>
      <SEO />
      
      {/* Amazon Style Desktop Top Bar */}
      <div className="bg-[#131921] py-2 px-4 hidden md:flex justify-between items-center text-xs font-bold text-white tracking-tight border-b border-white/5">
        <div className="flex items-center gap-8">
           <div className="flex items-center gap-2 hover:outline outline-white outline-1 p-1 px-2 cursor-pointer transition-all">
             <Globe size={16} className="text-gray-400" />
             <div className="flex flex-col leading-none">
               <span className="text-gray-400 text-[10px]">Shipping to</span>
               <span className="font-black">Worldwide</span>
             </div>
           </div>
           
           <div className="flex items-center gap-4 text-gray-300">
             <Link to={getLink('/products')} className="hover:text-white transition-colors">Customer Service</Link>
             <Link to={getLink('/')} className="hover:text-white transition-colors">Registry</Link>
             <Link to={getLink('/products')} className="hover:text-white transition-colors">Gift Cards</Link>
             <Link to={getLink('/products')} className="hover:text-white transition-colors">Sell</Link>
           </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="group relative">
             <div className="flex items-center gap-1 hover:outline outline-white outline-1 p-1 px-2 cursor-pointer">
               <span className="text-xl leading-none">{language.flag}</span>
               <span className="font-black uppercase">{language.code}</span>
               <ChevronDown size={12} />
             </div>
             <div className="absolute top-full right-0 mt-0 w-64 bg-white border border-gray-200 rounded-lg shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] p-4">
                <p className="text-gray-900 font-black mb-4 uppercase tracking-widest text-[10px]">Select Language</p>
                <div className="space-y-2">
                  {LANGUAGES.map(l => (
                    <button 
                      key={l.code}
                      onClick={() => setLanguage(l.code)}
                      className={`w-full text-left px-3 py-2 rounded-lg hover:bg-gray-50 text-gray-900 flex items-center justify-between ${language.code === l.code ? 'bg-blue-50 font-black text-blue-600' : ''}`}
                    >
                      <span>{l.flag} {l.name}</span>
                      {language.code === l.code && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                    </button>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-4">
                  <p className="text-gray-900 font-black uppercase tracking-widest text-[10px]">Select Currency</p>
                  <div className="grid grid-cols-2 gap-2">
                    {CURRENCIES.map(c => (
                      <button 
                        key={c.code}
                        onClick={() => setCurrency(c.code)}
                        className={`text-left px-2 py-1.5 rounded-lg border text-[10px] font-bold ${currency.code === c.code ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 text-gray-500 hover:border-gray-300'}`}
                      >
                        {c.code} ({c.symbol})
                      </button>
                    ))}
                  </div>
                </div>
             </div>
           </div>

           <div className="hover:outline outline-white outline-1 p-1 px-2 cursor-pointer">
             <div className="flex flex-col leading-none">
                <span className="text-gray-400 text-[10px]">Hello, sign in</span>
                <span className="font-black">Account & Lists</span>
             </div>
           </div>

           <Link to="/seller-login" className="hover:outline outline-blue-400 outline-1 p-1 px-3 border border-gray-600 rounded-lg cursor-pointer bg-gray-800 flex flex-col justify-center gap-1 group">
             <span className="text-blue-400 text-[9px] font-black uppercase tracking-widest leading-none group-hover:text-white transition-colors">Seller Login</span>
             <span className="text-white text-[10px] font-black uppercase tracking-tight leading-none tracking-widest">Sign In</span>
           </Link>
           
           <Link to={getLink('/products')} className="hover:outline outline-white outline-1 p-1 px-2 cursor-pointer transition-all">
             <div className="flex flex-col leading-none">
                <span className="text-gray-400 text-[10px]">Returns</span>
                <span className="font-black">& Orders</span>
             </div>
           </Link>
        </div>
      </div>

      {/* Main Header - Sticky & Amazon-Themed */}
      <nav className="bg-[#232f3e] text-white sticky top-0 z-50 shadow-xl overflow-visible">
        <div className="max-w-7xl mx-auto px-4 md:px-0">
          <div className="flex items-center h-16 md:h-20 gap-2 md:gap-4 p-2">
            
            {/* Mobile Menu Icon */}
            <button 
              className="md:hidden p-2 active:bg-white/10 rounded-lg"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={28} className="text-white" />
            </button>

            {/* Logo */}
            <Link to={getLink('/')} className="flex-shrink-0 active:scale-95 transition-transform md:px-4 md:hover:outline outline-white outline-1 py-2">
              <BrandLogo className="h-8 md:h-12 w-auto" />
            </Link>

            {/* Mobile Profile & Cart (Always Visible on mobile right) */}
            <div className="flex md:hidden items-center ml-auto gap-1 sm:gap-2 flex-shrink-0 z-[60] relative">
               <Link to="/seller-login" className="p-2 flex items-center text-white/90 hover:text-white flex-shrink-0">
                  <span className="text-[10px] font-black mr-1 hidden xs:inline">Sign In</span>
                  <User size={24} className="pointer-events-none" />
               </Link>
               <Link 
                  id="mobile-cart-btn"
                  to={getLink('/cart')} 
                  className="relative flex items-center justify-center min-w-[54px] min-h-[54px] p-2 rounded-lg active:bg-white/10 z-[70] cursor-pointer flex-shrink-0 select-none pointer-events-auto"
                  aria-label="Shopping Cart"
               >
                  <ShoppingCart size={28} className="pointer-events-none" />
                  {cartCount > 0 && (
                    <span className="absolute top-1 right-1 bg-yellow-400 text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#232f3e] pointer-events-none shadow-sm">
                      {cartCount}
                    </span>
                  )}
               </Link>
            </div>

            {/* Advanced Search - Expanded for Desktop & Prominent for Mobile */}
            <div className="hidden md:block flex-grow relative max-w-4xl" ref={desktopSearchRef}>
              <form onSubmit={handleSearch} className="flex h-11 rounded-lg overflow-hidden shadow-sm group focus-within:ring-4 focus-within:ring-[#febd69]/40 transition-all border-2 border-transparent focus-within:border-[#febd69]">
                <div className="relative group/cat">
                  <select 
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    className="h-full bg-gray-100 px-3 pr-8 flex items-center border-r border-gray-300 text-gray-600 text-[11px] font-black uppercase hover:bg-gray-200 cursor-pointer transition-colors appearance-none outline-none min-w-[60px]"
                  >
                    <option value="All">All</option>
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                    ))}
                  </select>
                  <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
                <input 
                  type="text" 
                  placeholder={t('search_placeholder')}
                  className="flex-grow bg-white px-5 py-2 focus:bg-white transition-all outline-none text-base font-semibold text-gray-900 placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                />
                <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] text-black w-14 flex items-center justify-center transition-colors active:scale-95 border-none">
                  <Search size={22} className="stroke-[3]" />
                </button>
              </form>
              {renderSuggestions()}
            </div>

            {/* Desktop Cart */}
            <Link id="desktop-cart-btn" to={getLink('/cart')} className="hidden md:flex relative items-center gap-2 group md:hover:outline outline-white outline-1 h-full px-4 transition-all cursor-pointer select-none">
              <div className="relative pointer-events-none">
                <ShoppingCart size={32} className="text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 right-0 bg-yellow-400 text-black text-[12px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col justify-center leading-none mt-1 pointer-events-none">
                 <span className="text-[10px] font-black text-white/70 uppercase">Cart</span>
                 <span className="text-sm font-black whitespace-nowrap">{t('cart_items_count', { count: cartCount })}</span>
              </div>
            </Link>
          </div>

          {/* Amazon Mobile Search Bar (Sticky-ish Below header) */}
          <div className="md:hidden px-4 pb-3 relative" ref={mobileSearchRef}>
            <form onSubmit={handleSearch} className="flex relative h-12 rounded-xl overflow-hidden shadow-lg border-2 border-[#131921]">
              <input 
                type="text" 
                placeholder={t('search_placeholder')}
                className="w-full bg-white px-5 py-3 focus:bg-white focus:text-black transition-all outline-none text-sm font-semibold text-gray-900 placeholder:text-gray-500"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
              />
              <button type="submit" className="bg-[#febd69] text-black w-14 flex items-center justify-center active:scale-95 border-none">
                <Search size={22} className="stroke-[3]" />
              </button>
            </form>
            {renderSuggestions()}
          </div>
        </div>

        {/* Amazon Sub-nav (Global Links) */}
        <div className="bg-[#37475a] text-white">
          <div className="max-w-7xl mx-auto flex items-center px-4 py-2 gap-4 md:gap-8 text-xs font-bold whitespace-nowrap overflow-x-auto scrollbar-hide no-scrollbar">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-1.5 hover:outline outline-white outline-1 py-1 pr-4 md:pr-2"
            >
              <Menu size={20} />
              <span className="uppercase font-black text-[11px] tracking-tight">All</span>
            </button>
            <div className="flex items-center gap-4 md:gap-6 border-l border-white/10 pl-4 md:pl-6">
              <Link to="/sport-store" className="text-yellow-400 font-black hover:outline outline-white outline-1 p-1 animate-pulse">Sports Store</Link>
              <Link to={getLink('/search?category=jersey')} className="hover:outline outline-white outline-1 p-1">Uniforms</Link>
              <Link to={getLink('/search?category=electronics')} className="hover:outline outline-white outline-1 p-1">Electronics</Link>
              <Link to={getLink('/search?category=books')} className="hover:outline outline-white outline-1 p-1">Books</Link>
              <Link to={getLink('/search?category=shoes')} className="hover:outline outline-white outline-1 p-1">Footwear</Link>
              <Link to={getLink('/blog')} className="hover:outline outline-white outline-1 p-1">Blog</Link>
            </div>
            
            <div className="ml-auto hidden md:flex items-center gap-2 text-[#febd69] font-black uppercase text-[10px] tracking-widest">
               <Package size={14} />
               <span>Fast Global Delivery</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Location Bar */}
      <div className="md:hidden bg-gradient-to-r from-[#232f3e] to-[#37475a] py-2.5 px-6 flex items-center gap-2 text-white border-t border-white/5">
         <Globe size={14} className="text-blue-400" />
         <span className="text-[11px] font-medium truncate uppercase tracking-widest font-black">Fast Worldwide Shipping Available</span>
      </div>

      {/* Mobile Menu Side Drawer (Amazon Style) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] overflow-hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl animate-slideRight flex flex-col">
            
            {/* Header User Section */}
            <div className="bg-[#232f3e] p-6 pt-10 text-white flex flex-col gap-4">
               <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-xl">
                    <User size={28} />
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                    <X size={32} />
                  </button>
               </div>
               <h3 className="text-xl font-black italic tracking-tighter">Hello, Sign In</h3>
            </div>
            
            <div className="flex-grow overflow-y-auto bg-gray-100">
               <div className="bg-white mb-2 pb-4">
                  <h4 className="px-6 py-4 text-lg font-black uppercase italic tracking-tighter text-gray-900 border-b border-gray-100 mb-2">Shop by Category</h4>
                  <div className="flex flex-col">
                    <button 
                      type="button"
                      onClick={(e) => handleMobileNav('/sport-store', e)}
                      className="px-6 py-4 flex items-center justify-between text-sm font-black text-blue-600 bg-blue-50 text-left w-full cursor-pointer"
                    >
                      Sports Store (Direct Factory)
                      <ArrowRight size={16} />
                    </button>
                    {CATEGORIES.map(cat => (
                      <button 
                        key={cat} 
                        type="button"
                        onClick={(e) => handleMobileNav(getLink(`/search?category=${encodeURIComponent(cat)}`), e)}
                        className="px-6 py-4 flex items-center justify-between text-sm font-bold text-gray-700 hover:bg-gray-50 active:bg-gray-100 text-left w-full cursor-pointer"
                      >
                        {cat.toUpperCase()}
                        <ArrowRight size={16} className="text-gray-300" />
                      </button>
                    ))}
                  </div>
               </div>

               <div className="bg-white mb-2 pb-4">
                  <h4 className="px-6 py-4 text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Help & Settings</h4>
                  <div className="flex flex-col">
                    <div className="px-6 py-4 flex items-center justify-between text-sm font-bold text-gray-700">
                      <span>Your Account</span>
                    </div>
                    <div className="px-6 py-4 flex items-center justify-between text-sm font-bold text-gray-700">
                      <span>{language.name} ({language.code.toUpperCase()})</span>
                      <span className="text-xl leading-none">{language.flag}</span>
                    </div>
                  </div>
               </div>
            </div>
            
            <div className="p-6 bg-white border-t border-gray-200">
               <Link 
                 to={getLink('/products')} 
                 className="flex items-center justify-center w-full bg-[#febd69] text-black py-4 rounded-xl font-black uppercase text-xs tracking-widest shadow-xl shadow-yellow-400/20"
                 onClick={() => setIsMobileMenuOpen(false)}
               >
                 Sign In
               </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {children}
      </main>

      {/* Floating Seller Badge */}
      {activeSeller && (
        <div className="fixed bottom-8 left-8 z-[100] animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-xl border border-blue-100 p-4 rounded-[2rem] shadow-2xl flex items-center gap-4 group hover:scale-105 transition-all duration-500">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
              🏪
            </div>
            <div className="flex flex-col pr-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-0.5">Official Seller</span>
              <h4 className="text-sm font-black uppercase tracking-tighter text-gray-900 leading-none">{activeSeller.fullName}</h4>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{activeSeller.showName}</span>
            </div>
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setQuickViewProduct(null)}
          />
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl flex flex-col md:flex-row animate-scaleIn">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-6 right-6 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
              <img 
                src={quickViewProduct.image} 
                alt={quickViewProduct.name} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-black text-gray-900">{quickViewProduct.rating}</span>
                </div>
              </div>

              <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4 leading-none">
                {quickViewProduct.name}
              </h2>

              <div className="text-3xl font-black text-blue-600 mb-6 tracking-tighter">
                {formatPrice(quickViewProduct.price)}
              </div>

              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {quickViewProduct.description}
              </p>

              <div className="space-y-6 mb-8">
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Select Size</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
                            selectedSize === size 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                              : 'bg-white border-gray-100 text-gray-900 hover:border-blue-600'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Select Color</h4>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all border-2 ${
                            selectedColor === color 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20' 
                              : 'bg-white border-gray-100 text-gray-900 hover:border-blue-600'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6 mt-auto">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-gray-100 rounded-2xl p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-black">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button 
                    onClick={() => {
                      addToCart(quickViewProduct, quantity, selectedSize, selectedColor);
                      setQuickViewProduct(null);
                      setQuantity(1);
                    }}
                    className="flex-grow bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
                  >
                    Add to Cart
                  </button>
                </div>
                
                <Link 
                  to={getLink(`/products/${quickViewProduct.id}`)}
                  onClick={() => setQuickViewProduct(null)}
                  className="block text-center text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-blue-600 transition-colors"
                >
                  View Full Product Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-950 text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            {/* Brand & Newsletter */}
            <div className="space-y-8">
              <Link to="/" className="block">
                <BrandLogo />
              </Link>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                The global marketplace for factory-direct products. Buy anything, sell everywhere.
              </p>
              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-white">Newsletter</h4>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                  <button className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-4 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                    Join
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">Quick Links</h4>
              <ul className="space-y-4">
                <li><Link to="/about-us" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">About Us</Link></li>
                <li><Link to="/products" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Shop All</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Our Blog</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">FAQ</Link></li>
              </ul>
            </div>

            {/* Seller Links */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">Seller Central</h4>
              <ul className="space-y-4">
                <li><Link to="/seller-ranking" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Ranking System</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Seller Terms</Link></li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="space-y-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-500">Support</h4>
              <ul className="space-y-4">
                <li><Link to="/contact-us" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Contact Us</Link></li>
                <li><Link to="/track-order" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Track Order</Link></li>
                <li><Link to="/shipping-policy" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Shipping Policy</Link></li>
                <li><Link to="/refund-policy" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Refund & Returns</Link></li>
                <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white text-sm font-bold transition-colors">Privacy Policy</Link></li>
              </ul>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-6">
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex items-center gap-2 text-gray-500">
                <ShieldCheck size={16} className="text-blue-500" />
                <span className="text-[10px] font-black uppercase tracking-widest">Secure Checkout</span>
              </div>
              <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/Google_Pay_Logo.svg" alt="Google Pay" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_Pay_logo.svg" alt="Apple Pay" className="h-5" />
              </div>
            </div>

            <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
              © 2025 W-LORD MARKET. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
