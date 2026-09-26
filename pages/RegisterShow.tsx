
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ADMIN_WHATSAPP } from '../constants';
import { generateProfessionalLink } from '../services/routingUtils';

const RegisterShow: React.FC = () => {
  const navigate = useNavigate();
  const { addSeller } = useStore();
  const [formData, setFormData] = useState({
    fullName: '',
    whatsapp: '',
    email: '',
    country: '',
    city: '',
    contactNumber: '',
    paymentDetails: '',
    showName: ''
  });
  const [registrationSuccess, setRegistrationSuccess] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the shareable show ID
    const showId = formData.showName.toLowerCase().trim().replace(/\s+/g, '-');
    const proLink = generateProfessionalLink(showId);
    
    // Generate simple dynamic password
    const generatedPassword = Math.random().toString(36).slice(-8).toUpperCase();
    
    // Save to local system
    addSeller({
      fullName: formData.fullName,
      whatsapp: formData.whatsapp,
      email: formData.email,
      password: generatedPassword,
      country: formData.country,
      city: formData.city,
      contactNumber: formData.contactNumber,
      paymentDetails: formData.paymentDetails,
      showName: showId,
      shopName: formData.showName,
      businessType: 'Individual',
      location: `${formData.city}, ${formData.country}`,
      responseTime: '24h'
    });
    
    // Format WhatsApp message for the Admin
    const message = `NEW SELLER REGISTERED – W-LORD MARKET Admin
---------------------------------
Name: ${formData.fullName}
WhatsApp: ${formData.whatsapp}
Email: ${formData.email}
Password: ${generatedPassword}
Location: ${formData.city}, ${formData.country}
Contact: ${formData.contactNumber}
Show Name: ${formData.showName}
PRO LINK: ${proLink}
Payment Method: Global Bank Account (IBAN)
Details: ${formData.paymentDetails}
---------------------------------`;

    // Ensure link is permanent and shareable via HashRouter support
    const waLink = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(waLink, '_blank');
    
    // Set success state to show user their professional link
    setRegistrationSuccess(proLink);
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full text-center border border-blue-100 animate-fadeIn">
          <div className="w-20 h-20 bg-green-500 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-xl shadow-green-500/30">
            🚀
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-4 leading-tight">Your Show is <span className="text-blue-600 underline">Live</span></h2>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-8 leading-relaxed">
            Your registration is sent to the manufacturer. Use the professional link below to start selling on mobile.
          </p>

          <div className="bg-blue-50 p-6 rounded-2xl border-2 border-dashed border-blue-200 mb-8 group relative overflow-hidden text-left">
            <span className="text-[9px] font-black uppercase text-blue-600 absolute top-2 right-4">Seller Credentials</span>
            <div className="mt-4 space-y-2">
              <p className="text-[10px] font-black uppercase text-gray-400">Shop Link:</p>
              <p className="text-blue-700 font-black text-sm break-all select-all">{registrationSuccess}</p>
              <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-blue-100">
                <div>
                   <p className="text-[9px] font-black uppercase text-gray-400">Seller ID</p>
                   <p className="text-sm font-black text-gray-900">{formData.showName.toLowerCase().replace(/\s+/g, '-')}</p>
                </div>
                <div>
                   <p className="text-[9px] font-black uppercase text-gray-400">Password</p>
                   <p className="text-sm font-black text-blue-600">Generated (Sent to WA)</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(`Link: ${registrationSuccess}\nID: ${formData.showName.toLowerCase().replace(/\s+/g, '-')}`);
                alert("Credentials copied!");
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all mt-6"
            >
              Copy Credentials
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                navigate('/seller-login');
              }}
              className="w-full bg-black text-white py-5 rounded-xl font-black text-base uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-all transform active:scale-95"
            >
              Login to Panel
            </button>
            <button 
              onClick={() => setRegistrationSuccess(null)}
              className="text-[10px] font-black uppercase text-gray-400 hover:text-black tracking-widest"
            >
              Back to Registration
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:py-20">
      <div className="max-w-2xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl p-8 md:p-16 border border-gray-100 animate-fadeIn">
        <div className="text-center mb-10">
          <div className="inline-block bg-blue-100 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
            Seller Partnership
          </div>
          <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-tight">
            Launch Your <br/> <span className="text-blue-600 underline">Sports Show</span>
          </h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-4">
            Transparent Commission: Seller 5% | Admin 95%
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Proposed Shop Name (Business Link Name)</label>
            <input 
              required
              placeholder="e.g. Global Sports Shop"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 p-5 rounded-2xl outline-none font-black text-blue-600 transition-all text-lg shadow-inner"
              value={formData.showName}
              onChange={e => setFormData({...formData, showName: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Full Name</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.fullName}
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Gmail Address</label>
              <input 
                required
                type="email"
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">WhatsApp Number</label>
              <input 
                required
                placeholder="e.g. 15551234567"
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Secondary Contact</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.contactNumber}
                onChange={e => setFormData({...formData, contactNumber: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Country</label>
              <input 
                required
                placeholder="e.g. United States"
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.country}
                onChange={e => setFormData({...formData, country: e.target.value})}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">City</label>
              <input 
                required
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-blue-600 tracking-widest ml-1">
              International Bank Details (IBAN / BIC)
            </label>
            <textarea 
              required
              rows={3}
              className="w-full bg-blue-50/30 border-2 border-blue-100 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
              placeholder="Full IBAN and Bank Name for Global Payments"
              value={formData.paymentDetails}
              onChange={e => setFormData({...formData, paymentDetails: e.target.value})}
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 transition-all transform active:scale-95 shadow-blue-500/20"
            >
              Verify & Launch
            </button>
            <div className="mt-6 p-4 bg-gray-100 rounded-xl">
              <p className="text-[9px] text-center text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                Security Note: Data is encrypted and sent directly to Admin WhatsApp {ADMIN_WHATSAPP}. 
                Seller identity is private and managed via centralized fulfillment.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterShow;
