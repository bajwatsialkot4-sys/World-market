
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { useStore, sanitizeProduct } from '../context/StoreContext';
import { ADMIN_WHATSAPP } from '../constants';
import { getWhatsAppLink } from '../services/routingUtils';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Product } from '../types';
import { Star, Truck, ShieldCheck, RotateCcw, MessageCircle, ShoppingCart, ChevronRight, Share2, Heart, CheckCircle2, Eye, Clock, Zap } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { productId, showName: pathShowName } = useParams();
  const { products, isProductsLoading, addToCart, activeShowName: subdomainShowName, formatPrice, activeSeller, addSale, referralCode, normalizeCategory } = useStore();
  const showName = pathShowName || subdomainShowName;
  const navigate = useNavigate();

  const [directProduct, setDirectProduct] = useState<Product | null>(null);
  const [isDirectLoading, setIsDirectLoading] = useState<boolean>(false);

  const product = useMemo(() => {
    return products.find(p => p.id === productId) || directProduct;
  }, [products, productId, directProduct]);
  
  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);

  // Directly fetch product document if deep-linked and not in local products state yet
  useEffect(() => {
    if (!productId) return;

    const foundInStore = products.some(p => p.id === productId);
    if (foundInStore) {
      setIsDirectLoading(false);
      return;
    }

    let isMounted = true;
    setIsDirectLoading(true);

    const fetchSingleProduct = async () => {
      try {
        const docRef = doc(db, 'products', productId);
        const snap = await getDoc(docRef);
        if (snap.exists() && isMounted) {
          const fetchedProd = sanitizeProduct(snap.id, snap.data());
          setDirectProduct(fetchedProd);
        }
      } catch (err) {
        console.warn("Direct product fetch error:", err);
      } finally {
        if (isMounted) {
          setIsDirectLoading(false);
        }
      }
    };

    fetchSingleProduct();

    return () => {
      isMounted = false;
    };
  }, [productId, products]);

  // Sync image, size, and color selections once product data resolves
  useEffect(() => {
    if (product) {
      if (!selectedImage && product.image) {
        setSelectedImage(product.image);
      }
      if (!selectedSize && product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (!selectedColor && product.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    }
  }, [product, selectedImage, selectedSize, selectedColor]);

  if (!product) {
    if (isProductsLoading || isDirectLoading) {
      return (
        <div className="bg-white min-h-screen pb-20">
          <div className="max-w-[1500px] mx-auto px-4 py-8 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-6 space-y-4">
                <div className="aspect-square bg-gray-200 rounded-2xl w-full"></div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="aspect-square bg-gray-200 rounded-xl"></div>
                  <div className="aspect-square bg-gray-200 rounded-xl"></div>
                  <div className="aspect-square bg-gray-200 rounded-xl"></div>
                  <div className="aspect-square bg-gray-200 rounded-xl"></div>
                </div>
              </div>
              <div className="lg:col-span-6 space-y-6">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-12 bg-gray-200 rounded w-1/2"></div>
                <div className="h-24 bg-gray-200 rounded w-full"></div>
                <div className="h-14 bg-gray-200 rounded-full w-full"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Product Not Found</h2>
        <Link to="/products" className="bg-black text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest">Back to Catalog</Link>
      </div>
    );
  }

  const [isOrdering, setIsOrdering] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    country: 'United States',
    zipCode: ''
  });

  const handleWhatsAppOrder = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!isOrdering) {
      setIsOrdering(true);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const shopName = urlParams.get('seller') || (activeSeller ? activeSeller.showName : (showName || "W-LORD Global"));
    const sellerCode = referralCode || (activeSeller ? activeSeller.id : "Global-Direct");

    // Store order in system
    addSale({
      products: [{
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
        size: selectedSize,
        color: selectedColor
      }],
      customerName: customerInfo.name,
      customerPhone: customerInfo.phone,
      customerEmail: customerInfo.email || 'N/A',
      customerAddress: customerInfo.address,
      customerCity: customerInfo.city || 'Global',
      customerCountry: customerInfo.country || 'International',
      customerZip: customerInfo.zipCode || '0000',
      amount: product.price * quantity,
      status: 'Pending Payment',
      sellerId: activeSeller?.id || referralCode || 'WH-Global',
      sellerShopName: shopName
    });

    const message = `NEW INTERNATIONAL ORDER
--------------------------------

--- MARKET DETAILS ---
Global Store: ${shopName}
Ref Code: ${sellerCode}

--- CUSTOMER PROFILE ---
Name: ${customerInfo.name}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.country}

--- ORDER DATA ---
Item: ${product.name}
Var: ${selectedSize || 'Standard'} / ${selectedColor || 'Default'}
Qty: ${quantity}
Price: $${product.price.toFixed(2)}

--- TOTAL ---
AMOUNT: $${(product.price * quantity).toFixed(2)}

--------------------------------
Secure international payment confirmation.`;

    const waLink = getWhatsAppLink(ADMIN_WHATSAPP, message);
    window.location.href = waLink;
    setIsOrdering(false);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    // Optional: show a toast or redirect to cart
    // navigate('/cart');
  };

  const relatedProducts = useMemo(() => {
    const currentCatNorm = normalizeCategory(product.category || '');
    return products.filter(p => {
      const pCatNorm = normalizeCategory(p.category || '');
      return pCatNorm === currentCatNorm && p.id !== product.id;
    }).slice(0, 4);
  }, [products, product.category, product.id, normalizeCategory]);

  const getLink = (to: string) => {
    if (showName) {
      const cleanTo = to === '/' ? '' : to.startsWith('/') ? to : `/${to}`;
      return `/${showName}${cleanTo}`;
    }
    return to;
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      <SEO 
        title={product.metaTitle || product.name}
        description={product.metaDescription || product.description}
        image={product.image}
        keywords={[product.category, 'factory direct', 'wholesale', product.name, ...(product.metaKeywords?.split(',') || [])]}
      />
      {/* Breadcrumbs */}
      <div className="bg-white">
        <div className="max-w-[1500px] mx-auto px-4 pt-4 pb-2 flex items-center gap-2 text-[11px] text-gray-500 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link to={getLink('/')} className="hover:underline">Home</Link>
          <span className="text-gray-300">›</span>
          <Link to={getLink('/products')} className="hover:underline">Products</Link>
          <span className="text-gray-300">›</span>
          <span className="hover:underline cursor-pointer">{product.category}</span>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left: Image Gallery (5 cols) */}
          <div className="lg:col-span-5 flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-2 w-full lg:w-20">
                  {[product.image, ...(product.images || [])].slice(0, 7).map((img, i) => (
                    <button 
                      key={i}
                      onMouseEnter={() => setSelectedImage(img)}
                      className={`aspect-square w-12 lg:w-full rounded border-2 transition-all p-1 ${selectedImage === img ? 'border-[#e77600] shadow-[0_0_3px_2px_rgba(228,121,17,0.5)]' : 'border-gray-200 hover:border-[#e77600]'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
            </div>
            <div className="flex-grow aspect-square bg-white flex items-center justify-center p-4">
               <img 
                 src={selectedImage} 
                 alt={product.name} 
                 className="max-w-full max-h-full object-contain mix-blend-multiply"
               />
            </div>
          </div>

          {/* Middle: Product Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center justify-between mb-1">
                 <Link to="/" className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline">Visit the {activeSeller ? activeSeller.shopName : 'W-LORD MARKET'} Store</Link>
              </div>
              <h1 className="text-2xl font-medium text-gray-900 leading-tight mb-2 tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center">
                  <span className="text-sm font-bold mr-1 text-gray-900">{product.rating}</span>
                  <div className="flex text-[#ffa41c]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(Number(product.rating)) ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-[#007185] hover:text-[#c45500] hover:underline cursor-pointer">
                  {((product.sales || 0) * 1.5).toFixed(0)} ratings
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="bg-[#232f3e] text-white inline-block px-2 py-0.5 rounded text-[11px] font-bold">#1 Best Seller</div>
                {product.offer && String(product.offer).trim() !== '' && (
                  <div className="bg-red-600 text-white inline-block px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider shadow-sm">
                    {product.offer}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-medium text-red-600">-{product.discount || 0}%</span>
                <div className="flex items-start gap-0.5 text-gray-900">
                  <span className="text-xs font-medium mt-1">$</span>
                  <span className="text-2xl font-medium leading-none">{Math.floor(product.price)}</span>
                  <span className="text-xs font-medium mt-1">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                </div>
              </div>
              {product.oldPrice && (
                <p className="text-xs text-gray-500">List Price: <span className="line-through">{formatPrice(product.oldPrice)}</span></p>
              )}
            </div>

            <div className="space-y-4">
              {/* Product details table */}
              <div className="grid grid-cols-[100px_1fr] gap-x-4 gap-y-1 text-sm border-t border-gray-100 pt-4">
                 <span className="font-bold text-gray-900">Category</span>
                 <span>{product.category}</span>
                 <span className="font-bold text-gray-900">Brand</span>
                 <span>{activeSeller ? activeSeller.shopName : 'W-LORD'}</span>
                 <span className="font-bold text-gray-900">Color</span>
                 <span>{selectedColor || 'N/A'}</span>
                 <span className="font-bold text-gray-900">Material</span>
                 <span>{product.fabric || 'Cotton Blend'}</span>
              </div>

              {/* Variant Selectors */}
              <div className="space-y-6 pt-4 border-t border-gray-100">
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-900 mb-3">Size: <span className="font-medium text-gray-600">{selectedSize}</span></h4>
                    <div className="flex flex-wrap gap-2">
                       {product.sizes.map(size => (
                         <button 
                           key={size}
                           onClick={() => setSelectedSize(size)}
                           className={`min-w-[44px] h-9 px-3 rounded border text-xs font-medium transition-all shadow-sm ${selectedSize === size ? 'border-[#e77600] bg-[#fff5ec] ring-1 ring-[#e77600]' : 'border-gray-300 hover:bg-gray-50'}`}
                         >
                           {size}
                         </button>
                       ))}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div>
                    <h4 className="text-[13px] font-bold text-gray-900 mb-3">Color: <span className="font-medium text-gray-600">{selectedColor}</span></h4>
                    <div className="flex flex-wrap gap-2">
                       {product.colors.map(color => (
                         <button 
                           key={color}
                           onClick={() => setSelectedColor(color)}
                           className={`h-9 px-4 rounded border text-xs font-medium transition-all shadow-sm ${selectedColor === color ? 'border-[#e77600] bg-[#fff5ec] ring-1 ring-[#e77600]' : 'border-gray-300 hover:bg-gray-50'}`}
                         >
                           {color}
                         </button>
                       ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-gray-100 pt-4">
                 <h4 className="font-bold text-sm mb-2">About this item</h4>
                 <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
                    {product.description.split('.').filter(s => s.trim()).map((sentence, i) => (
                      <li key={i}>{sentence.trim()}</li>
                    ))}
                 </ul>
              </div>
            </div>
          </div>

          {/* Right: Buy Box (3 cols) */}
          <div className="lg:col-span-3">
            <div className="border border-gray-300 rounded-lg p-4 sticky top-24 space-y-4">
              <div className="space-y-2">
                <div className="flex items-start gap-0.5 text-gray-900">
                  <span className="text-sm font-medium mt-1">$</span>
                  <span className="text-3xl font-medium leading-none">{Math.floor(product.price)}</span>
                  <span className="text-sm font-medium mt-1">{(product.price % 1).toFixed(2).split('.')[1]}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-900">FREE delivery </span>
                  <span className="font-bold">Sunday, April 28</span>
                </div>
                <div className="text-sm">
                  <span>Deliver to </span>
                  <span className="text-[#007185] hover:text-[#c45500] cursor-pointer inline-flex items-center gap-1"><Truck size={14}/> Worldwide Shipping</span>
                </div>
              </div>

              <div className={`text-lg font-medium ${product.stock > 0 ? 'text-[#007600]' : 'text-red-600'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </div>

              <div className="space-y-3">
                 <select 
                   value={quantity} 
                   onChange={(e) => setQuantity(Number(e.target.value))}
                   className="w-full bg-[#f0f2f2] border border-[#d5d9d9] rounded-lg px-3 py-1.5 text-sm shadow-sm focus:ring-1 focus:ring-[#007185] outline-none"
                 >
                   {[...Array(Math.min(product.stock, 30))].map((_, i) => (
                     <option key={i+1} value={i+1}>Qty: {i+1}</option>
                   ))}
                 </select>

                 <button 
                   onClick={handleAddToCart}
                   className="w-full bg-[#ffd814] hover:bg-[#f7ca00] border border-[#fcd200] rounded-full py-2 text-[13px] shadow-sm active:shadow-inner transition-all"
                 >
                   Add to Cart
                 </button>

                 <button 
                   onClick={() => handleWhatsAppOrder()}
                   className="w-full bg-[#ffa41c] hover:bg-[#fa8900] border border-[#ff8f00] rounded-full py-2 text-[13px] shadow-sm active:shadow-inner transition-all flex items-center justify-center gap-2"
                 >
                   <MessageCircle size={16} /> Order Now
                 </button>
              </div>

              <div className="text-[11px] text-gray-500 space-y-1">
                 <div className="grid grid-cols-[80px_1fr] gap-x-2">
                   <span>Ships from</span>
                   <span className="text-gray-900">W-LORD MARKET</span>
                   <span>Sold by</span>
                   <span className="text-[#007185]">{activeSeller ? activeSeller.shopName : 'W-LORD MARKET'}</span>
                 </div>
              </div>

              <div className="border-t border-gray-200 pt-2 flex flex-col gap-2">
                 <button className="text-left text-xs text-[#007185] hover:text-[#c45500] hover:underline">Returns: Eligible for Return, Refund or Replacement within 30 days of receipt</button>
                 <button className="text-left text-xs text-[#007185] hover:text-[#c45500] hover:underline">Payment: Secure transaction</button>
              </div>
            </div>
          </div>

        </div>

        {/* Reviews Section */}
        <div className="mt-24 pt-24 border-t border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-6">Customer <span className="text-blue-600">Reviews</span></h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-black tracking-tighter">{product.rating}</span>
                  <div>
                    <div className="flex items-center gap-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill={i < Math.floor(Number(product.rating)) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Global Average Rating</p>
                  </div>
                </div>
                
                  <div className="space-y-2 pt-6">
                    {[5, 4, 3, 2, 1].map(star => (
                      <div key={star} className="flex items-center gap-4">
                        <span className="text-[10px] font-black text-gray-400 w-4">{star}</span>
                        <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-yellow-400 rounded-full" 
                            style={{ width: `${star === 5 ? 85 : (star === 4 ? 10 : 5)}%` }}
                          ></div>
                        </div>
                        <span className="text-[10px] font-black text-gray-400 w-8">{star === 5 ? '85%' : (star === 4 ? '10%' : '5%')}</span>
                      </div>
                    ))}
                  </div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-12">
              {product.reviews && product.reviews.length > 0 ? product.reviews.map(review => (
                <div key={review.id} className="space-y-4 animate-fadeIn">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-black text-xs text-gray-400">
                        {review.user?.[0] || 'U'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-black uppercase tracking-tight">{review.user}</h5>
                          {review.country && (
                            <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">{review.country}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-yellow-400 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={10} fill={i < review.rating ? 'currentColor' : 'none'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Helpful</button>
                    <span className="text-gray-200">|</span>
                    <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black">Report</button>
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">No reviews yet for this product.</p>
              )}
              <button className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 hover:border-blue-600 hover:text-blue-600 transition-all">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
        {/* Related Products Section */}
        <div className="mt-24 pt-24 border-t border-gray-100">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">You may <span className="text-blue-600">also like</span></h2>
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Recommended based on this item</p>
            </div>
            <Link to={getLink('/products')} className="text-blue-600 font-black uppercase text-[10px] tracking-widest hover:underline flex items-center gap-2">
              View All <ChevronRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map(p => (
              <Link to={getLink(`/products/${p.id}`)} key={p.id} className="group flex flex-col gap-3 bg-white p-2 md:p-3 rounded-2xl md:rounded-3xl border border-transparent hover:border-gray-100 hover:shadow-xl transition-all">
                <div className="aspect-square bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden relative border border-gray-100">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/400/400';
                    }}
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-[8px] md:text-[10px] font-black shadow-sm">
                    ⭐ {p.rating}
                  </div>
                </div>
                <div>
                  <h4 className="font-black uppercase tracking-tight text-[10px] md:text-xs line-clamp-1 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                  <div className="text-gray-900 font-black text-sm md:text-lg tracking-tighter mt-1">{formatPrice(p.price)}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
