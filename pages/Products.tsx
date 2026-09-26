import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link, useParams, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, SHIPPING_COUNTRIES } from '../constants';
import { useTranslation } from '../src/translations';
import { 
  Filter, 
  ChevronDown, 
  X, 
  Star, 
  ShoppingCart, 
  Eye, 
  ArrowUpDown,
  Check,
  Search,
  Truck,
  Globe
} from 'lucide-react';

const getSafeTime = (datePosted: any): number => {
  if (!datePosted) return 0;
  if (typeof datePosted === 'object') {
    if (typeof datePosted.toDate === 'function') {
      return datePosted.toDate().getTime();
    }
    if (typeof datePosted.seconds === 'number') {
      return datePosted.seconds * 1000;
    }
  }
  const parsed = new Date(datePosted).getTime();
  return isNaN(parsed) ? 0 : parsed;
};

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, addToCart, formatPrice, language, setQuickViewProduct, isProductsLoading, hasMoreProducts, loadMoreProducts, searchProducts } = useStore();
  const { t } = useTranslation(language.code);
  const { showName } = useParams();
  const location = useLocation();

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [availability, setAvailability] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [sortBy, setSortBy] = useState('newest');

  // Helper for cross-platform and iframe-safe URL parameter retrieval
  const getQueryParam = (key: string): string => {
    const targetKey = key.toLowerCase();
    
    // Check searchParams case-insensitively
    for (const [k, val] of searchParams.entries()) {
      if (k.toLowerCase() === targetKey && val) return val;
    }
    
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search) {
        const params = new URLSearchParams(search);
        for (const [k, val] of params.entries()) {
          if (k.toLowerCase() === targetKey && val) return val;
        }
      }
      const hash = window.location.hash;
      if (hash && hash.includes('?')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        for (const [k, val] of params.entries()) {
          if (k.toLowerCase() === targetKey && val) return val;
        }
      }
    }
    return '';
  };

  const query = useMemo(() => {
    return getQueryParam('q');
  }, [location.search, location.hash, searchParams]);

  const category = useMemo(() => {
    return getQueryParam('category') || getQueryParam('cat') || 'All';
  }, [location.search, location.hash, searchParams]);

  const filteredProducts = useMemo(() => {
    // 1. First apply search if query exists, pass current category context
    let result = searchProducts(query, category);
    
    console.log(`[Products Debug] Filtering ${result.length} products (Total in store: ${products.length})`);
    if (query) console.log(`[Products Debug] Search query active: "${query}"`);
    if (category !== 'All') console.log(`[Products Debug] Category filter active: "${category}"`);

    // 2. Then apply other filters
    result = result.filter(p => {
      const price = Number(p.price) || 0;
      const matchesPrice = price >= priceRange[0] && price <= priceRange[1];
      const matchesRating = !selectedRating || (Number(p.rating || 0) >= selectedRating);
      const matchesCountry = !selectedCountry || p.shippingCountry === selectedCountry;
      const matchesAvailability = availability === 'all' || 
                                  (availability === 'inStock' && p.stock > 0) ||
                                  (availability === 'outOfStock' && p.stock === 0);
      
      return matchesPrice && matchesRating && matchesAvailability && matchesCountry;
    });

    switch (sortBy) {
      case 'price-low': result.sort((a, b) => (a.price || 0) - (b.price || 0)); break;
      case 'price-high': result.sort((a, b) => (b.price || 0) - (a.price || 0)); break;
      case 'top-rated': result.sort((a, b) => (Number(b.rating || 0)) - (Number(a.rating || 0))); break;
      case 'best-selling': result.sort((a, b) => (b.sales || 0) - (a.sales || 0)); break;
      case 'newest': result.sort((a, b) => getSafeTime(b.datePosted) - getSafeTime(a.datePosted)); break;
    }

    return result;
  }, [products, query, category, priceRange, selectedRating, selectedCountry, availability, sortBy, searchProducts]);

  const getProductLink = (id: string) => {
    if (showName) return `/${showName}/products/${id}`;
    return `/products/${id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header / Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-grow">
              <h1 className="text-3xl font-black italic uppercase tracking-tighter">
                {query ? `Results for "${query}"` : category !== 'All' ? category : 'All Products'}
              </h1>
              <div className="mt-4 max-w-md relative group">
                <input 
                  type="text" 
                  placeholder={`Search in ${category}...`}
                  value={query}
                  onChange={(e) => setSearchParams({ q: e.target.value, category: category })}
                  className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 pl-10 pr-4 focus:border-blue-600 focus:bg-white transition-all outline-none text-sm font-bold"
                />
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                {query && (
                  <button 
                    onClick={() => setSearchParams({ category: category })}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-4">
                {filteredProducts.length} items found
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-2 bg-gray-100 px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-200 transition-all">
                  <ArrowUpDown size={14} />
                  <span>{t('sort_by')}: {t({
                    'newest': 'newest',
                    'best-selling': 'best_selling',
                    'top-rated': 'top_rated',
                    'price-low': 'price_low_high',
                    'price-high': 'price_high_low'
                  }[sortBy] || sortBy)}</span>
                  <ChevronDown size={14} />
                </button>
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-40 p-2">
                  {[
                    { id: 'newest', label: t('newest') },
                    { id: 'best-selling', label: t('best_selling') },
                    { id: 'top-rated', label: t('top_rated') },
                    { id: 'price-low', label: t('price_low_high') },
                    { id: 'price-high', label: t('price_high_low') },
                  ].map(opt => (
                    <button 
                      key={opt.id}
                      onClick={() => setSortBy(opt.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-colors flex items-center justify-between ${sortBy === opt.id ? 'text-blue-600 bg-blue-50' : 'text-gray-500'}`}
                    >
                      {opt.label}
                      {sortBy === opt.id && <Check size={12} />}
                    </button>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all"
              >
                <Filter size={14} />
                <span>Filters</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-12">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0 space-y-10">
            {/* Categories */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-900">{t('category')}</h4>
              <div className="space-y-3">
                {['All', ...CATEGORIES].map(cat => {
                  const isSelected = category.toLowerCase().trim() === cat.toLowerCase().trim() ||
                                   (category === 'All' && cat === 'All');
                  
                  return (
                    <button 
                      key={cat}
                      onClick={() => setSearchParams({ q: query, category: cat })}
                      className={`block w-full text-left text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-900">{t('price_range')}</h4>
              <div className="px-2">
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-4">
                  <span className="text-[10px] font-black text-gray-400">$0</span>
                  <span className="text-[10px] font-black text-blue-600">${priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-900">{t('rating')}</h4>
              <div className="space-y-3">
                {[4, 3, 2, 1].map(r => (
                  <button 
                    key={r}
                    onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                    className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors ${selectedRating === r ? 'text-blue-600' : 'text-gray-400'}`}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} fill={i < r ? "currentColor" : "none"} className={i < r ? "text-yellow-400" : "text-gray-200"} />
                      ))}
                    </div>
                    <span>& Up</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Country Filter */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-900">{t('country')}</h4>
              <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
                {SHIPPING_COUNTRIES.map(ctry => (
                  <button 
                    key={ctry}
                    onClick={() => setSelectedCountry(selectedCountry === ctry ? null : ctry)}
                    className={`block w-full text-left text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors ${selectedCountry === ctry ? 'text-blue-600' : 'text-gray-400'}`}
                  >
                    {ctry}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-gray-900">{t('availability')}</h4>
              <div className="space-y-3">
                {[
                  { id: 'all', label: 'All Items' },
                  { id: 'inStock', label: t('in_stock') },
                  { id: 'outOfStock', label: t('out_of_stock') },
                ].map(opt => (
                  <button 
                    key={opt.id}
                    onClick={() => setAvailability(opt.id as any)}
                    className={`block w-full text-left text-xs font-bold uppercase tracking-widest hover:text-blue-600 transition-colors ${availability === opt.id ? 'text-blue-600' : 'text-gray-400'}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-grow">
            {isProductsLoading && products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32">
                 <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                 <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Syncing with Cloud Marketplace...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="group flex flex-col gap-4 bg-white p-3 md:p-4 rounded-[1.5rem] md:rounded-[2rem] border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all h-full">
                    <Link 
                      to={getProductLink(p.id)} 
                      className="block w-full aspect-square bg-gray-50 rounded-2xl md:rounded-3xl overflow-hidden relative"
                      style={{ aspectRatio: '1 / 1' }}
                    >
                      <img 
                        src={p.image || 'https://picsum.photos/seed/placeholder/400/400'} 
                        alt={p.name || 'Product'} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          if (!target.src.includes('seed/placeholder/400/400')) {
                            target.src = 'https://picsum.photos/seed/placeholder/400/400';
                          }
                        }}
                      />
                      
                      {/* Action Overlay */}
                      <div className="absolute inset-0 bg-black/5 md:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button 
                          onClick={(e) => { e.preventDefault(); setQuickViewProduct(p); }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        >
                          <Eye size={18} />
                        </button>
                        <button 
                          onClick={(e) => { e.preventDefault(); addToCart(p); }}
                          className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110 shadow-lg"
                        >
                          <ShoppingCart size={18} />
                        </button>
                      </div>

                      {p.stock === 0 && (
                        <div className="absolute top-3 left-3 bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded">
                          Out of Stock
                        </div>
                      )}

                      {p.offer && String(p.offer).trim() !== '' && (
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-red-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-lg">
                            {p.offer}
                          </span>
                        </div>
                      )}

                      {p.badges && p.badges.length > 0 && (
                        <div className="absolute top-3 left-3 flex flex-col gap-1">
                          {p.badges.map(badge => (
                            <span key={badge} className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-md shadow-lg">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </Link>

                    <div className="flex flex-col flex-grow px-1 md:px-2">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{p.category}</span>
                        <div className="flex items-center gap-1 text-yellow-400">
                          <Star size={10} fill="currentColor" />
                          <span className="text-[10px] font-black text-gray-900">{p.rating}</span>
                        </div>
                      </div>
                      <Link to={getProductLink(p.id)}>
                        <h4 className="font-black uppercase tracking-tight text-xs md:text-sm line-clamp-2 h-8 md:h-10 group-hover:text-blue-600 transition-colors leading-tight">{p.name}</h4>
                      </Link>
                      <div className="mt-auto pt-4">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-base md:text-xl font-black tracking-tighter text-gray-900">{formatPrice(p.price || 0)}</span>
                          {p.oldPrice && (
                            <span className="text-[10px] font-bold text-gray-400 line-through">{formatPrice(p.oldPrice)}</span>
                          )}
                        </div>

                        {/* Shipping & Offers */}
                        <div className="mb-4 flex flex-col gap-1">
                          <div className="flex items-center gap-1 text-[10px] font-black text-green-600 uppercase tracking-tighter">
                            <Truck size={12} />
                            {p.price > 100 ? "Free Shipping" : "Standard Shipping"}
                          </div>
                          <div className="flex items-center gap-1 text-[9px] font-bold text-gray-500 uppercase tracking-tighter">
                            <Globe size={12} />
                            Worldwide Delivery Available
                          </div>
                          {p.price > 100 && (
                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-0.5">on orders over $100</p>
                          )}
                        </div>
                        <button 
                          onClick={() => addToCart(p)}
                          className="w-full bg-black text-white py-3 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart size={12} />
                          {t('add_to_cart')}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {hasMoreProducts && (
                <div className="mt-16 text-center">
                  <button 
                    onClick={loadMoreProducts}
                    disabled={isProductsLoading}
                    className="bg-black text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 mx-auto"
                  >
                    {isProductsLoading && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                    {isProductsLoading ? 'Loading Marketplace...' : 'Load More Products'}
                  </button>
                </div>
              )}
              </>
            ) : (
              <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">No products found</h3>
                <p className="text-gray-400 font-medium">Try adjusting your filters or search query</p>
                <button 
                  onClick={() => {
                    setSearchParams({});
                    setPriceRange([0, 1000]);
                    setSelectedRating(null);
                    setSelectedCountry(null);
                    setAvailability('all');
                  }}
                  className="mt-8 text-blue-600 font-black uppercase text-xs tracking-widest hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl animate-fadeIn lg:hidden">
          <div className="h-full flex flex-col">
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="text-white p-2">
                <X size={32} />
              </button>
            </div>
            
            <div className="flex-grow overflow-y-auto p-8 space-y-12">
              {/* Category */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-blue-500">Category</h4>
                <div className="flex flex-wrap gap-3">
                  {['All', ...CATEGORIES].map(cat => {
                    const isSelected = category.toLowerCase().trim() === cat.toLowerCase().trim() ||
                                     (category === 'All' && cat === 'All');
                    return (
                      <button 
                        key={cat}
                        onClick={() => setSearchParams({ q: query, category: cat })}
                        className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${isSelected ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-gray-400'}`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-blue-500">Price Range</h4>
                <input 
                  type="range" 
                  min="0" 
                  max="1000" 
                  step="10"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between mt-4">
                  <span className="text-xs font-black text-gray-500">$0</span>
                  <span className="text-xs font-black text-white">${priceRange[1]}</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-blue-500">Rating</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[4, 3, 2, 1].map(r => (
                    <button 
                      key={r}
                      onClick={() => setSelectedRating(selectedRating === r ? null : r)}
                      className={`flex items-center justify-center gap-2 p-4 rounded-2xl border transition-all ${selectedRating === r ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-gray-400'}`}
                    >
                      <span className="font-black">{r}★</span>
                      <span className="text-[8px] uppercase font-bold">& Up</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Country */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-6 text-blue-500">Country</h4>
                <div className="flex flex-wrap gap-3">
                  {SHIPPING_COUNTRIES.map(ctry => (
                    <button 
                      key={ctry}
                      onClick={() => setSelectedCountry(selectedCountry === ctry ? null : ctry)}
                      className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${selectedCountry === ctry ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 text-gray-400'}`}
                    >
                      {ctry}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-900 border-t border-white/10">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-2xl shadow-blue-600/20"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
