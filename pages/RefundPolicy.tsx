import React from 'react';
import { useStore } from '../context/StoreContext';
import { useTranslation } from '../src/translations';
import { RefreshCcw, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

const RefundPolicy: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12">
          Refund & <span className="text-blue-600 underline">Return</span> Policy
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-blue-50 p-10 rounded-3xl">
            <RefreshCcw className="text-blue-600 mb-6" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Easy Returns</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed">
              We offer a 30-day return policy for most items in their original condition and packaging.
            </p>
          </div>
          <div className="bg-green-50 p-10 rounded-3xl">
            <ShieldCheck className="text-green-600 mb-6" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Refund Guarantee</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed">
              Once your return is received and inspected, we will process your refund within 7-10 business days.
            </p>
          </div>
        </div>

        <div className="prose prose-blue max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">1. Eligibility for Returns</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">2. Non-Returnable Items</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              Certain types of items cannot be returned, such as perishable goods, custom products, and personal care items. Please contact us if you have questions about your specific item.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">3. Return Shipping</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">4. Damaged or Defective Items</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              If you receive a damaged or defective item, please contact us immediately with photos of the damage. We will provide a replacement or full refund.
            </p>
          </section>

          <section className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-4">Need Help?</h2>
            <p className="text-sm text-gray-500 font-bold mb-4">If you have any questions regarding our refund and return policy, please contact our support team.</p>
            <p className="text-blue-600 font-black uppercase tracking-widest text-xs">returns@worldmarket.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
