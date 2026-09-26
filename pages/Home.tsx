
import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import { CATEGORIES } from '../constants';
import { useStore } from '../context/StoreContext';
import { getEnvironmentMode } from '../services/routingUtils';
import BrandLogo from '../components/BrandLogo';
import { 
  Globe, 
  ShieldCheck, 
  Factory, 
  Headphones, 
  Truck, 
  ArrowRight, 
  Star, 
  Mail, 
  CheckCircle2,
  TrendingUp,
  Users,
  Clock,
  Heart,
  ShoppingCart,
  ShoppingBag,
  Zap,
  Eye
} from 'lucide-react';

const Home: React.FC = () => {
  const { showName: pathShowName } = useParams();
  const { 
    activeShowName: subdomainShowName, activeSeller, addToCart, formatPrice, 
    setQuickViewProduct, products, language, normalizeCategory, searchProducts 
  } = useStore();
  const showName = pathShowName || subdomainShowName;

  useEffect(() => {
    const mode = getEnvironmentMode();
    if (mode === 'preview' && !showName) {
      console.log("System detected preview mode.");
    }
  }, [showName]);

  const getLink = (to: string) => {
    if (showName) {
      const cleanTo = to === '/' ? '' : to.startsWith('/') ? to : `/${to}`;
      return `/${showName}${cleanTo}`;
    }
    return to;
  };

  const getProductLink = (id: string) => {
    if (showName) {
      return `/${showName}/products/${id}`;
    }
    return `/products/${id}`;
  };

  return (
    <div className="animate-fadeIn bg-white">
      <SEO 
        title={activeSeller ? `${activeSeller.fullName} - W-LORD MARKET` : showName ? `${showName.toUpperCase()} - W-LORD MARKET` : "W-LORD MARKET | Global Sportswear Manufacturer"}
        description={activeSeller ? `Shop factory-direct products from ${activeSeller.fullName} on W-LORD MARKET.` : showName ? `Shop factory-direct products from ${showName.toUpperCase()} on W-LORD MARKET.` : "W-LORD MARKET connects you with verified global manufacturers for the best pricing and quality in sports uniforms."}
      />
      {/* Dynamic Show Banner */}
      {activeSeller ? (
        <div className="bg-blue-600 py-4 px-4 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-white flex items-center justify-center gap-3">
            <Star size={16} fill="white" />
            Official Partner Shop: <span className="underline decoration-2 underline-offset-4">{activeSeller.fullName}</span>
            <Star size={16} fill="white" />
          </p>
        </div>
      ) : showName ? (
        <div className="bg-gray-800 py-4 px-4 text-center relative overflow-hidden group">
          <p className="text-sm font-black uppercase tracking-[0.3em] text-white flex items-center justify-center gap-3">
            <Clock size={16} className="text-yellow-400" />
            New Store Created: <span className="text-blue-400">{showName.toUpperCase()}</span>
            <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded ml-2">Pending Verification</span>
          </p>
        </div>
      ) : null}

      {/* Limited Time Offer Banner */}
      <section className="bg-yellow-400 py-3 px-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 animate-pulse">
          <div className="flex items-center gap-2 text-black font-black uppercase text-xs tracking-widest">
            <Clock size={16} />
            <span>Flash Sale: Up to 70% Off</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-black font-black uppercase text-xs tracking-widest">
            <span>Ends In: 02h 45m 12s</span>
          </div>
          <Link to={getLink('/products')} className="bg-black text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors">
            Shop Now
          </Link>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=2070" 
            className="w-full h-full object-cover opacity-40 scale-105"
            alt="Marketplace Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 text-white w-full">
          <div className="max-w-3xl">
            {activeSeller ? (
              <div className="mb-12 animate-slideUp">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl mb-8">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-white/90">Store Active & Verified</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
                  Welcome to <br />
                  <span className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">{activeSeller.fullName}</span> <br />
                  <span className="text-white">Shop</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-gray-300 max-w-2xl leading-relaxed">
                  Curated global products, factory-direct pricing, and verified quality. 
                  Shop the collection from our official partner.
                </p>
              </div>
            ) : showName ? (
              <div className="mb-12 animate-slideUp">
                <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-2xl mb-8">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.6)]"></div>
                  <span className="text-xs font-black uppercase tracking-widest text-white/90">Store Created - Pending Review</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] mb-6">
                  Welcome to <br />
                  <span className="text-blue-500 drop-shadow-[0_0_30px_rgba(59,130,246,0.4)]">{showName.toUpperCase()}</span> <br />
                  <span className="text-white">Marketplace</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-gray-300 max-w-2xl leading-relaxed">
                   Your unique marketplace link is now active! Start sharing your store name 
                  to earn commissions on every global sale.
                </p>
              </div>
            ) : (
              <>
                <div className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-md border border-blue-500/30 px-4 py-2 rounded-full mb-8">
                  <Globe size={16} className="text-blue-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Marketplace Now Open</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.85] tracking-tighter italic uppercase">
                  Buy <span className="text-blue-500">Anything.</span> <br/> 
                  Sell <span className="text-white underline decoration-blue-600">Everywhere.</span>
                </h1>
                <p className="text-lg md:text-xl mb-12 max-w-xl text-gray-300 font-medium leading-relaxed">
                  Global marketplace with factory direct pricing and worldwide shipping. Access premium goods from verified manufacturers across the globe.
                </p>
              </>
            )}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link to={getLink('/products')} className="bg-blue-600 text-white px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2">
                Shop Now <ArrowRight size={18} />
              </Link>
              {!showName && (
                <Link to="/register-show" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2">
                  Become a Seller <Users size={18} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Amazon Style Category Blocks */}
      <section className="relative -mt-32 z-20 max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'T-Shirts', cat: 'tshirt' },
            { title: 'Hoodies', cat: 'hoodie' },
            { title: 'Jackets', cat: 'jacket' },
            { title: 'Shoes', cat: 'shoes' },
            { title: 'Electronics', cat: 'electronics' },
            { title: 'Books', cat: 'books' },
            { title: 'Shorts', cat: 'shorts' },
            { title: 'Caps', cat: 'cap' },
            { title: 'Tracksuits', cat: 'tracksuit' },
            { title: 'Performance Jerseys', cat: 'jersey' }
          ].map((block) => {
            if (!products || products.length === 0) return null;
            
            // Fetch matching products strictly for this category block
            const matchingProducts = searchProducts('', block.cat);
            const images = matchingProducts.map(p => p.image).slice(0, 4);
            
            // If No matches for this specific block, hide it
            if (images.length === 0) return null;

            const linkTarget = `/search?category=${encodeURIComponent(block.cat)}`;

            return (
              <Link 
                key={block.title}
                to={getLink(linkTarget)}
                className="bg-white p-5 shadow-lg hover:shadow-xl transition-all flex flex-col group"
              >
                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {block.title}
                </h3>
                <div className="grid grid-cols-2 gap-2 flex-grow">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="aspect-square bg-gray-50 overflow-hidden rounded-sm relative">
                      {images[i] ? (
                        <img 
                          src={images[i]} 
                          alt="" 
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-200">
                           <BrandLogo className="opacity-10 scale-50" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest mt-6 group-hover:text-orange-600 transition-colors">
                  Shop All {block.title}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-black border-y border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="flex flex-col items-center text-center gap-3 group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Truck size={24} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Worldwide Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3 group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <ShieldCheck size={24} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Secure Shopping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3 group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Factory size={24} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Factory Direct</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3 group">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Headphones size={24} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">24/7 Support</span>
            </div>
            <div className="flex flex-col items-center text-center gap-3 group col-span-2 md:col-span-1">
              <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <TrendingUp size={24} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Bulk Orders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Top <span className="text-blue-600">Categories</span></h2>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Explore our global marketplace inventory</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
            {CATEGORIES.map((cat, idx) => (
              <Link 
                to={getLink(`/search?category=${cat}`)} 
                key={cat}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden bg-black shadow-xl"
              >
                <img 
                  src={`https://images.unsplash.com/photo-${[
                    '1523381210434-271e8be1f52b', // tshirt -> hoodie
                    '1542291026-7eec264c27ff', // shoes
                    '1517836357463-d25dfeac3438', // jersey
                    '1544816155-12df9643f363', // jacket?
                    '1501555088652-021faa106b9b', // jacket?
                    '1617137968427-85924c800a22',  // accessories
                    '1552664688-cf412ec27db2'   // shorts?
                  ][idx % 7]}?auto=format&fit=crop&q=80&w=800`} 
                  className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                  alt={cat}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h4 className="text-white font-black uppercase italic tracking-tighter text-xl">{cat}</h4>
                  <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest">Shop Now</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Global Product Catalog (Previously Trending) */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-5xl font-black italic tracking-tighter uppercase">Full <span className="text-blue-600">Inventory</span></h2>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mt-2">Browse our entire global catalog (800+ items)</p>
          </div>
          <Link to={getLink('/products')} className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline flex items-center gap-2">
            Professional Search <ArrowRight size={14} />
          </Link>
        </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {!products ? (
              <div className="col-span-full py-20 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Initial Sync...</p>
              </div>
            ) : products.length === 0 ? (
              <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-100 rounded-[3rem]">
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                <h3 className="text-xl font-black uppercase italic tracking-tighter">No Products in Inventory</h3>
                <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Check back later for global restock</p>
              </div>
            ) : products.map(p => (
              <div key={p.id} className="group flex flex-col gap-3 bg-white p-2 md:p-3 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all">
              <Link to={getProductLink(p.id)} className="block w-full aspect-square bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden relative">
                <img 
                  src={p.image} 
                  alt={p.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('seed/placeholder/400/400')) {
                      target.src = 'https://picsum.photos/seed/placeholder/400/400';
                    }
                  }}
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {p.discount && (
                    <span className="bg-red-600 text-white text-[8px] font-black uppercase px-2 py-1 rounded-lg">
                      -{p.discount}%
                    </span>
                  )}
                  {p.offer && String(p.offer).trim() !== '' && (
                    <span className="bg-red-600 text-white text-[8px] font-black uppercase px-2 py-1 rounded-lg shadow-sm">
                      {p.offer}
                    </span>
                  )}
                  {p.badges?.map(badge => (
                    <span key={badge} className="bg-blue-600 text-white text-[8px] font-black uppercase px-2 py-1 rounded-lg">
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 w-8 h-8 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-110 transition-all shadow-sm">
                  <Heart size={14} />
                </button>

                {/* Quick Actions */}
                <div className="absolute bottom-2 left-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setQuickViewProduct(p);
                    }}
                    className="flex-grow bg-white/90 backdrop-blur-md text-black py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Eye size={12} />
                    View
                  </button>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(p, 1);
                    }}
                    className="w-10 h-10 bg-black/80 backdrop-blur-md text-white rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors"
                  >
                    <ShoppingCart size={12} />
                  </button>
                </div>
              </Link>

              <div className="px-1">
                <div className="flex items-center gap-1 text-yellow-400 mb-1">
                  <Star size={10} fill="currentColor" />
                  <span className="text-[10px] font-black text-gray-900">{p.rating}</span>
                </div>
                <Link to={getProductLink(p.id)}>
                  <h4 className="font-bold text-xs line-clamp-1 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{p.name}</h4>
                </Link>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-gray-900 font-black text-base tracking-tighter">{formatPrice(p.price)}</span>
                  {p.oldPrice && (
                    <span className="text-gray-400 text-[10px] line-through font-bold">{formatPrice(p.oldPrice)}</span>
                  )}
                </div>
                
                {/* Shipping & Offers */}
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex items-center gap-1 text-[9px] font-black uppercase text-green-600 tracking-tighter">
                    <Truck size={10} />
                    {p.price > 100 ? "Free Shipping" : "Standard Shipping"}
                  </div>
                  <div className="flex items-center gap-1 text-[8px] font-bold text-gray-500 uppercase tracking-tighter">
                    <Globe size={10} />
                    Worldwide Delivery
                  </div>
                  {p.price > 100 && (
                    <div className="text-[7px] font-black text-gray-400 uppercase tracking-widest mt-0.5">
                      on orders over $100
                    </div>
                  )}
                </div>

                {p.stock && p.stock < 10 && (
                  <p className="text-[8px] font-black text-red-600 uppercase tracking-widest mt-1">Only {p.stock} left in stock</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-500 px-4 py-2 rounded-full mb-4">
                <Zap size={16} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-widest">Global Best Sellers</span>
              </div>
              <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-tight">
                Top Rated <br/> <span className="text-blue-500">Performance Gear</span>
              </h2>
            </div>
            <Link to={getLink('/products')} className="bg-white text-black px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
              Explore All Best Sellers
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.filter(p => p.rating >= 4.8).slice(0, 3).map((p, i) => (
              <Link to={getProductLink(p.id)} key={p.id} className="group relative bg-white/5 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-8 flex items-center gap-6 md:gap-8 hover:bg-white/10 transition-all">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-xl md:rounded-2xl overflow-hidden flex-shrink-0">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    <Star size={12} fill="currentColor" />
                    <span className="text-xs font-black text-white">{p.rating}</span>
                  </div>
                  <h4 className="font-black uppercase text-sm mb-2 line-clamp-1">{p.name}</h4>
                  <div className="text-xl font-black text-blue-500 tracking-tighter">{formatPrice(p.price)}</div>
                  <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    <span>{p.sales}+ Sold</span>
                    <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                    <span className="text-green-500">In Stock</span>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-black italic text-xl shadow-xl">
                  #{i + 1}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Seller Section */}
      {!showName && (
        <section className="py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-900 rounded-full blur-[120px]"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[3rem] p-12 md:p-20 text-center">
              <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase text-white mb-8 leading-tight">
                Start Your Global <br/> <span className="text-blue-500 underline">E-Commerce Business</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-lg font-medium">
                Join our network of professional sellers. We handle manufacturing, logistics, and quality control. You focus on building your brand and earning commissions.
              </p>
              <Link to="/register-show" className="inline-flex items-center gap-3 bg-blue-600 text-white px-12 py-6 rounded-full font-black text-lg uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-2xl shadow-blue-600/20">
                Launch Your Show <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose W-LORD MARKET */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-8 leading-tight">
                Why Choose <br/> <span className="text-blue-600">W-LORD MARKET?</span>
              </h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Factory size={28} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-2">Direct From Factory</h4>
                    <p className="text-gray-500 font-medium">Skip the middlemen. We source directly from top-tier manufacturers to ensure the best pricing and quality.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <Globe size={28} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-2">Global Logistics Network</h4>
                    <p className="text-gray-500 font-medium">Our integrated shipping network ensures your products reach any corner of the world safely and quickly.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 flex-shrink-0">
                    <CheckCircle2 size={28} />
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-lg mb-2">Quality Guaranteed</h4>
                    <p className="text-gray-500 font-medium">Every item undergoes rigorous quality control checks before being dispatched from our global hubs.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=2070" 
                className="rounded-[3rem] shadow-2xl"
                alt="Logistics"
                loading="lazy"
              />
              <div className="absolute -bottom-10 -left-10 bg-blue-600 p-10 rounded-[2.5rem] shadow-2xl hidden md:block">
                <span className="text-6xl font-black text-white block mb-2">200+</span>
                <span className="text-white/80 font-black uppercase text-xs tracking-widest">Countries Served</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Global <span className="text-blue-600">Feedback</span></h2>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Trusted by thousands of customers worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "James Wilson", country: "United Kingdom", text: "The factory direct pricing is unbeatable. Quality is exactly as described.", rating: 5 },
              { name: "Elena Rodriguez", country: "Spain", text: "Fast shipping to Europe. The sportswear collection is professional grade.", rating: 5 },
              { name: "Ahmed Al-Sayed", country: "UAE", text: "Excellent bulk order support for our academy. Highly recommended.", rating: 5 }
            ].map((review, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100">
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-600 font-medium italic mb-8 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-black">
                    {review.name[0]}
                  </div>
                  <div>
                    <h5 className="font-black uppercase text-sm">{review.name}</h5>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.country}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <Link to="/" className="block mb-8">
                <BrandLogo className="scale-150 origin-left" />
              </Link>
              <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-4 text-white">Join the <span className="text-black">W-LORD Community</span></h2>
              <p className="text-blue-100 font-medium text-lg">Subscribe for exclusive deals and global manufacturing updates.</p>
            <form className="flex w-full max-w-xl bg-white rounded-full p-2 shadow-2xl">
              <div className="flex items-center pl-6 text-gray-400">
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow bg-transparent border-none outline-none px-4 py-4 font-bold text-gray-900"
              />
              <button className="bg-black text-white px-8 py-4 rounded-full font-black uppercase text-sm tracking-widest hover:bg-blue-800 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
