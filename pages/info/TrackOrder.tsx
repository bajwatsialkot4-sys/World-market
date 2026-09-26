import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useTranslation } from '../../src/translations';
import { Package, Search, Truck, CheckCircle, Clock, MapPin } from 'lucide-react';

const TrackOrder: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);
  const [orderId, setOrderId] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData({
        id: orderId,
        status: 'In Transit',
        estimatedDelivery: '2025-05-30',
        currentLocation: 'JFK International Hub, New York, USA',
        history: [
          { date: '2025-05-18', time: '10:30 AM', status: 'In Transit', location: 'New York, USA', description: 'Package has arrived at the international sorting facility.' },
          { date: '2025-05-17', time: '04:15 PM', status: 'Departed', location: 'London Gateway, UK', description: 'Package is in transit to the destination country.' },
          { date: '2025-05-16', time: '09:00 AM', status: 'Processed', location: 'Global Logistics Center', description: 'Order verified and processed for international priority shipping.' }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 text-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8">
            Track Your <span className="text-blue-500 underline">Order</span>
          </h1>
          <form onSubmit={handleTrack} className="relative max-w-2xl mx-auto">
            <Package className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              required
              type="text" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter your Order ID (e.g., WM-123456)..."
              className="w-full bg-white/10 border-none rounded-full px-16 py-5 text-white font-bold focus:ring-2 focus:ring-blue-600 transition-all placeholder:text-gray-500"
            />
            <button 
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-8 rounded-full font-black uppercase tracking-widest hover:bg-blue-700 transition-all disabled:opacity-50"
            >
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-24">
        {trackingData ? (
          <div className="space-y-12 animate-fadeIn">
            {/* Summary Card */}
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-blue-600/5 border border-gray-100 grid md:grid-cols-3 gap-12">
              <div className="text-center md:text-left">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Order ID</h3>
                <p className="text-xl font-black uppercase tracking-tighter text-gray-900">{trackingData.id}</p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Status</h3>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                  <p className="text-xl font-black uppercase tracking-tighter text-blue-600">{trackingData.status}</p>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Est. Delivery</h3>
                <p className="text-xl font-black uppercase tracking-tighter text-gray-900">{trackingData.estimatedDelivery}</p>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl shadow-blue-600/5 border border-gray-100">
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-12">Tracking History</h3>
              <div className="space-y-12">
                {trackingData.history.map((step: any, idx: number) => (
                  <div key={idx} className="flex gap-8 group">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${idx === 0 ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/20' : 'bg-gray-100 text-gray-400'}`}>
                        {idx === 0 ? <Truck size={24} /> : (idx === trackingData.history.length - 1 ? <CheckCircle size={24} /> : <Clock size={24} />)}
                      </div>
                      {idx !== trackingData.history.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-100 mt-4 group-hover:bg-blue-100 transition-colors" />
                      )}
                    </div>
                    <div className="pb-12">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-xs font-black uppercase tracking-widest text-gray-400">{step.date}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded">{step.time}</span>
                      </div>
                      <h4 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-2">{step.status}</h4>
                      <div className="flex items-center gap-2 text-gray-500 mb-4">
                        <MapPin size={14} />
                        <span className="text-xs font-bold uppercase tracking-widest">{step.location}</span>
                      </div>
                      <p className="text-gray-500 font-medium leading-relaxed max-w-xl">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-[4rem] border border-dashed border-gray-200">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
              <Package size={48} />
            </div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Ready to track?</h2>
            <p className="text-gray-400 font-medium max-w-md mx-auto">
              Enter your Order ID above to see the real-time status of your global shipment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;
