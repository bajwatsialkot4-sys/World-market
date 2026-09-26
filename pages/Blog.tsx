import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BLOG_POSTS } from '../constants';
import { Calendar, User, ArrowRight } from 'lucide-react';

const Blog: React.FC = () => {
  const { language } = useStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    let isMounted = true;
    try {
      // Simulate/ensure blog resolution
    } catch (err) {
      console.error("Blog load error:", err);
    } finally {
      const timer = setTimeout(() => {
        if (isMounted) setIsLoading(false);
      }, 150);
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="bg-gray-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6">
            W-LORD MARKET <span className="text-blue-500 underline">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed">
            Insights, trends, and news from the global factory-direct marketplace.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-12">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-[3rem] p-8 border border-gray-100 flex flex-col gap-4 animate-pulse">
                <div className="aspect-video bg-gray-200 rounded-2xl w-full" />
                <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
                <div className="h-7 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
                <div className="h-10 bg-gray-200 rounded-xl w-full mt-auto" />
              </div>
            ))}
          </div>
        ) : BLOG_POSTS && BLOG_POSTS.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map(post => (
              <Link 
                key={post.id} 
                to={`/blog/${post.slug}`}
                className="group bg-white rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-600/5 border border-gray-100 flex flex-col hover:-translate-y-2 transition-all duration-500"
              >
                <div className="aspect-video overflow-hidden bg-gray-100">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                    <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                      <Calendar size={12} />
                      {post.date}
                    </div>
                  </div>
                  <h2 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-blue-600 transition-colors leading-none">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-900 font-black uppercase text-[10px] tracking-widest">
                      <User size={14} className="text-blue-600" />
                      {post.author}
                    </div>
                    <div className="text-blue-600 group-hover:translate-x-2 transition-transform">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-16 text-center shadow-xl border border-gray-100">
            <h2 className="text-2xl font-black italic uppercase tracking-tighter mb-4">No Blog Posts Found</h2>
            <p className="text-gray-500 text-sm">Please check back later for new articles and insights.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
