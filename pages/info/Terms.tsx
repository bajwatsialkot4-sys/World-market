import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useTranslation } from '../../src/translations';

const Terms: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12">
          Terms & <span className="text-blue-600 underline">Conditions</span>
        </h1>
        
        <div className="prose prose-blue max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              Welcome to W-LORD MARKET. These Terms and Conditions govern your use of our website and services. By accessing or using W-LORD MARKET, you agree to be bound by these terms. If you do not agree, please do not use our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">2. Use of the Platform</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              You must be at least 18 years old to use our services. You are responsible for maintaining the confidentiality of your account and password. Any activity under your account is your responsibility.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">3. Product Listings & Pricing</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              W-LORD MARKET is a marketplace connecting buyers and sellers. While we strive for accuracy, we do not warrant that product descriptions or prices are error-free. Prices are subject to change without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">4. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              All content on W-LORD MARKET, including text, graphics, logos, and images, is the property of W-LORD MARKET or its content suppliers and is protected by international copyright laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">5. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              W-LORD MARKET shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
            </p>
          </section>

          <section className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-4">Contact for Legal Concerns</h2>
            <p className="text-sm text-gray-500 font-bold mb-4">If you have any questions regarding these terms, please contact our legal team.</p>
            <p className="text-blue-600 font-black uppercase tracking-widest text-xs">legal@worldmarket.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
