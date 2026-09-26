import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useTranslation } from '../../src/translations';
import { RefreshCcw, ShieldCheck, Clock, AlertCircle } from 'lucide-react';

const RefundPolicy: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12">
          Refund & <span className="text-blue-600 underline">Return Policy</span>
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-blue-50 p-8 rounded-3xl text-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock size={24} />
            </div>
            <h3 className="font-black uppercase text-xs tracking-widest mb-2">30 Days</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Return Window</p>
          </div>
          <div className="bg-green-50 p-8 rounded-3xl text-center">
            <div className="w-12 h-12 bg-green-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-black uppercase text-xs tracking-widest mb-2">Full Refund</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Money Back Guarantee</p>
          </div>
          <div className="bg-purple-50 p-8 rounded-3xl text-center">
            <div className="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RefreshCcw size={24} />
            </div>
            <h3 className="font-black uppercase text-xs tracking-widest mb-2">Easy Exchange</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase">Hassle-Free Process</p>
          </div>
        </div>

        <div className="prose prose-blue max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">1. Eligibility for Returns</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              To be eligible for a return, your item must be unused and in the same condition that you received it. It must also be in the original packaging. Returns must be initiated within 30 days of delivery.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">2. Non-Returnable Items</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              Several types of goods are exempt from being returned, including perishable goods, intimate or sanitary goods, hazardous materials, or flammable liquids or gases.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">3. Refund Process</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">4. Shipping Costs</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable. If you receive a refund, the cost of return shipping will be deducted from your refund.
            </p>
          </section>

          <section className="bg-red-50 p-10 rounded-3xl border border-red-100 flex gap-6 items-start">
            <AlertCircle className="text-red-600 flex-shrink-0" size={24} />
            <div>
              <h2 className="text-xl font-black uppercase tracking-tighter mb-4 text-red-900">Important Note</h2>
              <p className="text-sm text-red-700 font-bold leading-relaxed">
                Please do not send your purchase back to the manufacturer. All returns must be processed through W-LORD MARKET's official return portal.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
