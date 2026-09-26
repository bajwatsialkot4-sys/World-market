import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useTranslation } from '../../src/translations';
import { ChevronDown, ChevronUp, HelpCircle, Search, MessageCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by visiting our Track Order page and entering your order ID and email address. You will also receive a tracking link in your shipment confirmation email."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard), PayPal, and bank transfers. For customers in Pakistan, we also support JazzCash."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to over 150 countries worldwide. Shipping rates and delivery times vary by location and will be calculated at checkout."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items in their original condition and packaging. Please visit our Refund & Return Policy page for more details."
    },
    {
      question: "How can I become a seller?",
      answer: "To become a seller, click on the 'Become a Seller' link in the footer and follow the registration process. Once your account is verified, you can start listing your products."
    },
    {
      question: "Are the products factory-direct?",
      answer: "Yes, we partner directly with manufacturers to bring you high-quality products at factory-direct prices, eliminating unnecessary middleman markups."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
            Frequently Asked <span className="text-blue-600 underline">Questions</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Everything you need to know about W-LORD MARKET. Can't find the answer? Reach out to us.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-600/5 border border-gray-100 overflow-hidden transition-all duration-500"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 md:p-10 text-left hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 pr-8">
                  {faq.question}
                </h3>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${openIndex === index ? 'bg-blue-600 text-white rotate-180' : 'bg-gray-100 text-gray-400'}`}>
                  <ChevronDown size={20} />
                </div>
              </button>
              {openIndex === index && (
                <div className="px-10 pb-10 animate-fadeIn">
                  <div className="pt-6 border-t border-gray-50">
                    <p className="text-gray-500 font-bold leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-24 bg-gray-900 p-12 md:p-20 rounded-[4rem] text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl" />
          <HelpCircle className="text-blue-500 mb-8 mx-auto" size={48} />
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Still have questions?</h2>
          <p className="text-gray-400 font-medium mb-12 max-w-md mx-auto">
            Our support team is available 24/7 to assist you with any inquiries.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/923187536795" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all shadow-xl shadow-green-600/20 flex items-center gap-3"
            >
              <MessageCircle size={20} />
              WhatsApp Support
            </a>
            <a 
              href="mailto:worldmarketsupport@gmail.com"
              className="bg-white/10 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/20 transition-all border border-white/10"
            >
              Email Us (worldmarketsupport@gmail.com)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
