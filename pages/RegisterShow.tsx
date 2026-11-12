import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { generateProfessionalLink } from '../services/routingUtils';
import { hashPassword, generateSecureRandomPassword } from '../services/authUtils';
import { Copy, Check, Eye, EyeOff, ShieldCheck, ArrowRight, Store, Key, User, Hash, AlertTriangle } from 'lucide-react';

interface RegistrationDetails {
  shopLink: string;
  username: string;
  sellerId: string;
  password: string;
  shopName: string;
  fullName: string;
}

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [registrationSuccess, setRegistrationSuccess] = useState<RegistrationDetails | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(true);

  const copyToClipboard = async (text: string, keyName: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedKey(keyName);
      setTimeout(() => setCopiedKey(null), 2500);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyAllCredentials = () => {
    if (!registrationSuccess) return;
    const allText = `W-LORD MARKET — SELLER ACCOUNT CREDENTIALS
----------------------------------------
Shop Name: ${registrationSuccess.shopName}
Shop Link: ${registrationSuccess.shopLink}
Username:  ${registrationSuccess.username}
Seller ID: ${registrationSuccess.sellerId}
Password:  ${registrationSuccess.password}
----------------------------------------
Store these credentials in a safe place. Your password is encrypted and will not be displayed again.`;
    copyToClipboard(allText, 'all');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // Format the shareable show ID / username
      const cleanShowId = formData.showName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '') || `shop-${Date.now().toString(36)}`;

      const proLink = generateProfessionalLink(cleanShowId);

      // Generate secure dynamic random password
      const generatedPassword = generateSecureRandomPassword();

      // Cryptographically hash password before saving to Firestore (never store plain text)
      const hashedPassword = await hashPassword(generatedPassword);

      // Save securely into existing Firebase Firestore sellers collection
      const newSeller = await addSeller({
        fullName: formData.fullName.trim(),
        whatsapp: formData.whatsapp.trim(),
        email: formData.email.trim().toLowerCase(),
        passwordHash: hashedPassword,
        country: formData.country.trim(),
        city: formData.city.trim(),
        contactNumber: formData.contactNumber.trim(),
        paymentDetails: formData.paymentDetails.trim(),
        showName: cleanShowId,
        shopName: formData.showName.trim(),
        businessType: 'Individual',
        location: `${formData.city.trim()}, ${formData.country.trim()}`,
        responseTime: '24h',
        passwordUpdatedAt: new Date().toISOString()
      });

      // DO NOT automatically open WhatsApp or send personal data to external channels.
      // Immediately display generated credentials directly on screen for the new seller.
      setRegistrationSuccess({
        shopLink: proLink,
        username: cleanShowId,
        sellerId: newSeller.id,
        password: generatedPassword,
        shopName: formData.showName.trim(),
        fullName: formData.fullName.trim()
      });
    } catch (err: any) {
      console.error('Seller registration error:', err);
      setErrorMessage(err?.message || 'Failed to complete seller registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-2xl max-w-xl w-full border border-blue-100 animate-fadeIn">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-emerald-500/30">
              <ShieldCheck size={36} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black italic tracking-tight uppercase leading-tight text-gray-900">
              Seller Account <span className="text-blue-600 underline">Created</span>
            </h2>
            <p className="text-gray-500 font-bold text-xs uppercase tracking-wider mt-2">
              Welcome aboard, {registrationSuccess.fullName}! Your seller profile is active.
            </p>
          </div>

          {/* Critical Security Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
            <div className="text-xs text-amber-900 leading-relaxed">
              <p className="font-black uppercase tracking-wider">Save Your Credentials Now</p>
              <p className="mt-1">
                For maximum security, your password is <strong>never stored in plain text</strong> in our database.
                This password is shown <strong>only once</strong> here. Copy and save it safely before navigating away.
              </p>
            </div>
          </div>

          {/* Credential Cards with Individual Copy Buttons */}
          <div className="space-y-3 mb-6">
            {/* 1. Seller Shop Link */}
            <div className="bg-gray-50 hover:bg-blue-50/50 transition-colors p-3.5 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5 mb-1">
                  <Store size={12} className="text-blue-600" /> Seller Shop Link
                </span>
                <p className="text-xs font-bold text-blue-700 truncate select-all">
                  {registrationSuccess.shopLink}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(registrationSuccess.shopLink, 'shopLink')}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all text-gray-700 shadow-sm"
              >
                {copiedKey === 'shopLink' ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* 2. Seller Username */}
            <div className="bg-gray-50 hover:bg-blue-50/50 transition-colors p-3.5 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5 mb-1">
                  <User size={12} className="text-indigo-600" /> Seller Username
                </span>
                <p className="text-sm font-black text-gray-900 truncate select-all">
                  {registrationSuccess.username}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(registrationSuccess.username, 'username')}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all text-gray-700 shadow-sm"
              >
                {copiedKey === 'username' ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* 3. Seller ID */}
            <div className="bg-gray-50 hover:bg-blue-50/50 transition-colors p-3.5 rounded-2xl border border-gray-200 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase text-gray-400 tracking-wider flex items-center gap-1.5 mb-1">
                  <Hash size={12} className="text-purple-600" /> Seller ID
                </span>
                <p className="text-xs font-mono font-black text-gray-800 truncate select-all">
                  {registrationSuccess.sellerId}
                </p>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(registrationSuccess.sellerId, 'sellerId')}
                className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-white border border-gray-200 hover:border-blue-500 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all text-gray-700 shadow-sm"
              >
                {copiedKey === 'sellerId' ? (
                  <>
                    <Check size={14} className="text-emerald-500" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* 4. Seller Password */}
            <div className="bg-blue-50/70 p-3.5 rounded-2xl border-2 border-blue-200 flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider flex items-center gap-1.5 mb-1">
                  <Key size={12} className="text-blue-600" /> Seller Password (One-Time Display)
                </span>
                <div className="flex items-center gap-2">
                  <p className="text-base font-mono font-black text-blue-900 tracking-wider select-all">
                    {showPassword ? registrationSuccess.password : '••••••••••••'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-blue-600 p-1"
                    title={showPassword ? 'Hide Password' : 'Show Password'}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              <button
                type="button"
                onClick={() => copyToClipboard(registrationSuccess.password, 'password')}
                className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-black text-white rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm"
              >
                {copiedKey === 'password' ? (
                  <>
                    <Check size={14} className="text-emerald-300" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Master Copy Button */}
          <button
            type="button"
            onClick={copyAllCredentials}
            className="w-full mb-4 bg-gray-900 hover:bg-black text-white py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            {copiedKey === 'all' ? (
              <>
                <Check size={16} className="text-emerald-400" />
                <span className="text-emerald-400">All Credentials Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy All Details to Clipboard</span>
              </>
            )}
          </button>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={() => navigate('/seller-login')}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              <span>Go to Seller Login</span>
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                setRegistrationSuccess(null);
                setFormData({
                  fullName: '',
                  whatsapp: '',
                  email: '',
                  country: '',
                  city: '',
                  contactNumber: '',
                  paymentDetails: '',
                  showName: ''
                });
              }}
              className="text-xs font-black uppercase text-gray-400 hover:text-gray-900 tracking-wider py-2 text-center"
            >
              Register Another Seller
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
            Launch Your <br /> <span className="text-blue-600 underline">Sports Show</span>
          </h1>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-4">
            Transparent Commission: Seller 5% | Admin 95%
          </p>
        </div>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-bold flex items-center gap-2">
            <AlertTriangle size={16} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Proposed Shop Name (Business Link Name)</label>
            <input
              required
              disabled={isSubmitting}
              placeholder="e.g. Global Sports Shop"
              className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-600 p-5 rounded-2xl outline-none font-black text-blue-600 transition-all text-lg shadow-inner disabled:opacity-50"
              value={formData.showName}
              onChange={e => setFormData({ ...formData, showName: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Full Name</label>
              <input
                required
                disabled={isSubmitting}
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold disabled:opacity-50"
                value={formData.fullName}
                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Gmail Address</label>
              <input
                required
                type="email"
                disabled={isSubmitting}
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold disabled:opacity-50"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">WhatsApp Number</label>
              <input
                required
                disabled={isSubmitting}
                placeholder="e.g. 15551234567"
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold disabled:opacity-50"
                value={formData.whatsapp}
                onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Secondary Contact</label>
              <input
                required
                disabled={isSubmitting}
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold disabled:opacity-50"
                value={formData.contactNumber}
                onChange={e => setFormData({ ...formData, contactNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Country</label>
              <input
                required
                disabled={isSubmitting}
                placeholder="e.g. United States"
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold disabled:opacity-50"
                value={formData.country}
                onChange={e => setFormData({ ...formData, country: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">City</label>
              <input
                required
                disabled={isSubmitting}
                placeholder="e.g. New York"
                className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold disabled:opacity-50"
                value={formData.city}
                onChange={e => setFormData({ ...formData, city: e.target.value })}
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
              disabled={isSubmitting}
              className="w-full bg-blue-50/30 border-2 border-blue-100 p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold disabled:opacity-50"
              placeholder="Full IBAN and Bank Name for Global Payments"
              value={formData.paymentDetails}
              onChange={e => setFormData({ ...formData, paymentDetails: e.target.value })}
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-6 rounded-2xl font-black text-xl uppercase tracking-[0.3em] shadow-2xl hover:bg-blue-600 transition-all transform active:scale-95 shadow-blue-500/20 disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Verify & Launch</span>
              )}
            </button>
            <div className="mt-6 p-4 bg-gray-100 rounded-xl">
              <p className="text-[9px] text-center text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                Security Note: Data is saved securely in the database with cryptographic password encryption. 
                Seller identity is private and managed via centralized fulfillment.
              </p>
            </div>

            <div className="mt-4 text-center">
              <Link
                to="/seller-login"
                className="text-xs font-black uppercase text-gray-500 hover:text-blue-600 tracking-wider transition-colors inline-flex items-center gap-1"
              >
                Already have an account? <span className="text-blue-600 underline">Login to Seller Panel</span>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterShow;
