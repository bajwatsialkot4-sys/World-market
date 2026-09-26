import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { useTranslation } from '../../src/translations';
import { MessageCircle, Mail, Clock, Send, CheckCircle, MapPin, Phone } from 'lucide-react';

const ContactUs: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
            Get in <span className="text-blue-600 underline">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            We are here to help you 24/7. Reach out to us via email, WhatsApp, or through our contact form.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-8 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">WhatsApp Support</h3>
              <p className="text-gray-500 text-sm font-bold leading-relaxed mb-8">Direct support for all your inquiries.</p>
              <a 
                href="https://wa.me/923187536795" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-green-600 transition-all shadow-xl shadow-green-600/20"
              >
                Chat on WhatsApp
              </a>
            </div>

            <div className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <Mail size={32} />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">Official Email</h3>
              <p className="text-gray-500 text-sm font-bold leading-relaxed mb-4">For support, inquiries and orders.</p>
              <a href="mailto:worldmarketsupport@gmail.com" className="text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">worldmarketsupport@gmail.com</a>
            </div>

            <div className="bg-gray-900 p-12 rounded-[4rem] text-white flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-3xl" />
              <Clock className="text-blue-500 mb-8" size={32} />
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">24/7 Support</h3>
              <p className="text-gray-400 text-sm font-bold leading-relaxed">Our global team is always available to assist you.</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100">
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-8 animate-fadeIn">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                  <CheckCircle size={48} />
                </div>
                <h2 className="text-4xl font-black italic uppercase tracking-tighter">Message <span className="text-blue-600 underline">Sent</span></h2>
                <p className="text-gray-500 font-bold leading-relaxed max-w-md">
                  Thank you for reaching out. Our team will review your message and get back to you within 24 hours.
                </p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="text-blue-600 font-black uppercase text-xs tracking-widest hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12 animate-fadeIn">
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Full Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-gray-50 border-none rounded-2xl px-8 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      className="w-full bg-gray-50 border-none rounded-2xl px-8 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Message</label>
                  <textarea 
                    required
                    rows={6}
                    placeholder="How can we help you?"
                    className="w-full bg-gray-50 border-none rounded-2xl px-8 py-4 text-sm font-bold focus:ring-2 focus:ring-blue-600 transition-all outline-none resize-none"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
