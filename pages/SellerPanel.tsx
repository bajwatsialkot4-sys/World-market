
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BarChart3, Box, ShoppingBag, Bell, Plus, Settings, 
  ChevronRight, ArrowUpRight, ArrowDownRight, Package,
  Clock, CheckCircle2, AlertCircle, X, Search, User as UserIcon,
  LogOut, Trash2
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';

const SellerPanel: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    sales, products, sellers, notifications, unreadNotificationsCount,
    formatPrice, addProduct, updateSaleStatus, markNotificationAsRead 
  } = useStore();

  const [activeTab, setActiveTab] = useState<'orders' | 'notifications'>('orders');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const seller = sellers.find(s => s.id === id || s.showName === id);
  const sellerProducts = products.filter(p => p.sellerId === seller?.id);
  const sellerSales = sales.filter(s => s.sellerId === seller?.id);

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
    // Simulate loading for professional feel
    const timer = setTimeout(() => setIsLoading(false), 800);
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
      <main className="max-w-4xl mx-auto w-full p-4 md:p-8 space-y-8">
        
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
        <div className="flex gap-4 border-b border-gray-200">
           <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'orders' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 opacity-60'}`}
           >
             My Orders ({sellerSales.length})
           </button>
           <button 
            onClick={() => setActiveTab('notifications')}
            className={`px-6 py-4 text-xs font-black uppercase tracking-widest border-b-2 transition-all ${activeTab === 'notifications' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-400 opacity-60'}`}
           >
             Notifications ({unreadCount})
           </button>
        </div>

        <section className="animate-fadeIn">
          {activeTab === 'orders' ? (
            <div className="space-y-4">
              {sellerSales.length === 0 ? (
                <div className="bg-white p-20 rounded-[2rem] border border-dashed text-center">
                   <ShoppingBag className="mx-auto mb-4 text-gray-200" size={48}/>
                   <p className="text-xs font-black uppercase text-gray-400 tracking-widest">No orders received yet</p>
                </div>
              ) : (
                sellerSales.map(order => (
                  <div key={order.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 group hover:shadow-xl hover:border-blue-200 transition-all">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                       <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                          <ShoppingBag size={24}/>
                       </div>
                       <div>
                          <p className="text-sm font-black uppercase text-gray-900">Buyer: Private Customer</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">[Details Protected]</span>
                            <span className="text-[10px] hidden"></span>
                          </div>
                          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">ID: #{order.id.slice(-8)} • {new Date(order.date).toLocaleDateString()}</p>
                       </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-x-8 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                       <div className="text-left md:text-right">
                          <p className="text-sm font-black text-blue-600">{formatPrice(order.amount)}</p>
                          <span className={`text-[9px] font-black uppercase ${order.status === 'Confirmed' ? 'text-green-500' : 'text-orange-500'}`}>{order.status}</span>
                       </div>
                       <button onClick={() => setSelectedOrder(order)} className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Details</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
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
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${n.type === 'New Order' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'}`}>
                       {n.type === 'New Order' ? <ShoppingBag size={20}/> : <AlertCircle size={20}/>}
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
              Payment will be processed after order completion. Seller will receive confirmation on WhatsApp.
            </p>
          </div>
        </section>
      </main>

      {/* Modals are kept below (Order Detail & Add Product) - They are already minimal/correct but I'll add the data fix to Order Detail */}
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
                       <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${selectedOrder.status === 'Confirmed' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                          {selectedOrder.status}
                        </span>
                    </div>
                  </section>
               </div>
               <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col gap-3">
                 <p className="text-[10px] font-black uppercase tracking-widest text-blue-600">
                   "Payment will be processed after order completion. Seller will receive confirmation on WhatsApp."
                 </p>
                 <div className="pt-2 border-t border-blue-100 flex justify-between items-center">
                   <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Commission Type</span>
                   <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Direct Escrow</span>
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

