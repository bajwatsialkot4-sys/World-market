import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowLeft, Tag, ShoppingCart, Star, Eye } from 'lucide-react';

const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const { products, language, formatPrice, addToCart, setQuickViewProduct } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    try {
      // Find post
    } catch (err) {
      console.error("Blog post resolution error:", err);
    } finally {
      const timer = setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 150);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }
  }, [slug]);

  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pb-24">
        <div className="max-w-4xl mx-auto px-4 py-24 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-28 mb-12" />
          <div className="space-y-6 mb-12">
            <div className="h-6 bg-gray-200 rounded-full w-24" />
            <div className="h-12 bg-gray-200 rounded w-full" />
            <div className="h-12 bg-gray-200 rounded w-3/4" />
            <div className="h-12 bg-gray-200 rounded-2xl w-48 mt-4" />
          </div>
          <div className="aspect-video bg-gray-200 rounded-[4rem] w-full mb-12" />
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-full" />
            <div className="h-6 bg-gray-200 rounded w-5/6" />
            <div className="h-6 bg-gray-200 rounded w-4/5" />
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
        <h2 className="text-3xl font-black italic uppercase mb-4">Post Not Found</h2>
        <p className="text-gray-500 mb-8">The requested blog article could not be located.</p>
        <Link to="/blog" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black uppercase text-xs tracking-widest shadow-lg">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Related products for SEO internal linking
  const relatedProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 font-black uppercase text-xs tracking-widest mb-12 hover:-translate-x-2 transition-transform">
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/20">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                <Calendar size={14} />
                {post.date}
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-blue-600">
                <User size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Written by</p>
                <p className="text-lg font-black uppercase tracking-tighter text-gray-900">{post.author}</p>
              </div>
            </div>
          </div>

          <div className="aspect-video rounded-[4rem] overflow-hidden shadow-2xl shadow-blue-600/10 bg-gray-100">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover" 
              loading="lazy"
              decoding="async"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                if (!target.src.includes('seed/blog/800/600')) {
                  target.src = 'https://picsum.photos/seed/blog/800/600';
                }
              }}
            />
          </div>

          <div className="prose prose-blue prose-2xl max-w-none text-gray-600 leading-relaxed font-medium">
            <p className="text-2xl text-gray-900 font-black italic mb-12 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="space-y-8">
              {post.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-12 border-t border-gray-100">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-2 bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl">
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section for SEO */}
      <div className="bg-gray-50 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-black italic uppercase tracking-tighter">Related <span className="text-blue-600 underline">Products</span></h2>
            <Link to="/products" className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <div key={p.id} className="group bg-white p-4 rounded-[2rem] border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all">
                <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden relative mb-4">
                  <img 
                    src={p.image} 
                    alt={p.name} 
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
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button 
                      onClick={() => setQuickViewProduct(p)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                    >
                      <Eye size={18} />
                    </button>
                    <button 
                      onClick={() => addToCart(p)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{p.category}</span>
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star size={10} fill="currentColor" />
                      <span className="text-[10px] font-black text-gray-900">{p.rating}</span>
                    </div>
                  </div>
                  <h4 className="font-bold text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">{p.name}</h4>
                  <p className="text-lg font-black tracking-tighter text-gray-900 mt-2">{formatPrice(p.price)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
