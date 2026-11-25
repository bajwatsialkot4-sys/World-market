import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { SaleRecord } from '../types';
import { AlertCircle, RefreshCw, ShoppingBag, CheckCircle2, Mail, Truck } from 'lucide-react';

const PAYMENT_INSTRUCTIONS_TEXT =
  'After placing your order, our team will review your order and send payment instructions and a secure payment link to your registered email address. Your order will be processed after payment is successfully confirmed.';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, activeShowName, referralCode, activeSeller, addSale } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartError, setCartError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<SaleRecord | null>(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const safeCart = Array.isArray(cart) ? cart : [];
  const subtotal = safeCart.reduce((acc, item) => {
    const p = typeof item?.price === 'number' && !isNaN(item.price) ? item.price : 0;
    const q = typeof item?.quantity === 'number' && !isNaN(item.quantity) && item.quantity > 0 ? item.quantity : 1;
    return acc + (p * q);
  }, 0);

  // Free shipping automatically when merchandise subtotal is strictly over $100 USD
  const shipping = subtotal > 100 ? 0 : (subtotal > 0 ? 15 : 0);
  const total = subtotal + shipping;

  const getProductLink = (id: string) => {
    if (activeShowName && !['cart', 'checkout', 'search', 'category'].includes(activeShowName)) {
      return `/${activeShowName}/products/${id}`;
    }
    return `/products/${id}`;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const urlParams = new URLSearchParams(window.location.search);
    const referralFromUrl = urlParams.get('seller') || urlParams.get('ref');
    const shopName = referralFromUrl || (activeSeller ? activeSeller.showName : (activeShowName && !activeShowName.includes('?') ? activeShowName : "Main Store"));
    const sellerCode = referralCode || (activeSeller ? activeSeller.id : (referralFromUrl || "Direct"));

    try {
      const orderData: Omit<SaleRecord, 'id' | 'date'> = {
        products: safeCart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor
        })),
        customerName: customerInfo.name.trim(),
        customerPhone: customerInfo.phone.trim(),
        customerEmail: customerInfo.email.trim(),
        customerAddress: customerInfo.address.trim(),
        customerCity: customerInfo.city.trim(),
        customerCountry: customerInfo.country.trim(),
        customerZip: customerInfo.zipCode.trim(),
        subtotal,
        shippingAmount: shipping,
        amount: total,
        status: 'Pending Payment' as const,
        sellerId: activeSeller?.id || sellerCode,
        sellerShopName: activeSeller?.shopName || activeSeller?.showName || shopName
      };

      // Save submitted order directly to Firebase Firestore & notify Admin
      const savedOrder = await addSale(orderData);

      setConfirmedOrder(savedOrder);
      clearCart();
      setIsCheckingOut(false);
    } catch (error: any) {
      console.error("CRITICAL: Order submission failed:", error);
      setSubmitError(`Could not save your order. ${error?.message || 'Please check your connection and try again.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartError) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gray-50 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6">
          <AlertCircle size={36} />
        </div>
        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-3">Notice Loading Cart</h2>
        <p className="text-gray-500 font-medium text-xs max-w-md mb-8 leading-relaxed">
          {cartError}
        </p>
        <div className="flex gap-4">
          <button 
            onClick={() => setCartError(null)} 
            className="bg-black text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center gap-2"
          >
            <RefreshCw size={14} /> Retry
          </button>
          <Link 
            to="/products" 
            className="bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest hover:bg-gray-300 transition-all flex items-center gap-2"
          >
            <ShoppingBag size={14} /> Shop Products
          </Link>
        </div>
      </div>
    );
  }

  if (confirmedOrder) {
    const orderShipping = typeof confirmedOrder.shippingAmount === 'number' ? confirmedOrder.shippingAmount : 0;
    const orderSubtotal = typeof confirmedOrder.subtotal === 'number'
      ? confirmedOrder.subtotal
      : Math.max(0, confirmedOrder.amount - orderShipping);

    return (
      <div className="bg-gray-50 min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-blue-100 p-8 md:p-12 animate-fadeIn">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/30">
              <CheckCircle2 size={34} />
            </div>
            <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3">
              Status: {confirmedOrder.status}
            </div>
            <h1 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-gray-900">
              Order <span className="text-blue-600 underline">Submitted</span>
            </h1>
            <p className="text-xs font-black uppercase tracking-widest text-gray-500 mt-3">
              Confirmation Number:{' '}
              <span className="text-blue-600 font-mono">
                {confirmedOrder.orderConfirmationNumber || `WL-${confirmedOrder.id.slice(-6).toUpperCase()}`}
              </span>
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
            <Mail className="text-blue-600 shrink-0 mt-0.5" size={20} />
            <p className="text-xs font-bold text-blue-950 leading-relaxed">
              {PAYMENT_INSTRUCTIONS_TEXT}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-xs">
            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-1.5">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Customer & Delivery Details</p>
              <p className="font-black text-gray-900 uppercase">{confirmedOrder.customerName}</p>
              <p className="font-bold text-blue-600">{confirmedOrder.customerEmail}</p>
              <p className="font-bold text-gray-600">{confirmedOrder.customerPhone}</p>
              <p className="text-gray-600 pt-1">
                {confirmedOrder.customerAddress}, {confirmedOrder.customerCity}, {confirmedOrder.customerCountry} {confirmedOrder.customerZip}
              </p>
            </div>

            <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Order Totals</p>
              <div className="flex justify-between font-bold text-gray-600">
                <span>Subtotal</span>
                <span>${orderSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-600">
                <span>Shipping</span>
                <span>{orderShipping === 0 ? 'FREE ($0.00)' : `$${orderShipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-black text-gray-900 text-base pt-2 border-t border-gray-200">
                <span>Order Total</span>
                <span>${confirmedOrder.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Ordered Items</p>
            <div className="space-y-2.5">
              {confirmedOrder.products.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100 text-xs">
                  <div>
                    <p className="font-black uppercase text-gray-900">{item.name}</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">
                      Qty: {item.quantity} {item.size ? `• Size: ${item.size}` : ''} {item.color ? `• Color: ${item.color}` : ''}
                    </p>
                  </div>
                  <span className="font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/products"
              className="flex-1 bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest text-center hover:bg-blue-600 transition-all"
            >
              Continue Shopping
            </Link>
            <Link
              to="/"
              className="flex-1 bg-gray-100 text-gray-800 py-4 rounded-xl font-black text-xs uppercase tracking-widest text-center hover:bg-gray-200 transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (safeCart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-gray-50">
        <div className="text-9xl mb-10 drop-shadow-2xl grayscale">🛒</div>
        <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">Your Cart is <span className="text-blue-600 underline">Empty</span></h2>
        <p className="text-gray-400 font-bold uppercase text-xs tracking-[0.2em] mb-10">Start your team's transformation today</p>
        <Link to="/products" className="bg-black text-white px-10 py-5 rounded-full font-black text-sm uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl">Explore Catalog</Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-16 underline decoration-blue-600">Shopping <span className="text-blue-600">Cart</span></h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          {/* Item List / Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {isCheckingOut ? (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-blue-100 animate-fadeIn">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8">Shipping <span className="text-blue-600">Details</span></h2>

                {submitError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <form onSubmit={handleCheckout} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Full Name</label>
                      <input 
                        required
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                        value={customerInfo.name}
                        onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Email Address (Required)</label>
                      <input 
                        required
                        type="email"
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                        value={customerInfo.email}
                        onChange={e => setCustomerInfo({...customerInfo, email: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Phone Number</label>
                      <input 
                        required
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                        value={customerInfo.phone}
                        onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Country</label>
                      <input 
                        required
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                        value={customerInfo.country}
                        onChange={e => setCustomerInfo({...customerInfo, country: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">City</label>
                      <input 
                        required
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                        value={customerInfo.city}
                        onChange={e => setCustomerInfo({...customerInfo, city: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Zip Code</label>
                      <input 
                        required
                        className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                        value={customerInfo.zipCode}
                        onChange={e => setCustomerInfo({...customerInfo, zipCode: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest ml-1">Full Address</label>
                    <input 
                      required
                      className="w-full bg-gray-50 border p-4 rounded-xl focus:ring-4 focus:ring-blue-500/10 outline-none font-bold"
                      value={customerInfo.address}
                      onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                    />
                  </div>
                  <div className="pt-6 flex gap-4">
                    <button 
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="flex-1 bg-gray-100 text-black py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                      Back to Cart
                    </button>
                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-[2] bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting && <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
                      {isSubmitting ? 'Submitting...' : 'PLACE ORDER'}
                    </button>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mt-4">
                    <p className="text-center text-xs font-medium text-gray-600 leading-relaxed">
                      {PAYMENT_INSTRUCTIONS_TEXT}
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              <>
                {safeCart.map((item, idx) => {
                  const itemPrice = typeof item.price === 'number' && !isNaN(item.price) ? item.price : 0;
                  const itemQty = typeof item.quantity === 'number' && !isNaN(item.quantity) && item.quantity > 0 ? item.quantity : 1;
                  const itemTotal = itemPrice * itemQty;
                  const itemKey = `${item.id || 'item'}-${item.selectedSize || 's'}-${item.selectedColor || 'c'}-${idx}`;

                  return (
                    <div key={itemKey} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 group hover:shadow-xl transition-all">
                      <Link to={getProductLink(item.id)} className="w-full md:w-40 aspect-square bg-gray-100 rounded-2xl overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      </Link>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <Link to={getProductLink(item.id)}>
                            <h3 className="text-xl font-black uppercase tracking-tight mb-1 hover:text-blue-600 transition-colors">{item.name}</h3>
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.category}</p>
                            <div className="flex gap-2 mt-2">
                              {item.selectedSize && (
                                <span className="text-[8px] font-black uppercase bg-gray-100 px-2 py-1 rounded border">Size: {item.selectedSize}</span>
                              )}
                              {item.selectedColor && (
                                <span className="text-[8px] font-black uppercase bg-gray-100 px-2 py-1 rounded border">Color: {item.selectedColor}</span>
                              )}
                            </div>
                          </Link>
                          <span className="text-2xl font-black tracking-tighter">${itemTotal.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-400 mt-4 line-clamp-2 font-medium">{item.description}</p>
                        
                        <div className="mt-8 flex items-center justify-between">
                          <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 border">
                            <span className="text-xs font-black uppercase mr-4 text-gray-400">Qty</span>
                            <span className="text-sm font-black">{itemQty}</span>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                            className="text-[10px] font-black uppercase text-red-500 hover:underline tracking-widest"
                          >
                            Remove Item
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button onClick={clearCart} className="text-[10px] font-black uppercase text-gray-400 hover:text-black tracking-[0.3em] transition-colors">Clear All Items</button>
              </>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-black text-white p-10 rounded-[2.5rem] sticky top-32 shadow-2xl shadow-blue-500/20">
            <h3 className="text-2xl font-black uppercase italic tracking-widest mb-10 text-blue-500">Summary</h3>
            <div className="space-y-6 border-b border-white/10 pb-10">
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-400">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-emerald-400' : ''}>
                  {shipping === 0 ? 'FREE ($0.00)' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {subtotal > 0 && (
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 pt-1">
                  <Truck size={14} className="shrink-0" />
                  <span>
                    {subtotal > 100
                      ? 'Free shipping applied on orders over $100'
                      : 'Free shipping automatically applies on orders over $100'}
                  </span>
                </div>
              )}
            </div>
            <div className="flex justify-between items-end mt-10">
              <span className="text-sm font-black uppercase tracking-widest text-blue-500">Order Total</span>
              <span className="text-4xl font-black tracking-tighter">${total.toFixed(2)}</span>
            </div>
            
            {!isCheckingOut && (
              <button 
                onClick={() => setIsCheckingOut(true)}
                className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xl uppercase tracking-[0.2em] mt-12 shadow-xl shadow-blue-500/30 hover:bg-white hover:text-black transition-all transform active:scale-95"
              >
                Secure Checkout
              </button>
            )}
            <div className="mt-8 text-center">
              <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Powered by W-LORD MARKET Global Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
