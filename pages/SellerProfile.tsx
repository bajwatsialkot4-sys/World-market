import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SELLERS } from '../constants';
import { Star, CheckCircle, MapPin, MessageCircle, ShoppingBag, Award, Clock, Eye, ShieldCheck } from 'lucide-react';

const SellerProfile: React.FC = () => {
  const { sellerId } = useParams();
  const { products, formatPrice, addToCart, setQuickViewProduct } = useStore();
  const seller = SELLERS.find(s => s.id === sellerId);

  if (!seller) return <div className="min-h-screen flex items-center justify-center">Seller not found</div>;

  const sellerProducts = products.filter(p => p.sellerId === seller.id);

  const RankBadge = ({ rank }: { rank: string }) => {
    switch (rank) {
      case 'Gold':
        return (
          <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-2xl border border-yellow-200 shadow-sm shadow-yellow-500/10">
            <Award size={18} className="text-yellow-500" />
            <span className="text-[10px] font-black uppercase tracking-widest">Gold Seller</span>
          </div>
        );
      case 'Silver':
        return (
          <div className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-2xl border border-gray-200 shadow-sm shadow-gray-500/10">
            <Award size={18} className="text-gray-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Silver Seller</span>
          </div>
        );
      case 'Standard':
        return (
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-2xl border border-blue-200 shadow-sm shadow-blue-500/10">
            <Award size={18} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-widest">Standard Seller</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Seller Header */}
      <div className="bg-white border-b border-gray-100 pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
            <div className="w-40 h-40 bg-gray-900 rounded-[3rem] flex items-center justify-center text-white text-5xl font-black italic uppercase tracking-tighter shadow-2xl shadow-gray-900/20">
              {seller.fullName.charAt(0)}
            </div>
            <div className="flex-grow text-center md:text-left space-y-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-center md:justify-start">
                <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
                  {seller.fullName}
                </h1>
                <div className="flex items-center justify-center gap-3">
                  {seller.isVerified && (
                    <div className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full border border-green-100">
                      <ShieldCheck size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{seller.verificationStatus || 'Verified'}</span>
                    </div>
                  )}
                  {seller.businessType && (
                    <div className="flex items-center gap-1 bg-purple-50 text-purple-600 px-3 py-1 rounded-full border border-purple-100">
                      <ShoppingBag size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">{seller.businessType}</span>
                    </div>
                  )}
                  <RankBadge rank={seller.rank} />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-8 text-gray-500">
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-black text-gray-900">{seller.rating} Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingBag size={18} className="text-blue-600" />
                  <span className="text-sm font-black text-gray-900">{seller.totalSales} Sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-purple-600" />
                  <span className="text-sm font-black text-gray-900">{seller.responseTime} Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-red-600" />
                  <span className="text-sm font-black text-gray-900">{seller.city}, {seller.country}</span>
                </div>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-4 pt-4">
                <a 
                  href={`https://wa.me/${seller.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-green-600 transition-all shadow-xl shadow-green-500/20 flex items-center gap-3"
                >
                  <MessageCircle size={20} />
                  Contact via WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Products */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black italic uppercase tracking-tighter">
            Seller <span className="text-blue-600 underline">Catalog</span>
          </h2>
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            {sellerProducts.length} products listed
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {sellerProducts.map(p => (
            <div key={p.id} className="group bg-white p-4 rounded-[2rem] border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all">
              <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden relative mb-4">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
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
                    <ShoppingBag size={18} />
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
  );
};

export default SellerProfile;
