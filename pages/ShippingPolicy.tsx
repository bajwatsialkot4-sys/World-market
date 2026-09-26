import React from 'react';
import { useStore } from '../context/StoreContext';
import { useTranslation } from '../src/translations';
import { Truck, Globe, Clock, ShieldCheck } from 'lucide-react';

const ShippingPolicy: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12">
          Shipping <span className="text-blue-600 underline">Policy</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-blue-50 p-10 rounded-3xl">
            <Globe className="text-blue-600 mb-6" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Worldwide Shipping</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed">
              We deliver to over 150 countries worldwide, partnering with top logistics providers like DHL, FedEx, and Aramex.
            </p>
          </div>
          <div className="bg-green-50 p-10 rounded-3xl">
            <Clock className="text-green-600 mb-6" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Delivery Times</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed">
              Estimated delivery is 5-15 business days depending on your location. Order processing takes 1-3 business days.
            </p>
          </div>
        </div>

        <div className="prose prose-blue max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">1. Order Processing</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              All orders are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">2. Shipping Rates & Delivery Estimates</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              Shipping charges for your order will be calculated and displayed at checkout. Delivery delays can occasionally occur due to customs or high seasonal demand.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">3. Shipment Confirmation & Order Tracking</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). The tracking number will be active within 24 hours.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">4. Customs, Duties & Taxes</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              W-LORD MARKET is not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer (tariffs, taxes, etc.).
            </p>
          </section>

          <section className="bg-gray-900 p-12 rounded-[3rem] text-white text-center">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">Bulk Shipping</h2>
            <p className="text-gray-400 font-medium mb-8">For large orders or wholesale inquiries, please contact our bulk shipping department.</p>
            <p className="text-blue-500 font-black uppercase tracking-widest text-xs">bulk@worldmarket.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
