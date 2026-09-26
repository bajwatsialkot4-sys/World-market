import React from 'react';
import { useStore } from '../context/StoreContext';
import { useTranslation } from '../src/translations';
import { FileText, ShieldCheck, Scale, AlertCircle } from 'lucide-react';

const Terms: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12">
          Terms & <span className="text-blue-600 underline">Conditions</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-blue-50 p-10 rounded-3xl">
            <Scale className="text-blue-600 mb-6" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Legal Agreement</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed">
              By using our platform, you agree to comply with all terms and conditions outlined in this document.
            </p>
          </div>
          <div className="bg-red-50 p-10 rounded-3xl">
            <AlertCircle className="text-red-600 mb-6" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Compliance</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed">
              Failure to comply with these terms may result in account suspension or legal action.
            </p>
          </div>
        </div>

        <div className="prose prose-blue max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">1. User Accounts</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">2. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              All content on this platform, including text, graphics, logos, and software, is the property of W-LORD MARKET and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">3. Prohibited Activities</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              Users are prohibited from using the platform for any unlawful purpose, including fraud, harassment, or the distribution of malicious software.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">4. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              W-LORD MARKET shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
            </p>
          </section>

          <section className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-4">Questions?</h2>
            <p className="text-sm text-gray-500 font-bold mb-4">If you have any questions regarding our terms and conditions, please contact our legal department.</p>
            <p className="text-blue-600 font-black uppercase tracking-widest text-xs">legal@worldmarket.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
