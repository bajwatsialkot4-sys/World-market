
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, LogIn, AlertCircle, UserPlus } from 'lucide-react';
import { hashPassword } from '../services/authUtils';

const SellerLogin: React.FC = () => {
  const navigate = useNavigate();
  const { sellers } = useStore();
  const [formData, setFormData] = useState({
    sellerId: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const cleanInput = formData.sellerId.trim().toLowerCase();
      const cleanPass = formData.password.trim();
      const hashedPass = await hashPassword(cleanPass);
      
      const seller = sellers.find(s => 
        (s.showName?.toLowerCase() === cleanInput || 
         s.id.toLowerCase() === cleanInput || 
         s.email.toLowerCase() === cleanInput ||
         s.shopName?.toLowerCase() === cleanInput) && 
        (
          (s.passwordHash && s.passwordHash === hashedPass) ||
          (s.password && (s.password === hashedPass || s.password === cleanPass)) ||
          (!s.password && !s.passwordHash && cleanPass === 'password123')
        )
      );

      if (seller) {
        navigate(`/seller-panel/${seller.showName || seller.id}`);
      } else {
        setError('Invalid Login Username/Seller ID or Password. Please try again or contact administrator to reset your password.');
      }
    } catch (err: any) {
      setError('Login error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
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
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Seller ID / Shop ID / Username</label>
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
            disabled={isSubmitting}
            className="w-full bg-black text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 transition-all transform active:scale-95 mt-4 disabled:opacity-50"
          >
            {isSubmitting ? 'Verifying...' : 'Enter Panel'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span className="bg-white px-4">New Partner?</span>
          </div>
        </div>

        {/* Create New Seller Account Button */}
        <button
          type="button"
          onClick={() => navigate('/register-show')}
          className="w-full bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white border-2 border-blue-600/30 hover:border-blue-600 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
        >
          <UserPlus size={16} />
          Create New Seller Account
        </button>

        <p className="mt-8 text-center text-[9px] font-black uppercase text-gray-400 tracking-widest leading-relaxed">
          Forgot password? Please contact W-LORD Market support via WhatsApp to reset.
        </p>
      </div>
    </div>
  );
};

export default SellerLogin;
