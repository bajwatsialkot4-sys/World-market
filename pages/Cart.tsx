
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { ADMIN_WHATSAPP } from '../constants';
import { getWhatsAppLink } from '../services/routingUtils';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, activeShowName, referralCode, activeSeller, addSale } = useStore();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    zipCode: ''
  });

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const getProductLink = (id: string) => {
    if (activeShowName) {
      return `/${activeShowName}/products/${id}`;
    }
    return `/products/${id}`;
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Preparing to submit order to Firebase...");
    
    const urlParams = new URLSearchParams(window.location.search);
    const referralFromUrl = urlParams.get('seller') || urlParams.get('ref');
    const shopName = referralFromUrl || (activeSeller ? activeSeller.showName : (activeShowName && !activeShowName.includes('?') ? activeShowName : "Main Store"));
    const sellerCode = referralCode || (activeSeller ? activeSeller.id : (referralFromUrl || "Direct"));
    
    const orderSummary = cart.map(item => 
      `Product: ${item.name} (ID: ${item.id})\nSize: ${item.selectedSize || 'N/A'}\nColor: ${item.selectedColor || 'N/A'}\nQuantity: ${item.quantity}\nPrice: $${item.price.toFixed(2)}`
    ).join('\n\n');
 
    try {
      const orderData = {
        products: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          size: item.selectedSize,
          color: item.selectedColor
        })),
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        customerAddress: customerInfo.address,
        customerCity: customerInfo.city,
        customerCountry: customerInfo.country,
        customerZip: customerInfo.zipCode,
        amount: total,
        status: 'Pending Payment' as const,
        sellerId: activeSeller?.id || sellerCode,
        sellerShopName: activeSeller?.shopName || activeSeller?.showName || shopName
      };

      console.log("Order Data Payload:", orderData);

      // Store order in system
      await addSale(orderData);
      console.log("Order saved successfully to Firestore.");

      const message = `NEW ORDER RECEIVED
--------------------------------

--- SHOP DETAILS ---
Shop Name: ${shopName}
Referral Code: ${sellerCode}

--- CUSTOMER DETAILS ---
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}, ${customerInfo.city}, ${customerInfo.country}
Zip Code: ${customerInfo.zipCode}

--- ORDER SUMMARY ---
${orderSummary}

--- BILLING ---
Subtotal: $${subtotal.toFixed(2)}
Shipping: ${shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
Tax: $${tax.toFixed(2)}
TOTAL: $${total.toFixed(2)}

--------------------------------
Secure manual payment confirmation via WhatsApp.`;

      const waLink = getWhatsAppLink(ADMIN_WHATSAPP, message);
      
      setIsSubmitting(false);
      window.location.href = waLink;
      clearCart();
      setIsCheckingOut(false);
      alert("Order success! Order details saved to Cloud & sent to WhatsApp! Our team will provide payment instructions shortly.");
    } catch (error: any) {
      setIsSubmitting(false);
      console.error("CRITICAL: Order submission failed:", error);
      alert(`System Error: Could not save order. ${error.message || 'Please check your connection.'}`);
    }
  };

  if (cart.length === 0) {
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
          {/* Item List */}
          <div className="lg:col-span-2 space-y-8">
            {isCheckingOut ? (
              <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl border border-blue-100 animate-fadeIn">
                <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-8">Shipping <span className="text-blue-600">Details</span></h2>
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
                      {isSubmitting ? 'Processing...' : 'Place Order via WhatsApp'}
                    </button>
                  </div>
                  <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest pt-4">
                    Secure manual payment confirmation via WhatsApp.
                  </p>
                </form>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-8 group hover:shadow-xl transition-all">
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
                        <span className="text-2xl font-black tracking-tighter">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-4 line-clamp-2 font-medium">{item.description}</p>
                      
                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex items-center bg-gray-50 rounded-xl px-4 py-2 border">
                          <span className="text-xs font-black uppercase mr-4 text-gray-400">Qty</span>
                          <span className="text-sm font-black">{item.quantity}</span>
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
                ))}
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
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase tracking-widest text-gray-400">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
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
