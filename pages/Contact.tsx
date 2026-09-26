
import React, { useState } from 'react';
import { ADMIN_WHATSAPP } from '../constants';
import { useStore } from '../context/StoreContext';

const Contact: React.FC = () => {
  const { activeSeller } = useStore();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Soccer Uniform',
    message: ''
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const urlParams = new URLSearchParams(window.location.search);
    const shopName = urlParams.get('seller') || (activeSeller ? activeSeller.showName : "Main Store");

    const message = `NEW INQUIRY RECEIVED
---------------------------------
Shop Name: ${shopName}
Customer Name: ${formState.name}
Email: ${formState.email}
Subject: ${formState.subject}
Message: ${formState.message}
---------------------------------`;

    const waLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    window.open(waLink, '_blank');
    setSent(true);
  };

  if (sent) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-black mb-4">INQUIRY RECEIVED</h2>
          <p className="text-gray-600 mb-8">
            Thank you for reaching out to W-LORD MARKET. Our export specialist will contact you within 24 hours with a custom quote.
          </p>
          <button 
            onClick={() => setSent(false)}
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-blue-700"
          >
            Send Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          <div>
            <h1 className="text-5xl font-black mb-6">GET IN TOUCH</h1>
            <p className="text-xl text-gray-600 mb-12">
              Ready to take your team to the next level? Contact our manufacturing team today for bulk pricing and export details.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-blue-600 font-bold text-2xl">📧</div>
                <div>
                  <h4 className="font-bold uppercase text-gray-400 text-sm">Email Us</h4>
                  <a href="mailto:worldmarketsupport@gmail.com" className="text-xl font-bold hover:text-blue-600 transition-colors">worldmarketsupport@gmail.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-blue-600 font-bold text-2xl">📍</div>
                <div>
                  <h4 className="font-bold uppercase text-gray-400 text-sm">Global HQ</h4>
                  <p className="text-xl font-bold">W-LORD MARKET Industrial Zone, PK 54000</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-4 rounded-lg text-blue-600 font-bold text-2xl">📱</div>
                <div>
                  <h4 className="font-bold uppercase text-gray-400 text-sm">Fast WhatsApp</h4>
                  <p className="text-xl font-bold">+{ADMIN_WHATSAPP}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold mb-8 uppercase">Direct Inquiry Form</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-gray-50 border p-4 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-gray-50 border p-4 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Uniform Type</label>
                <select 
                  className="w-full bg-gray-50 border p-4 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formState.subject}
                  onChange={e => setFormState({...formState, subject: e.target.value})}
                >
                  <option>Soccer Uniform</option>
                  <option>Basketball Uniform</option>
                  <option>Football Uniform</option>
                  <option>Gym Wear</option>
                  <option>Custom Request</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-500 uppercase mb-2">Message & Quantity</label>
                <textarea 
                  required
                  rows={5}
                  className="w-full bg-gray-50 border p-4 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Tell us about your requirements..."
                  value={formState.message}
                  onChange={e => setFormState({...formState, message: e.target.value})}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-4 rounded font-black text-xl hover:bg-blue-600 transition-colors uppercase tracking-widest"
              >
                Send Inquiry
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
