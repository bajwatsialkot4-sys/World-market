
import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useParams, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';
import { Search as SearchIcon, Filter, Grid, List as ListIcon, Star, ArrowRight, ShoppingBag, TrendingUp, Truck, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { categoryName } = useParams();
  const location = useLocation();

  // Helper for cross-platform and iframe-safe URL parameter retrieval
  const getQueryParam = (key: string): string => {
    const val = searchParams.get(key) || searchParams.get(key.toLowerCase()) || searchParams.get(key.toUpperCase());
    if (val) return val;
    if (typeof window !== 'undefined') {
      const search = window.location.search;
      if (search) {
        const params = new URLSearchParams(search);
        for (const [pKey, pVal] of params.entries()) {
          if (pKey.toLowerCase() === key.toLowerCase() && pVal) return pVal;
        }
      }
      const hash = window.location.hash;
      if (hash && hash.includes('?')) {
        const queryStr = hash.split('?')[1];
        if (queryStr) {
          const params = new URLSearchParams(queryStr);
          for (const [pKey, pVal] of params.entries()) {
            if (pKey.toLowerCase() === key.toLowerCase() && pVal) return pVal;
          }
        }
      }
    }
    return '';
  };

  const query = useMemo(() => {
    return getQueryParam('q');
  }, [location.search, location.hash, searchParams]);

  const categoryParam = useMemo(() => {
    return categoryName || getQueryParam('category') || getQueryParam('cat') || 'All';
  }, [categoryName, location.search, location.hash, searchParams]);

  const { formatPrice, setQuickViewProduct, products, searchProducts, isProductsLoading, activeShowName } = useStore();
  const getProductLink = (id: string) => activeShowName ? `/${activeShowName}/products/${id}` : `/products/${id}`;

  const [sortBy, setSortBy] = useState('best-selling');
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    selectedCategory: categoryParam,
    selectedSize: 'All',
    selectedColor: 'All'
  });
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync category from URL
  React.useEffect(() => {
    setFilters(prev => ({ ...prev, selectedCategory: categoryParam }));
  }, [categoryParam]);

  // Safely manage loading state inside a try/finally block so skeleton loaders never freeze on iOS Safari
  React.useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    try {
      if (!isProductsLoading || products.length > 0) {
        if (isMounted) setIsLoading(false);
      }
    } catch (e) {
      console.error("Search loading error:", e);
    } finally {
      const timer = setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 150);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }
  }, [query, categoryParam, filters.selectedCategory, products, isProductsLoading]);

  const rawResults = useMemo(() => {
    return searchProducts(query, filters.selectedCategory);
  }, [query, filters.selectedCategory, products, searchProducts]);

  const filteredAndSortedResults = useMemo(() => {
    let items = [...rawResults];

    // Price Filter
    items = items.filter(p => {
      const price = Number(p.price) || 0;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Size Filter
    if (filters.selectedSize !== 'All') {
      items = items.filter(p => p.sizes?.includes(filters.selectedSize));
    }

    // Color Filter
    if (filters.selectedColor !== 'All') {
      items = items.filter(p => p.colors?.includes(filters.selectedColor));
    }

    // Sorting
    switch (sortBy) {
      case 'newest':
        items.sort((a, b) => getSafeTime(b.datePosted) - getSafeTime(a.datePosted));
        break;
      case 'price-low':
        items.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
        break;
      case 'price-high':
        items.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
        break;
      case 'rating':
        items.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
        break;
      case 'best-selling':
      default:
        items.sort((a, b) => (Number(b.sales) || 0) - (Number(a.sales) || 0));
        break;
    }

    return items;
  }, [rawResults, filters, sortBy]);

  const handleInlineSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newQuery = (formData.get('inline-search') as string) || '';
    setSearchParams({ q: newQuery, category: filters.selectedCategory });
  };

  const allSizes = useMemo(() => {
    const sizes = new Set<string>();
    products.forEach(p => p.sizes?.forEach(s => sizes.add(s)));
    return ['All', ...Array.from(sizes).sort()];
  }, [products]);

  const allColors = useMemo(() => {
    const colors = new Set<string>();
    products.forEach(p => p.colors?.forEach(c => colors.add(c)));
    return ['All', ...Array.from(colors).sort()];
  }, [products]);

  return (
    <div className="min-h-screen bg-white">
      {/* Search Result Summary info */}
      <div className="bg-white border-b border-gray-200 py-3 mb-4 hidden md:block">
        <div className="max-w-[1600px] mx-auto px-6 flex justify-between items-center text-sm">
           <div className="text-gray-900">
             <span className="font-bold">1-{Math.min(filteredAndSortedResults.length, 24)} of over {filteredAndSortedResults.length} results</span>
             {query && <span> for <span className="text-[#c45500] font-bold">"{query}"</span></span>}
           </div>
           <div className="flex items-center gap-2">
              <label className="text-[11px] font-bold text-gray-500">Sort by:</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-100 border border-gray-300 rounded px-2 py-1 text-xs focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="best-selling">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="newest">Newest Arrivals</option>
              </select>
           </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 flex flex-col md:flex-row gap-8">
        
        {/* Amazon-Style Sidebar Facets */}
        <aside className="w-full md:w-64 flex-shrink-0 hidden md:block">
          <div className="space-y-8 sticky top-24">
             <div>
               <h4 className="text-sm font-bold text-gray-900 mb-3">Department</h4>
               <ul className="space-y-1.5 pl-1">
                 <li>
                   <button 
                     onClick={() => {
                        setFilters({...filters, selectedCategory: 'All'});
                        setSearchParams({ q: query, category: 'All' });
                     }}
                     className={`text-xs ${filters.selectedCategory === 'All' ? 'font-black text-gray-900' : 'text-gray-700 hover:text-[#c45500]'}`}
                   >
                     Any Department
                   </button>
                 </li>
                 {CATEGORIES.map(cat => {
                   const isSelected = filters.selectedCategory.toLowerCase().trim() === cat.toLowerCase().trim();
                   return (
                     <li key={cat}>
                       <button 
                         onClick={() => {
                            setFilters({...filters, selectedCategory: cat});
                            setSearchParams({ q: query, category: cat });
                         }}
                         className={`text-xs capitalize ${isSelected ? 'font-black text-gray-900' : 'text-gray-700 hover:text-[#c45500]'}`}
                       >
                         {cat}
                       </button>
                     </li>
                   );
                 })}
               </ul>
             </div>

             <div>
               <h4 className="text-sm font-bold text-gray-900 mb-3">Customer Reviews</h4>
               <div className="space-y-2">
                 {[4, 3, 2, 1].map(stars => (
                   <button 
                     key={stars}
                     className="flex items-center gap-1.5 group w-full text-left"
                   >
                      <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                           <Star key={i} size={14} fill={i < stars ? "currentColor" : "none"} className={i < stars ? "text-yellow-500" : "text-gray-300"} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-700 group-hover:text-[#c45500]">& Up</span>
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <h4 className="text-sm font-bold text-gray-900 mb-3">Price Range</h4>
               <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">$</span>
                    <input 
                      type="number" 
                      placeholder="Min" 
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-500"
                    />
                    <span className="text-xs text-gray-500">$</span>
                    <input 
                      type="number" 
                      placeholder="Max" 
                      className="w-full border border-gray-300 rounded px-2 py-1 text-xs outline-none focus:border-blue-500"
                    />
                    <button className="px-3 py-1 border border-gray-300 rounded shadow-sm hover:bg-gray-50 text-xs">Go</button>
                  </div>
               </div>
             </div>

             <div>
               <h4 className="text-sm font-bold text-gray-900 mb-3">New Arrivals</h4>
               <ul className="space-y-2">
                  <li><label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="rounded" /><span className="text-xs text-gray-700 group-hover:text-[#c45500]">Last 30 days</span></label></li>
                  <li><label className="flex items-center gap-2 cursor-pointer group"><input type="checkbox" className="rounded" /><span className="text-xs text-gray-700 group-hover:text-[#c45500]">Last 90 days</span></label></li>
               </ul>
             </div>
          </div>
        </aside>

        {/* Results Stream */}
        <div className="flex-grow">
          {isLoading ? (
            <div className="flex flex-col gap-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2 animate-pulse">Loading Results...</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-3 animate-pulse">
                    <div className="w-full bg-gray-200 rounded-md" style={{ aspectRatio: '1 / 1' }} />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mt-2" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-6 bg-gray-200 rounded w-1/3 mt-2" />
                    <div className="h-8 bg-gray-200 rounded-full w-full mt-auto" />
                  </div>
                ))}
              </div>
            </div>
          ) : filteredAndSortedResults.length > 0 ? (
            <div className="flex flex-col gap-6">
               <h2 className="text-xl font-bold text-gray-900 mb-2">Results</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                 {filteredAndSortedResults.map(product => {
                   const isBestSeller = (product.sales || 0) > 400;
                   const isTopRated = Number(product.rating || 0) >= 4.8;

                   return (
                     <div key={product.id} className="bg-white border border-gray-200 rounded-lg flex flex-col group hover:shadow-lg transition-shadow overflow-hidden w-full">
                        {/* Image area */}
                        <Link 
                          to={getProductLink(product.id)} 
                          className="block w-full relative aspect-square bg-gray-50 p-4 shrink-0 overflow-hidden"
                          style={{ aspectRatio: '1 / 1' }}
                        >
                           <img 
                             src={product.image || 'https://picsum.photos/seed/product/400/400'} 
                             alt={product.name} 
                             loading="lazy"
                             decoding="async"
                             className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                             onError={(e) => {
                               const target = e.target as HTMLImageElement;
                               target.onerror = null;
                               if (!target.src.includes('seed/product/400/400')) {
                                 target.src = 'https://picsum.photos/seed/product/400/400';
                               }
                             }}
                           />
                        </Link>

                        {/* Info area */}
                        <div className="p-4 flex flex-col flex-grow min-w-0 bg-white">
                           {/* Badges */}
                           <div className="min-h-6 mb-2 flex flex-wrap gap-2">
                             {product.offer && String(product.offer).trim() !== '' && (
                               <div className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm tracking-wide">
                                 {product.offer}
                               </div>
                             )}
                             {isBestSeller && (
                               <div className="bg-[#cc6600] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">Best Seller</div>
                             )}
                             {isTopRated && (
                               <div className="bg-[#232f3e] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                                 <ShoppingBag size={10} className="text-orange-400" />
                                 Sportswear Choice
                               </div>
                             )}
                           </div>

                           <Link to={getProductLink(product.id)} className="block w-full hover:text-[#c45500] group/title transition-colors">
                             <h3 className="text-sm md:text-base font-normal text-gray-900 line-clamp-3 mb-1 group-hover/title:underline italic uppercase font-bold tracking-tight leading-tight">
                                {product.name}
                             </h3>
                           </Link>

                           {/* Rating */}
                           <div className="flex items-center gap-1 mb-2">
                             <div className="flex text-yellow-500">
                               {[...Array(5)].map((_, i) => (
                                 <Star 
                                   key={i} 
                                   size={14} 
                                   fill={i < Math.floor(Number(product.rating || 0)) ? "currentColor" : "none"} 
                                   className={i < Math.floor(Number(product.rating || 0)) ? "text-yellow-500" : "text-gray-300"} 
                                 />
                               ))}
                             </div>
                             <span className="text-xs text-blue-600 font-medium hover:text-[#c45500] hover:underline cursor-pointer">{((product.sales || 0) * 1.5).toFixed(0)}</span>
                           </div>

                           {/* Price */}
                           <div className="flex items-start gap-0.5 text-gray-900 mb-1">
                             <span className="text-xs font-medium mt-1">$</span>
                             <span className="text-2xl font-bold">{Math.floor(product.price || 0)}</span>
                             <span className="text-xs font-medium mt-1">{((product.price || 0) % 1).toFixed(2).split('.')[1]}</span>
                           </div>

                           {product.oldPrice && (
                             <div className="text-xs text-gray-500 mb-2">
                               Typical: <span className="line-through">{formatPrice(product.oldPrice)}</span>
                             </div>
                           )}

                           {/* Shipping & Offers */}
                           <div className="mt-2 flex flex-col gap-1 mb-4">
                             <div className="flex items-center gap-1 text-[10px] font-bold text-green-700">
                               <Truck size={12} />
                               {product.price > 100 ? "FREE Shipping" : "Standard Shipping"}
                             </div>
                             <div className="flex items-center gap-1 text-[10px] text-gray-500">
                               <Globe size={12} />
                               Worldwide Delivery Available
                             </div>
                             {product.price > 100 && (
                               <div className="text-[9px] text-gray-400 font-medium">
                                 on orders over $100
                               </div>
                             )}
                           </div>

                           <div className="mt-auto">
                             <button 
                               onClick={() => setQuickViewProduct(product)}
                               className="w-full bg-[#ffd814] hover:bg-[#f7ca00] text-black text-xs font-bold py-2 rounded-full shadow-sm active:shadow-inner transition-all"
                             >
                               See options
                             </button>
                           </div>
                        </div>
                     </div>
                   );
                 })}
               </div>
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center">
              <div className="text-center mb-16">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                  🔍
                </div>
                <h2 className="text-2xl font-bold mb-4 italic uppercase">No exact matches found</h2>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                  We couldn't find any results for "{query}". Try checking your spelling or use more general terms.
                </p>
                <button 
                  onClick={() => {
                    setFilters({
                      priceRange: [0, 10000],
                      selectedCategory: 'All',
                      selectedSize: 'All',
                      selectedColor: 'All'
                    });
                    setSortBy('best-selling');
                    setSearchParams({ q: '', category: 'All' });
                  }}
                  className="bg-[#232f3e] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-xl hover:bg-black transition-all"
                >
                  Clear Results
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
