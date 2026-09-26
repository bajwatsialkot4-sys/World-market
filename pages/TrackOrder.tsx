import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useTranslation } from '../src/translations';
import { Search, Package, CheckCircle, Clock, MapPin, AlertCircle, ArrowRight } from 'lucide-react';

const TrackOrder: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsTracking(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
            Track Your <span className="text-blue-600 underline">Order</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Enter your order ID and email address to see the current status of your shipment.
          </p>
        </div>

        <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100">
          {!isTracking ? (
            <form onSubmit={handleTrack} className="space-y-12 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Order ID</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g. #ORD-12345"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl px-8 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                  <input 
                    required
                    type="email" 
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-2xl px-8 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                  />
                </div>
              </div>
              <button 
                type="submit"
                className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
              >
                <Search size={20} />
                Track Order
              </button>
            </form>
          ) : (
            <div className="space-y-12 animate-fadeIn">
              <div className="flex items-center justify-between pb-8 border-b border-gray-100">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900">Order {orderId}</h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Status: <span className="text-blue-600">In Transit</span></p>
                </div>
                <button 
                  onClick={() => setIsTracking(false)}
                  className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline"
                >
                  New Search
                </button>
              </div>

              <div className="space-y-12">
                {[
                  { status: 'Delivered', date: 'Feb 25, 2025', desc: 'Package delivered to recipient.', icon: CheckCircle, completed: false },
                  { status: 'Out for Delivery', date: 'Feb 24, 2025', desc: 'Package is with the local courier.', icon: MapPin, completed: false },
                  { status: 'In Transit', date: 'Feb 22, 2025', desc: 'Package has left the origin country.', icon: Clock, completed: true },
                  { status: 'Order Processed', date: 'Feb 20, 2025', desc: 'Order has been verified and packed.', icon: Package, completed: true },
                ].map((step, i) => (
                  <div key={i} className={`flex gap-8 relative ${!step.completed ? 'opacity-30' : ''}`}>
                    {i !== 3 && (
                      <div className={`absolute left-6 top-12 bottom-0 w-0.5 ${step.completed ? 'bg-blue-600' : 'bg-gray-100'}`} />
                    )}
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 z-10 ${step.completed ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-gray-100 text-gray-400'}`}>
                      <step.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tighter text-gray-900">{step.status}</h4>
                      <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">{step.date}</p>
                      <p className="text-sm text-gray-500 font-bold leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 p-10 rounded-3xl border border-blue-100 flex items-center gap-6">
                <AlertCircle className="text-blue-600 flex-shrink-0" size={32} />
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-1">Estimated Delivery</h4>
                  <p className="text-xs text-gray-500 font-bold leading-relaxed">Your package is expected to arrive by March 5, 2025.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-24 text-center">
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-8">Need more help?</p>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <a href="#" className="text-gray-900 font-black uppercase text-sm tracking-widest hover:text-blue-600 transition-colors">Shipping Policy</a>
            <a href="#" className="text-gray-900 font-black uppercase text-sm tracking-widest hover:text-blue-600 transition-colors">Contact Support</a>
            <a href="#" className="text-gray-900 font-black uppercase text-sm tracking-widest hover:text-blue-600 transition-colors">FAQ</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
