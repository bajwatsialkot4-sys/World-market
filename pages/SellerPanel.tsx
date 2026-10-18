import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, Box, ShoppingBag, Bell, Plus, Settings, 
  ChevronRight, ArrowUpRight, ArrowDownRight, Package,
  Clock, CheckCircle2, AlertCircle, X, Search, User as UserIcon,
  LogOut, Trash2, DollarSign, Wallet, CreditCard, AlertTriangle, Edit3
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const SellerPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    sales, products, sellers, notifications, unreadNotificationsCount,
    sellerEarnings, sellerPayouts, getSellerFinancials, updateSeller,
    formatPrice, addProduct, updateSaleStatus, markNotificationAsRead 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'earnings' | 'notifications'>('orders');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const seller = sellers.find(s => s.id === id || s.showName === id);
  const sellerProducts = products.filter(p => p.sellerId === seller?.id);
  const sellerSales = sales.filter(s => s.sellerId === seller?.id);
  
  // Real-time seller financial data
  const sellerEarningsList = seller ? sellerEarnings.filter(e => e.sellerId === seller.id) : [];
  const sellerPayoutsList = seller ? sellerPayouts.filter(p => p.sellerId === seller.id) : [];
  const financials = seller 
    ? getSellerFinancials(seller.id) 
    : { totalEarnings: 0, totalPaid: 0, availableBalance: 0, pendingPayout: 0, isEligibleForPayout: false };

  // Bank / Payment details edit state
  const [isEditingPaymentDetails, setIsEditingPaymentDetails] = useState(false);
  const [paymentDetailsInput, setPaymentDetailsInput] = useState('');
  const [paymentSaveLoading, setPaymentSaveLoading] = useState(false);
  const [paymentFeedback, setPaymentFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (seller?.paymentDetails) {
      setPaymentDetailsInput(seller.paymentDetails);
    }
  }, [seller?.paymentDetails]);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: CATEGORIES[0],
    image: '',
    description: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'White']
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate brief loading for smooth UX
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-black border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Loading Seller Portal</p>
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-xl text-center border border-gray-100">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle size={40} />
          </div>
          <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-4">Access <span className="text-red-500">Denied</span></h2>
          <p className="text-gray-500 font-medium mb-8">We couldn't find a seller profile matching this ID. Seller IDs are case-sensitive and match your Shop Name (e.g. 'arsalan-sports').</p>
          <Link to="/" className="inline-block bg-black text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Back to Market</Link>
        </div>
      </div>
    );
  }

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const normalizedCategory = (newProduct.category || '').toLowerCase().trim();
      await addProduct({
        ...newProduct,
        category: normalizedCategory,
        sellerId: seller.id,
        rating: 5.0,
        reviews: [],
        badges: ['Legacy'],
        stock: 50,
        ratingCount: 0,
        sales: 0,
        viewers: 0
      });
      setIsAddingProduct(false);
      setNewProduct({
        name: '', price: 0, category: CATEGORIES[0], image: '', description: '',
        sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Navy', 'White']
      });
      alert('Product added successfully to market!');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSavePaymentDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!seller) return;
    setPaymentSaveLoading(true);
    setPaymentFeedback(null);
    try {
      await updateSeller(seller.id, {
        paymentDetails: paymentDetailsInput.trim()
      });
      setPaymentFeedback('Payment details updated successfully.');
      setIsEditingPaymentDetails(false);
      setTimeout(() => setPaymentFeedback(null), 4000);
    } catch (err: any) {
      setPaymentFeedback(`Failed to update: ${err.message}`);
    } finally {
      setPaymentSaveLoading(false);
    }
  };

  const sellerNotifications = notifications.filter(n => n.sellerId === seller.id || n.targetRole === 'seller');
  const unreadCount = sellerNotifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-gray-900 pb-20">
      {/* Simple Top Header */}
      <header className="bg-white border-b px-6 py-6 sticky top-0 z-40 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black italic tracking-tighter shrink-0">SELLER <span className="text-blue-600 underline">PANEL</span></h2>
          <div className="flex items-center gap-2 mt-1">
             <div className="w-2 h-2 bg-green-500 rounded-full"></div>
             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{seller.shopName || seller.showName}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
           <button 
            onClick={() => setActiveTab('notifications')} 
            className={`relative p-3 rounded-xl transition-all ${activeTab === 'notifications' ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            title="Notifications"
           >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {unreadCount}
              </span>
            )}
           </button>
           <button 
            onClick={() => navigate('/seller-login')} 
            className="flex items-center gap-2 bg-gray-100 text-gray-600 p-3 rounded-xl hover:text-red-500 hover:bg-red-50 transition-all"
            title="Logout"
           >
            <LogOut size={20}/>
           </button>
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="max-w-5xl mx-auto w-full p-4 md:p-8 space-y-8">
        
        {/* Quick Actions Bar */}
        <section className="bg-black text-white p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-center md:text-left">
             <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-1">Store Actions</p>
             <h3 className="text-xl font-black italic uppercase tracking-tighter">Manage your shop catalog</h3>
           </div>
           <button 
             onClick={() => setIsAddingProduct(true)}
             className="bg-blue-600 text-white px-10 py-4 rounded-xl font-black uppercase text-xs tracking-widest flex items-center gap-2 hover:bg-white hover:text-black transition-all shadow-xl"
           >
             <Plus size={20}/> Add New Product
           </button>
        </section>

        {/* Tab Selection */}
        <div className="flex gap-2 md:gap-4 border-b border-gray-200 overflow-x-auto">
           <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 opacity-60'}`}
           >
             My Orders ({sellerSales.length})
           </button>
           <button 
            onClick={() => setActiveTab('earnings')}
            className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${activeTab === 'earnings' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 opacity-60'}`}
           >
             <span>Earnings & Payouts</span>
             <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-black">
               ${financials.availableBalance.toFixed(2)}
             </span>
           </button>
           <button 
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all whitespace-nowrap ${activeTab === 'notifications' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 opacity-60'}`}
           >
             Notifications ({unreadCount})
           </button>
        </div>

        <section className="animate-fadeIn">
          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              {sellerSales.length === 0 ? (
                <div className="bg-white p-20 rounded-[2rem] border border-dashed text-center">
                   <ShoppingBag className="mx-auto mb-4 text-gray-200" size={48}/>
                   <p className="text-xs font-black uppercase text-gray-400 tracking-widest">No orders received yet</p>
                </div>
              ) : (
                sellerSales.map(order => {
                  const relatedEarning = sellerEarningsList.find(e => e.orderId === order.id);
                  return (
                    <div key={order.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 group hover:shadow-xl hover:border-blue-200 transition-all">
                      <div className="flex items-center gap-4 w-full md:w-auto">
                         <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                            <ShoppingBag size={24}/>
                         </div>
                         <div>
                            <p className="text-sm font-black uppercase text-gray-900">Buyer: Private Customer</p>
                            <div className="flex gap-2 mt-1">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">[Details Protected]</span>
                            </div>
                            <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">ID: #{order.id.slice(-8)} • {new Date(order.date).toLocaleDateString()}</p>
                            
                            {/* Earnings Badge if order is completed */}
                            {order.status === 'Completed' && (
                              <div className="mt-2">
                                {relatedEarning ? (
                                  <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                                    <CheckCircle2 size={10} /> Earnings Credited: ${relatedEarning.amount.toFixed(2)} USD
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                                    <Clock size={10} /> Completed • Awaiting Manual Admin Earnings Entry
                                  </span>
                                )}
                              </div>
                            )}
                         </div>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-x-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                         <div className="text-left md:text-right">
                            <p className="text-sm font-black text-blue-600">{formatPrice(order.amount)}</p>
                            <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full ${
                              order.status === 'Completed' ? 'bg-green-100 text-green-700' :
                              order.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              order.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {order.status}
                            </span>
                         </div>
                         <button onClick={() => setSelectedOrder(order)} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                           Details
                         </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* EARNINGS & PAYOUTS DASHBOARD TAB */}
          {activeTab === 'earnings' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Financial Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Earnings */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Earnings</span>
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <DollarSign size={16} />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-gray-900">${financials.totalEarnings.toFixed(2)} <span className="text-xs font-bold text-gray-400">USD</span></p>
                  </div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-4">Lifetime verified earnings</p>
                </div>

                {/* Available Balance */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Available Balance</span>
                      <div className="w-8 h-8 rounded-xl bg-green-50 text-green-600 flex items-center justify-center">
                        <Wallet size={16} />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-green-600">${financials.availableBalance.toFixed(2)} <span className="text-xs font-bold text-green-700">USD</span></p>
                  </div>
                  <div className="mt-4">
                    {financials.isEligibleForPayout ? (
                      <span className="bg-green-100 text-green-800 text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                        Eligible for Payout (≥ $30)
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 text-[8px] font-black px-2 py-1 rounded-md uppercase tracking-wider">
                        Threshold: $30 min
                      </span>
                    )}
                  </div>
                </div>

                {/* Pending Payout */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pending Payout</span>
                      <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                        <Clock size={16} />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-amber-600">${financials.pendingPayout.toFixed(2)} <span className="text-xs font-bold text-amber-700">USD</span></p>
                  </div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-4">
                    {financials.isEligibleForPayout ? 'Ready for admin disbursement' : 'Pending balance threshold'}
                  </p>
                </div>

                {/* Total Paid */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Paid</span>
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                        <CreditCard size={16} />
                      </div>
                    </div>
                    <p className="text-2xl font-black text-purple-600">${financials.totalPaid.toFixed(2)} <span className="text-xs font-bold text-purple-700">USD</span></p>
                  </div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase mt-4">Total disbursed to date</p>
                </div>
              </div>

              {/* Policy Threshold Banner */}
              <div className="bg-white p-6 rounded-3xl border border-blue-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                    <AlertCircle size={24} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-900">Minimum Payout: $30.00 USD</h4>
                    <p className="text-xs text-gray-500 font-medium mt-1 leading-relaxed">
                      Earnings are manually reviewed and entered by the administrator after orders are completed and customer payments are confirmed. Payouts are manually disbursed once your available balance reaches at least $30.00 USD.
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <Link 
                    to="/privacy-policy" 
                    className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                  >
                    View Policy →
                  </Link>
                </div>
              </div>

              {/* Bank & Payment Account Details Section */}
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-gray-900 flex items-center gap-2">
                      <CreditCard size={18} className="text-blue-600" /> Payout & Bank Account Details
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      Account where administrator disburses your confirmed earnings
                    </p>
                  </div>
                  {!isEditingPaymentDetails && (
                    <button 
                      onClick={() => setIsEditingPaymentDetails(true)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all"
                    >
                      <Edit3 size={12} /> Edit Details
                    </button>
                  )}
                </div>

                {paymentFeedback && (
                  <div className="mb-4 p-4 rounded-xl text-xs font-bold bg-blue-50 text-blue-800 border border-blue-100">
                    {paymentFeedback}
                  </div>
                )}

                {isEditingPaymentDetails ? (
                  <form onSubmit={handleSavePaymentDetails} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                        Bank Details / PayPal / EasyPaisa / JazzCash
                      </label>
                      <textarea
                        required
                        rows={3}
                        placeholder="e.g. Bank Name: Standard Chartered, IBAN: PK..., Title: Muhammad Arsalan, OR PayPal: seller@gmail.com"
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500"
                        value={paymentDetailsInput}
                        onChange={(e) => setPaymentDetailsInput(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-3">
                      <button 
                        type="submit" 
                        disabled={paymentSaveLoading}
                        className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-md hover:bg-black transition-all"
                      >
                        {paymentSaveLoading ? 'Saving...' : 'Save Payout Details'}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsEditingPaymentDetails(false)}
                        className="bg-gray-100 text-gray-700 px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                    <p className="text-xs font-bold text-gray-800 whitespace-pre-wrap leading-relaxed">
                      {seller.paymentDetails || 'No payment details registered yet. Please click "Edit Details" to configure your bank account or payment method.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Earnings History */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-gray-900">Earnings History</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                      Verified records credited for completed orders
                    </p>
                  </div>
                  <span className="text-xs font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                    {sellerEarningsList.length} Entries
                  </span>
                </div>

                {sellerEarningsList.length === 0 ? (
                  <div className="p-16 text-center text-gray-400">
                    <DollarSign className="mx-auto mb-3 opacity-20" size={40} />
                    <p className="text-xs font-black uppercase tracking-widest">No earnings records yet</p>
                    <p className="text-[10px] font-medium text-gray-400 mt-1">Earnings will be credited once orders are marked Completed and payment is confirmed.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Related Order ID</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Admin Note</th>
                          <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-xs">
                        {sellerEarningsList.map(e => (
                          <tr key={e.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-500">
                              {new Date(e.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 font-black uppercase text-gray-900">
                              #{e.orderId.slice(-8)}
                            </td>
                            <td className="px-6 py-4 font-black text-green-600 text-sm">
                              +${e.amount.toFixed(2)} USD
                            </td>
                            <td className="px-6 py-4 text-gray-500 font-medium">
                              {e.adminNote || 'Verified Order Profit'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                                Credited
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Payout History */}
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 border-b border-gray-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight text-gray-900">Payout History</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">
                      Disbursements manually executed and recorded by platform administrator
                    </p>
                  </div>
                  <span className="text-xs font-black bg-purple-50 text-purple-600 px-3 py-1 rounded-full">
                    {sellerPayoutsList.length} Disbursements
                  </span>
                </div>

                {sellerPayoutsList.length === 0 ? (
                  <div className="p-16 text-center text-gray-400">
                    <CreditCard className="mx-auto mb-3 opacity-20" size={40} />
                    <p className="text-xs font-black uppercase tracking-widest">No payout records yet</p>
                    <p className="text-[10px] font-medium text-gray-400 mt-1">Payouts are manually processed when your available balance reaches at least $30.00 USD.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-400 border-b border-gray-100">
                          <th className="px-6 py-4">Payout Date</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Method</th>
                          <th className="px-6 py-4">Transaction Reference</th>
                          <th className="px-6 py-4">Admin Note</th>
                          <th className="px-6 py-4 text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50 text-xs">
                        {sellerPayoutsList.map(p => (
                          <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4 font-bold text-gray-500">
                              {p.payoutDate || new Date(p.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 font-black text-gray-900 text-sm">
                              ${p.amount.toFixed(2)} USD
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-700">
                              {p.paymentMethod}
                            </td>
                            <td className="px-6 py-4 font-mono text-[11px] text-gray-600">
                              {p.transactionReference || 'N/A'}
                            </td>
                            <td className="px-6 py-4 text-gray-500 font-medium">
                              {p.adminNote || 'Manual disbursement'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                p.status === 'Paid' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-[2rem] overflow-hidden border border-gray-100 divide-y">
               {sellerNotifications.length === 0 ? (
                  <div className="p-20 text-center text-gray-300">
                    <Bell className="mx-auto mb-4 opacity-20" size={60}/>
                    <p className="text-[10px] font-black uppercase tracking-widest">No notifications alerts</p>
                  </div>
               ) : (
                 sellerNotifications.map(n => (
                   <div 
                     key={n.id}
                     onClick={() => markNotificationAsRead(n.id)}
                     className={`p-6 flex gap-6 hover:bg-gray-50 transition-colors cursor-pointer ${!n.isRead ? 'bg-blue-50/20' : ''}`}
                   >
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                       n.type === 'New Order' ? 'bg-green-50 text-green-600' : 
                       n.type === 'Payout Paid' ? 'bg-purple-50 text-purple-600' :
                       'bg-blue-50 text-blue-600'
                     }`}>
                       {n.type === 'New Order' ? <ShoppingBag size={20}/> : 
                        n.type === 'Payout Paid' ? <DollarSign size={20}/> :
                        <AlertCircle size={20}/>}
                     </div>
                     <div>
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{new Date(n.timestamp).toLocaleString()}</p>
                        <p className="text-xs font-black uppercase text-gray-900 mb-1">{n.title}</p>
                        <p className="text-xs text-gray-500 font-medium">{n.message}</p>
                     </div>
                   </div>
                 ))
               )}
            </div>
          )}

          <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0">
              <AlertCircle size={20} />
            </div>
            <p className="text-[11px] font-black uppercase tracking-widest text-blue-600 leading-relaxed">
              Payment is processed manually by administrator after customer order completion and payment confirmation.
            </p>
          </div>
        </section>
      </main>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-xl w-full overflow-hidden">
            <div className="bg-black text-white p-8">
               <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-black italic tracking-tighter uppercase">Order <span className="text-blue-500 underline">Summary</span></h2>
                 <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-white/10 rounded-full"><X/></button>
               </div>
               <p className="text-[10px] font-black uppercase text-gray-400 mt-2 tracking-widest">Order ID: #{selectedOrder.id}</p>
            </div>
            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
               <div className="grid grid-cols-2 gap-8 text-left">
                  <section>
                    <h4 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-2">Customer Profile</h4>
                    <p className="text-xs font-semibold uppercase text-gray-400 italic">[Protected for Privacy]</p>
                    <div className="flex flex-col gap-1 mt-2">
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone: [Hidden for Privacy]</p>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email: [Hidden for Privacy]</p>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">[Full Address Protected]</p>
                    </div>
                  </section>
                  <section className="text-right">
                    <h4 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-2">Metadata</h4>
                    <p className="text-[10px] font-black text-blue-600 uppercase">Time: {new Date(selectedOrder.date).toLocaleTimeString()}</p>
                    <p className="text-[10px] font-black text-gray-400 uppercase mt-1">Date: {new Date(selectedOrder.date).toLocaleDateString()}</p>
                    <p className="text-[9px] font-black text-purple-600 uppercase mt-4">Seller: {selectedOrder.sellerShopName || 'Main Store'}</p>
                    <div className="mt-2">
                       <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                         selectedOrder.status === 'Completed' ? 'bg-green-100 text-green-700' :
                         selectedOrder.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                         selectedOrder.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                         selectedOrder.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                         'bg-orange-100 text-orange-700'
                       }`}>
                          {selectedOrder.status}
                        </span>
                    </div>
                  </section>
               </div>
               <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col gap-3">
                 <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                   "Payment will be processed after order completion and verification by platform administrator."
                 </p>
                 <div className="pt-2 border-t border-blue-100 flex justify-between items-center">
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Payout Minimum</span>
                   <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">$30.00 USD</span>
                 </div>
               </div>
               <div>
                 <h4 className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-4">Items</h4>
                 <div className="space-y-2">
                    {selectedOrder.products?.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                         <div>
                            <p className="text-xs font-black uppercase">{item.name}</p>
                            <p className="text-[8px] font-bold text-gray-400 uppercase mt-0.5">ID: {item.productId || item.id} • S: {item.size} • C: {item.color}</p>
                         </div>
                         <p className="text-xs font-black">x{item.quantity}</p>
                      </div>
                    ))}
                 </div>
               </div>
               <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
                  <p className="text-xs font-black uppercase">Order Total</p>
                  <p className="text-2xl font-black italic tracking-tighter text-blue-600">{formatPrice(selectedOrder.amount)}</p>
               </div>
            </div>
            <div className="p-8 pt-0">
               <button onClick={() => setSelectedOrder(null)} className="w-full bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-blue-600 transition-all">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
          <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
            <div className="bg-black text-white p-10 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">List <span className="text-blue-500 underline">New Item</span></h2>
                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2">{seller.shopName} Inventory</p>
              </div>
              <button onClick={() => setIsAddingProduct(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all text-white"><X size={20} /></button>
            </div>
            <form onSubmit={handleAddProduct} className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Product Name</label>
                <input 
                  required
                  placeholder="e.g. Ultra Mesh Sport Hoodie"
                  className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Your Price ($)</label>
                  <input 
                    required
                    type="number"
                    className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                    value={isNaN(newProduct.price) || newProduct.price === 0 ? '' : newProduct.price}
                    onChange={e => {
                      const val = parseFloat(e.target.value);
                      setNewProduct({...newProduct, price: isNaN(val) ? 0 : val});
                    }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Category</label>
                  <select 
                    className="w-full bg-gray-50 border p-4 rounded-xl font-bold uppercase text-xs"
                    value={newProduct.category}
                    onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Image URL</label>
                <input 
                  required
                  placeholder="Paste product image link"
                  className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                  value={newProduct.image}
                  onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Item Description</label>
                <textarea 
                  required
                  rows={3}
                  className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                  value={newProduct.description}
                  onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                />
              </div>
              <div className="pt-6">
                <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">Publish to Marketplace</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerPanel;
