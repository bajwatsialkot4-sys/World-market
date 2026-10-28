
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, LogIn, AlertCircle } from 'lucide-react';

const SellerLogin: React.FC = () => {
  const navigate = useNavigate();
  const { sellers } = useStore();
  const [formData, setFormData] = useState({
    sellerId: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanInput = formData.sellerId.trim().toLowerCase();
    const cleanPass = formData.password.trim();
    
    const seller = sellers.find(s => 
      (s.showName?.toLowerCase() === cleanInput || 
       s.id.toLowerCase() === cleanInput || 
       s.email.toLowerCase() === cleanInput ||
       s.shopName?.toLowerCase() === cleanInput) && 
      (s.password === cleanPass || (!s.password && cleanPass === 'password123'))
    );

    if (seller) {
      navigate(`/seller-panel/${seller.showName || seller.id}`);
    } else {
      setError('Invalid Login Username/Seller ID or Password. Please try again or contact administrator to reset your password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 border border-gray-100 animate-fadeIn">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-600/30">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Seller <span className="text-blue-600 underline">Login</span></h1>
          <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Access your partner control panel</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 animate-shake">
            <AlertCircle size={18} />
            <p className="text-[10px] font-black uppercase">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Seller ID / Shop ID</label>
            <input 
              required
              placeholder="e.g. arsalan-sports"
              className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
              value={formData.sellerId}
              onChange={e => setFormData({...formData, sellerId: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Password</label>
            <input 
              required
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 transition-all transform active:scale-95 mt-4"
          >
            Enter Panel
          </button>
        </form>

        <p className="mt-10 text-center text-[9px] font-black uppercase text-gray-400 tracking-widest leading-relaxed">
          Forgot password? Please contact W-LORD Market support via WhatsApp to reset.
        </p>
      </div>
    </div>
  );
};

export default SellerLogin;
