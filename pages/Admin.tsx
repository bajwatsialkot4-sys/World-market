
import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Edit2, ShieldCheck, Mail, LogIn, Bell, User as UserIcon, Phone, MapPin, Globe } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, ADMIN_EMAILS } from '../constants';
import { Product } from '../types';
import { auth } from '../services/firebase';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut, User } from 'firebase/auth';

const hashPassword = async (password: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

const Admin: React.FC = () => {
  const { 
    products, sales, customers, sellers, notifications, unreadNotificationsCount,
    addProduct, updateProduct, deleteProduct, updateSaleStatus, formatPrice, markNotificationAsRead 
  } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'inventory' | 'sales' | 'customers' | 'settings' | 'withdrawals'>('overview');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isPassAuthenticated, setIsPassAuthenticated] = useState(false);

  // Search and Detail State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [selectedSeller, setSelectedSeller] = useState<any>(null);
  const [showNotifications, setShowNotifications] = useState(false);

  // New Product State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editProductData, setEditProductData] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: CATEGORIES[0],
    image: '',
    description: '',
    offer: '',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Navy', 'White']
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    }, (err) => {
      console.error("Auth error:", err);
      setError("Authentication failed to initialize.");
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result.user.email && !ADMIN_EMAILS.includes(result.user.email)) {
        // We'll keep the user logged in but show Access Denied in the UI
        // The user can then logout if they want
        console.warn("Unauthorized login attempt:", result.user.email);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Failed to login with Google");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setError('');
    } catch (err: any) {
      console.error("Logout error:", err);
    }
  };

  // Filtered sales
  const filteredSales = sales.filter(s => 
    s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.sellerShopName && s.sellerShopName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
      } catch (err: any) {
        alert(`Error deleting product: ${err.message}`);
      }
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const normalizedCategory = (newProduct.category || '').toLowerCase().trim();
      await addProduct({
        ...newProduct,
        offer: newProduct.offer?.trim() || undefined,
        category: normalizedCategory,
        rating: 5.0,
        reviews: [],
        badges: ['New'],
        stock: 100,
        ratingCount: 0,
        sales: 0,
        viewers: 0
      });
      setIsAddingProduct(false);
      setNewProduct({
        name: '',
        price: 0,
        category: CATEGORIES[0],
        image: '',
        description: '',
        offer: '',
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Black', 'Navy', 'White']
      });
      alert('Product published to Cloud Firestore successfully!');
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
        <h2 className="text-xl font-black uppercase tracking-[0.3em] animate-pulse">Loading Admin Panel...</h2>
        <p className="text-gray-500 text-[10px] uppercase tracking-widest mt-4">Verifying Credentials</p>
      </div>
    );
  }

  const isAdmin = !!user?.email && ADMIN_EMAILS.includes(user.email);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-10 md:p-16 rounded-[3rem] shadow-2xl max-w-md w-full border border-gray-200 text-center animate-fadeIn">
          <div className="w-20 h-20 bg-blue-600 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto mb-8 shadow-xl shadow-blue-500/30">
            <ShieldCheck size={40} />
          </div>
          
          {user ? (
            <>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2 text-red-600 underline decoration-black underline-offset-8">Access <span className="text-black">Denied</span></h2>
              <p className="text-gray-500 font-bold text-[10px] uppercase tracking-widest mb-10 leading-loose mt-4">
                Unauthorized Account: {user.email} <br/> 
                Access Restricted to Site Owner
              </p>
              <button 
                onClick={handleLogout}
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-red-600 transition-all flex items-center justify-center gap-4 group"
              >
                <LogIn size={20} className="group-hover:-translate-x-1 transition-transform" />
                Sign Out & Try Again
              </button>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase mb-2">Admin <span className="text-blue-600">Gate</span></h2>
              <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mb-10 leading-loose">
                High Security Authentication <br/> Restricted to Authorized Personnel
              </p>
              <button 
                onClick={handleGoogleLogin}
                className="w-full bg-black text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-4"
              >
                <LogIn size={20} />
                Login with Google
              </button>
            </>
          )}

          {error && (
            <div className="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-red-600 text-[10px] font-black uppercase italic">{error}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-black text-white pt-10 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-5xl font-black italic tracking-tighter">ADMIN <span className="text-blue-500 underline">PATCH SHOP</span></h1>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mt-2">Centralized Global Control</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all relative"
              >
                <Bell size={20} />
                {unreadNotificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-lg">
                    {unreadNotificationsCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden text-black scale-in-top">
                  <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Recent Notifications</span>
                    <button onClick={() => setShowNotifications(false)} className="text-gray-400 hover:text-black"><X size={14}/></button>
                  </div>
                  <div className="max-h-96 overflow-y-auto divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-gray-400 text-[10px] font-black uppercase tracking-widest">No notifications</div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          onClick={() => {
                            markNotificationAsRead(n.id);
                            if (n.type === 'New Order') setActiveTab('sales');
                            setShowNotifications(false);
                          }}
                          className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${!n.isRead ? 'bg-blue-50/30' : ''}`}
                        >
                          <p className="text-[10px] font-black uppercase text-blue-600 mb-1">{n.type}</p>
                          <p className="text-xs font-bold text-gray-900">{n.title}</p>
                          <p className="text-[10px] text-gray-500 mt-1">{n.message}</p>
                          <p className="text-[8px] text-gray-400 mt-2 font-bold">{new Date(n.timestamp).toLocaleString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            <button onClick={handleLogout} className="bg-red-600 text-white px-6 py-2 rounded-full text-xs font-black uppercase">Logout</button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="flex bg-white rounded-2xl shadow-xl p-1 mb-8 border border-gray-100 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'overview', label: 'Dashboard', icon: '📊' },
            { id: 'inventory', label: 'Admin Products', icon: '📦' },
            { id: 'sales', label: 'Revenue', icon: '💰' },
            { id: 'customers', label: 'Sellers/Users', icon: '👥' },
            { id: 'withdrawals', label: 'Withdrawals', icon: '💸' },
            { id: 'settings', label: 'System Settings', icon: '⚙️' }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-grow py-4 px-8 rounded-xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3 ${activeTab === tab.id ? 'bg-black text-white shadow-2xl scale-[1.02]' : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
            >
              <span className="text-xl">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { label: 'Total Revenue', value: formatPrice(sales.reduce((acc, s) => acc + (Number(s.amount) || 0), 0)), icon: '💰', color: 'bg-green-50 text-green-600' },
              { label: 'Total Orders', value: sales.length, icon: '📦', color: 'bg-blue-50 text-blue-600' },
              { label: 'Active Sellers', value: sellers.length, icon: '👥', color: 'bg-purple-50 text-purple-600' },
              { label: 'Pending Payments', value: sales.filter(s => s.status === 'Pending Payment').length, icon: '⏳', color: 'bg-orange-50 text-orange-600' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 flex items-center gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl ${stat.color}`}>{stat.icon}</div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">{stat.label}</p>
                  <p className="text-2xl font-black italic tracking-tighter">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Order <span className="text-blue-600 underline">Management</span></h3>
              <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                <input 
                  type="text" 
                  placeholder="Search Customer / Order ID..."
                  className="bg-white border rounded-xl px-4 py-2.5 text-sm font-bold w-full md:w-64"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-2">
                  <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase shadow-lg flex-grow md:flex-grow-0">Process All</button>
                  <button className="bg-gray-100 text-gray-900 px-6 py-2.5 rounded-xl font-black text-xs uppercase flex-grow md:flex-grow-0 text-center">Export</button>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Order & Date</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Customer Details</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Seller / Shop</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right pr-12">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredSales.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">#{s.id.slice(-6)}</span>
                            <span className="text-[10px] font-bold text-gray-400 mt-1">{new Date(s.date).toLocaleDateString()}</span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black uppercase tracking-tighter text-gray-900 line-clamp-1">{s.customerName || 'No Name'}</span>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{s.customerPhone || 'NO_PHONE'}</span>
                              {s.customerEmail && (
                                <span className="text-[9px] text-gray-900 font-black tracking-widest lowercase bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full">{s.customerEmail}</span>
                              )}
                            </div>
                            <span className="text-[8px] text-gray-500 font-bold uppercase mt-2 leading-relaxed line-clamp-2">
                              {s.customerAddress || 'No Address'}, {s.customerCity || 'N/A'}, {s.customerCountry || 'N/A'} {s.customerZip && `(ZIP: ${s.customerZip})`}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-xs font-black uppercase text-purple-600 tracking-tight">{s.sellerShopName || 'Official W-Lord'}</span>
                            <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">UID: {s.sellerId || 'WAREHOUSE'}</span>
                            <div className="mt-1">
                              <a 
                                href={`https://wa.me/${sellers.find(sel => sel.id === s.sellerId)?.whatsapp || '923057390977'}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-[8px] font-black underline text-green-600 uppercase"
                              >
                                Contact Seller
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black text-gray-900">{formatPrice(s.amount)}</span>
                            <div className="mt-1 flex flex-col gap-0.5">
                               <span className="text-[9px] text-blue-600 font-black uppercase tracking-widest">{s.products?.length || 0} Products</span>
                               <div className="max-w-[120px] truncate text-[8px] text-gray-400 font-bold uppercase">
                                 {s.products?.map((p: any) => p.name).join(', ')}
                               </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            s.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 
                            s.status === 'Pending Payment' ? 'bg-orange-50 text-orange-600' : 
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-6 md:px-10 py-6 text-right pr-12">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            {s.status === 'Pending Payment' && (
                              <button 
                                onClick={() => updateSaleStatus(s.id, 'Confirmed')}
                                className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                              >
                                Confirm
                              </button>
                            )}
                            {s.status === 'Confirmed' && (
                              <button 
                                onClick={() => updateSaleStatus(s.id, 'Completed')}
                                className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                              >
                                Complete Order
                              </button>
                            )}
                            <button 
                              onClick={() => setSelectedOrder(s)}
                              className="bg-black text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                            >
                              Details
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
                <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
                  <div className="bg-black text-white p-8 flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black italic tracking-tighter uppercase">Order <span className="text-blue-500 underline">Summary</span></h2>
                      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest mt-2 px-1">Order ID: #{selectedOrder.id}</p>
                    </div>
                    <button onClick={() => setSelectedOrder(null)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all text-white"><X size={20} /></button>
                  </div>
                  <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Customer Profile</h4>
                        <p className="text-sm font-black uppercase text-gray-900">{selectedOrder.customerName}</p>
                        <div className="flex flex-col gap-1.5 mt-2">
                          <p className="text-xs font-bold text-gray-500 flex items-center gap-2">
                            <span className="w-16 text-[9px] uppercase text-gray-400">Phone:</span>
                            <span className="text-gray-900">{selectedOrder.customerPhone || 'Not Provided'}</span>
                          </p>
                          <p className="text-xs font-bold text-gray-500 flex items-center gap-2">
                            <span className="w-16 text-[9px] uppercase text-gray-400">Gmail:</span>
                            <span className="text-blue-600 underline font-black">{selectedOrder.customerEmail || 'Not Provided'}</span>
                          </p>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 mt-4 uppercase tracking-widest">Shipping Address:</p>
                        <div className="text-xs font-bold text-gray-500 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100 mt-2">
                          <p className="uppercase">{selectedOrder.customerAddress || 'No Full Address'}</p>
                          <p className="uppercase font-black text-gray-700">{selectedOrder.customerCity && `${selectedOrder.customerCity}, `}{selectedOrder.customerCountry || 'No Country'}</p>
                          <p className="mt-2 text-blue-600 font-bold tracking-widest">ZIP: {selectedOrder.customerZip || 'N/A'}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3 text-right">Order Stats</h4>
                        <div className="space-y-4">
                          <div className="bg-white p-4 rounded-xl border border-gray-100 text-right">
                            <p className="text-[10px] font-black uppercase text-blue-600 tracking-widest mb-1">Time: {new Date(selectedOrder.date).toLocaleTimeString()}</p>
                            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Date: {new Date(selectedOrder.date).toLocaleDateString()}</p>
                            <div className="mt-4 flex justify-end">
                              <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${
                                selectedOrder.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 
                                selectedOrder.status === 'Pending Payment' ? 'bg-orange-50 text-orange-600' : 
                                'bg-blue-50 text-blue-600'
                              }`}>
                                {selectedOrder.status}
                              </span>
                            </div>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                             <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-1">Source Seller</p>
                             <p className="text-xs font-black uppercase text-gray-900">{selectedOrder.sellerShopName || 'Official W-Lord Admin'}</p>
                             <p className="text-[9px] font-bold text-gray-400 mt-1">SELLER UID: <span className="text-blue-600">{selectedOrder.sellerId || 'OFFICIAL_WAREHOUSE'}</span></p>
                             <p className="text-[9px] font-bold text-gray-400 uppercase mt-1">Role: {selectedOrder.sellerId ? 'Third-Party Merchant' : 'Platform Owner'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Ordered Items</h4>
                      <div className="space-y-3">
                        {selectedOrder.products?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                            <div className="overflow-hidden">
                              <p className="text-xs font-black uppercase text-gray-900 group-hover:text-blue-600 transition-colors truncate">{item.name}</p>
                              <div className="flex flex-wrap gap-2 mt-1">
                                <p className="text-[9px] font-black text-gray-400 uppercase">ID: <span className="text-gray-900">{item.productId || item.id || 'N/A'}</span></p>
                                <p className="text-[9px] font-black text-gray-400 uppercase">Size: <span className="text-gray-900">{item.size || 'N/A'}</span></p>
                                <p className="text-[9px] font-black text-gray-400 uppercase">Color: <span className="text-gray-900">{item.color || 'N/A'}</span></p>
                                <p className="text-[9px] font-black text-blue-600 uppercase">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                               <p className="font-black text-sm">{formatPrice(item.price * item.quantity)}</p>
                               <p className="text-[8px] font-bold text-gray-400 uppercase">Unit: {formatPrice(item.price)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
                      <p className="text-lg font-black italic uppercase tracking-tighter">Total Due</p>
                      <p className="text-3xl font-black italic tracking-tighter text-blue-600">{formatPrice(selectedOrder.amount)}</p>
                    </div>
                  </div>
                  <div className="p-8 pt-0 flex gap-4">
                     <button onClick={() => setSelectedOrder(null)} className="flex-grow bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-blue-600 transition-all">Close</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'customers' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Seller <span className="text-blue-600 underline">Management</span></h3>
              <div className="flex gap-4 w-full md:w-auto">
                <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase shadow-lg flex-grow md:flex-grow-0">Verify All</button>
                <button className="bg-gray-100 text-gray-900 px-6 py-2.5 rounded-xl font-black text-xs uppercase flex-grow md:flex-grow-0 text-center">Export List</button>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
               <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Seller & Shop</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">WhatsApp / Contact</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Location</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Rank</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="px-6 md:px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right pr-12">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sellers.map(s => (
                      <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                            <span className="text-sm font-black uppercase tracking-tighter text-gray-900">{s.fullName}</span>
                            <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{s.shopName || s.showName}</span>
                            <span className="text-[9px] text-gray-400 font-bold uppercase truncate max-w-[150px]">{s.email}</span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <div className="flex flex-col">
                             <span className="text-xs font-black text-green-600 tracking-tight">{s.whatsapp}</span>
                             <span className="text-[9px] text-gray-400 font-bold uppercase">{s.contactNumber}</span>
                          </div>
                        </td>
                        <td className="px-6 md:px-10 py-6 text-xs font-bold text-gray-900 uppercase">{s.location || `${s.city}, ${s.country}`}</td>
                        <td className="px-6 md:px-10 py-6 text-center">
                          <span className={`px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                            s.rank === 'Gold' ? 'bg-yellow-50 text-yellow-600' : 'bg-gray-50 text-gray-600'
                          }`}>
                            {s.rank}
                          </span>
                        </td>
                        <td className="px-6 md:px-10 py-6">
                          <span className={`px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            s.isVerified ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'
                          }`}>
                            {s.isVerified ? 'VERIFIED' : 'PENDING'}
                          </span>
                        </td>
                        <td className="px-6 md:px-10 py-6 text-right pr-12">
                          <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => setSelectedSeller(s)}
                              className="bg-black text-white px-4 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                            >
                              Details
                            </button>
                            <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Edit</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seller Details Modal */}
            {selectedSeller && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
                <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
                  <div className="bg-purple-600 text-white p-8 flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black italic tracking-tighter uppercase">Seller <span className="text-black underline">Profile</span></h2>
                      <p className="text-purple-100 text-[10px] font-black uppercase tracking-widest mt-2 px-1">Shop: {selectedSeller.shopName || selectedSeller.showName}</p>
                    </div>
                    <button onClick={() => setSelectedSeller(null)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all text-white"><X size={20} /></button>
                  </div>
                  <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                    <div className="grid grid-cols-2 gap-8 text-left">
                      <div className="space-y-4">
                        <section>
                          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2"><UserIcon size={12}/> Personal Info</h4>
                          <p className="text-sm font-black uppercase text-gray-900">{selectedSeller.fullName}</p>
                          <p className="text-xs font-bold text-gray-500 mt-1 flex items-center gap-2"><Mail size={12}/> {selectedSeller.email}</p>
                        </section>
                        <section>
                          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2"><Phone size={12}/> Contact</h4>
                          <p className="text-xs font-bold text-gray-900">WA: {selectedSeller.whatsapp}</p>
                          <p className="text-xs font-bold text-gray-500 mt-1">ALT: {selectedSeller.contactNumber}</p>
                        </section>
                      </div>
                      <div className="space-y-4">
                         <section>
                          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2"><MapPin size={12}/> Location</h4>
                          <p className="text-xs font-bold text-gray-900 uppercase">{selectedSeller.city}, {selectedSeller.country}</p>
                          <p className="text-[10px] font-bold text-gray-500 mt-1 uppercase">{selectedSeller.location}</p>
                        </section>
                        <section>
                          <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2 flex items-center gap-2"><ShieldCheck size={12}/> business</h4>
                          <p className="text-[10px] font-black text-purple-600 bg-purple-50 px-2 py-1 rounded inline-block uppercase">{selectedSeller.businessType}</p>
                        </section>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-4">Financial Overview</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Sales Volume</p>
                          <p className="text-xl font-black text-green-600">{selectedSeller.totalSales}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Ranking</p>
                          <p className="text-xl font-black text-gray-900">{selectedSeller.rank}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Response Time</p>
                          <p className="text-xl font-black text-gray-900">{selectedSeller.responseTime}</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold text-gray-400 uppercase">Joined Date</p>
                          <p className="text-[10px] font-black text-gray-900 mt-2 uppercase">{new Date(selectedSeller.joinedDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-3">Verification Info</h4>
                      <p className="text-xs font-bold text-gray-600 flex items-center gap-2">
                        Status: <span className={`font-black uppercase ${selectedSeller.isVerified ? 'text-green-600' : 'text-orange-500'}`}>{selectedSeller.verificationStatus}</span>
                      </p>
                    </div>
                  </div>
                  <div className="p-8 pt-0 flex gap-4">
                      <button onClick={() => setSelectedSeller(null)} className="flex-grow bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-purple-600 transition-all">Close</button>
                    </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'withdrawals' && (
          <div className="space-y-8">
            <h3 className="text-3xl font-black italic tracking-tighter uppercase">Withdrawal <span className="text-blue-600 underline">Requests</span></h3>
            <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Date</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Seller</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Amount</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Method</th>
                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-gray-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {sellers.slice(0, 3).map((s, i) => (
                    <tr key={s.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">March {28 - i}, 2024</td>
                      <td className="px-10 py-6">
                        <div className="flex flex-col">
                          <span className="text-sm font-black uppercase tracking-tighter text-gray-900">{s.fullName}</span>
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{s.email}</span>
                        </div>
                      </td>
                      <td className="px-10 py-6 text-sm font-black text-gray-900">{formatPrice(1250)}</td>
                      <td className="px-10 py-6 text-xs font-bold text-gray-500 uppercase">{s.paymentDetails}</td>
                      <td className="px-10 py-6">
                        <div className="flex gap-4">
                          <button className="bg-green-600 text-white px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-green-600/20">Approve</button>
                          <button className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all">Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="animate-fadeIn space-y-8 max-w-2xl mx-auto">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-10">Cloud <span className="text-blue-600">Infrastructure</span></h3>
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 mb-8">
                <div className="flex items-center gap-4 text-blue-600 mb-4">
                  <ShieldCheck size={24} />
                  <span className="text-sm font-black uppercase tracking-widest">Live Cloud Firestore Connected</span>
                </div>
                <p className="text-[10px] font-bold text-blue-800 uppercase tracking-widest leading-loose text-left">
                  Region: asia-southeast1 <br/>
                  Project ID: gen-lang-client-0876635319 <br/>
                  Status: All systems operational
                </p>
              </div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                User Management is now handled via Firebase Authentication. 
                Manual password hashing has been deprecated for superior security.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase">Inventory <span className="text-blue-600 underline">Management</span></h3>
              <button 
                onClick={() => setIsAddingProduct(true)}
                className="bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase shadow-xl shadow-blue-600/20 flex items-center gap-3"
              >
                <Plus size={18} /> Add New Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <div key={product.id} className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden group">
                  <div className="aspect-square bg-gray-100 relative group-hover:scale-105 transition-transform duration-700">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-4 right-4 flex gap-2">
                       <button 
                        onClick={() => {
                          setEditProductData(product);
                          setIsEditingProduct(true);
                        }}
                        className="bg-white text-gray-900 p-2 rounded-lg shadow-lg hover:bg-blue-600 hover:text-white transition-all"
                       >
                         <Edit2 size={14}/>
                       </button>
                       <button 
                         onClick={() => handleDeleteProduct(product.id)}
                         className="bg-white text-red-600 p-2 rounded-lg shadow-lg hover:bg-red-600 hover:text-white transition-all"
                       >
                         <Trash2 size={14}/>
                       </button>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-black uppercase tracking-tight">{product.name}</h4>
                        <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{product.category}</p>
                      </div>
                      <span className="text-xl font-black tracking-tighter">{formatPrice(product.price)}</span>
                    </div>
                    <div className="flex gap-2">
                      {product.badges?.map((badge, idx) => (
                        <span key={idx} className="bg-gray-100 text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest">{badge}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Product Modal */}
            {isAddingProduct && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
                  <div className="bg-blue-600 text-white p-10 flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black italic tracking-tighter uppercase">Add <span className="text-black underline">Product</span></h2>
                      <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mt-2">Cloud Firestore Inventory</p>
                    </div>
                    <button onClick={() => setIsAddingProduct(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all text-white"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleAddProduct} className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Product Name</label>
                      <input 
                        required
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                        value={newProduct.name}
                        onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Base Price ($)</label>
                        <input 
                          required
                          type="number"
                          className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                          value={isNaN(newProduct.price) ? '' : newProduct.price}
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
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                        value={newProduct.image}
                        onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Description</label>
                      <textarea 
                        required
                        rows={3}
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                        value={newProduct.description}
                        onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Offer / Discount (Optional)</label>
                      <input 
                        placeholder='e.g. "20% OFF", "BUY 1 GET 1 FREE", "SPECIAL DEAL"'
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold text-sm"
                        value={newProduct.offer || ''}
                        onChange={e => setNewProduct({...newProduct, offer: e.target.value})}
                      />
                    </div>
                    <div className="pt-6">
                      <button type="submit" className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">Publish to Global Store</button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Edit Product Modal */}
            {isEditingProduct && editProductData && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
                <div className="bg-white rounded-[3rem] shadow-2xl max-w-2xl w-full overflow-hidden animate-scaleIn">
                  <div className="bg-purple-600 text-white p-10 flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black italic tracking-tighter uppercase">Edit <span className="text-black underline">Product</span></h2>
                      <p className="text-purple-100 text-[10px] font-black uppercase tracking-widest mt-2">{editProductData.id}</p>
                    </div>
                    <button onClick={() => setIsEditingProduct(false)} className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all text-white"><X size={20} /></button>
                  </div>
                  <form 
                    onSubmit={async (e) => {
                      e.preventDefault();
                      try {
                        const normalizedCategory = (editProductData.category || '').toLowerCase().trim();
                        await updateProduct(editProductData.id, {
                          ...editProductData,
                          category: normalizedCategory
                        });
                        setIsEditingProduct(false);
                        alert("Product updated successfully!");
                      } catch (err: any) {
                        alert(`Error: ${err.message}`);
                      }
                    }} 
                    className="p-10 space-y-6 max-h-[60vh] overflow-y-auto"
                  >
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Product Name</label>
                      <input 
                        required
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                        value={editProductData.name}
                        onChange={e => setEditProductData({...editProductData, name: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Price ($)</label>
                        <input 
                          required
                          type="number"
                          className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                          value={isNaN(editProductData.price) ? '' : editProductData.price}
                          onChange={e => setEditProductData({...editProductData, price: parseFloat(e.target.value) || 0})}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Category</label>
                        <select 
                          className="w-full bg-gray-50 border p-4 rounded-xl font-bold uppercase text-xs"
                          value={editProductData.category}
                          onChange={e => setEditProductData({...editProductData, category: e.target.value})}
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Image URL</label>
                      <input 
                        required
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                        value={editProductData.image}
                        onChange={e => setEditProductData({...editProductData, image: e.target.value})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Stock Level</label>
                      <input 
                        required
                        type="number"
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold"
                        value={isNaN(editProductData.stock) ? 0 : editProductData.stock}
                        onChange={e => setEditProductData({...editProductData, stock: parseInt(e.target.value) || 0})}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Offer / Discount (Optional)</label>
                      <input 
                        placeholder='e.g. "20% OFF", "BUY 1 GET 1 FREE", "SPECIAL DEAL"'
                        className="w-full bg-gray-50 border p-4 rounded-xl font-bold text-sm"
                        value={editProductData.offer || ''}
                        onChange={e => setEditProductData({...editProductData, offer: e.target.value})}
                      />
                    </div>
                    <div className="pt-6">
                      <button type="submit" className="w-full bg-purple-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-black transition-all">Save Changes</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
