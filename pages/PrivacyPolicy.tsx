import React from 'react';
import { useStore } from '../context/StoreContext';
import { useTranslation } from '../src/translations';
import { Lock, Eye, ShieldCheck, UserCheck } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-12">
          Privacy <span className="text-blue-600 underline">Policy</span>
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <div className="bg-blue-50 p-10 rounded-3xl">
            <Lock className="text-blue-600 mb-6" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Data Protection</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed">
              We use industry-standard encryption to protect your personal and payment data at all times.
            </p>
          </div>
          <div className="bg-green-50 p-10 rounded-3xl">
            <ShieldCheck className="text-green-600 mb-6" size={32} />
            <h3 className="text-xl font-black uppercase tracking-tighter mb-4">Your Rights</h3>
            <p className="text-sm text-gray-500 font-bold leading-relaxed">
              You have the right to access, correct, or delete your personal information at any time.
            </p>
          </div>
        </div>

        <div className="prose prose-blue max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">1. Information Collection</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This includes your name, email, shipping address, and payment information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">2. Use of Personal Data</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              We use your information to process orders, provide customer support, and send you updates about our services. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">3. Cookies Usage</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. You can manage your cookie preferences in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">4. Third-Party Sharing</h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              We share your information with trusted third-party service providers who assist us in operating our platform, such as payment processors and shipping companies.
            </p>
          </section>

          <section className="bg-gray-50 p-10 rounded-3xl border border-gray-100">
            <h2 className="text-xl font-black uppercase tracking-tighter mb-4">Privacy Concerns</h2>
            <p className="text-sm text-gray-500 font-bold mb-4">If you have any questions or concerns regarding your privacy, please contact our data protection officer.</p>
            <p className="text-blue-600 font-black uppercase tracking-widest text-xs">privacy@worldmarket.com</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
