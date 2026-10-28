
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, Plus, Trash2, Edit2, ShieldCheck, Mail, LogIn, Bell, User as UserIcon, 
  Phone, MapPin, Globe, DollarSign, CheckCircle2, AlertTriangle, ArrowRight, 
  RefreshCw, Check, AlertCircle, FileText, Send, Undo2, Archive, CreditCard,
  ExternalLink, Key, Package, Copy, Lock, Eye, ShoppingBag, MessageCircle
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES, ADMIN_EMAILS } from '../constants';
import { Product, SaleRecord, SellerInfo, SellerPayoutRecord } from '../types';
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
    addProduct, updateProduct, deleteProduct, updateSaleStatus, deleteSale, archiveSale,
    updateSeller,
    sellerEarnings, sellerPayouts, addSellerEarning, addSellerPayout, reverseSellerPayout, resetSellerBalance, getSellerFinancials,
    formatPrice, markNotificationAsRead 
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

  // Toast feedback
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Order Action States
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [orderToComplete, setOrderToComplete] = useState<SaleRecord | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<SaleRecord | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<SaleRecord | null>(null);

  // Earnings Modal State
  const [earningSeller, setEarningSeller] = useState<SellerInfo | null>(null);
  const [earningForm, setEarningForm] = useState({ orderId: '', amount: '', adminNote: '', allowDuplicate: false });
  const [earningLoading, setEarningLoading] = useState(false);

  // Payout Modal State
  const [payoutSeller, setPayoutSeller] = useState<SellerInfo | null>(null);
  const [payoutForm, setPayoutForm] = useState({
    amount: '',
    payoutDate: new Date().toISOString().split('T')[0],
    paymentMethod: 'International Bank Transfer',
    transactionReference: '',
    adminNote: '',
    confirmedSent: false
  });
  const [payoutLoading, setPayoutLoading] = useState(false);

  // Payout Reversal Modal State
  const [payoutToReverse, setPayoutToReverse] = useState<SellerPayoutRecord | null>(null);
  const [reversalReason, setReversalReason] = useState('');
  const [reversalLoading, setReversalLoading] = useState(false);

  // Balance Reset Modal State
  const [sellerToResetBalance, setSellerToResetBalance] = useState<{ seller: SellerInfo; balance: number } | null>(null);
  const [resetNote, setResetNote] = useState('');
  const [resetLoading, setResetLoading] = useState(false);

  // Seller Password Reset & WhatsApp Delivery State
  const [sellerToResetPassword, setSellerToResetPassword] = useState<SellerInfo | null>(null);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [passwordResetSuccess, setPasswordResetSuccess] = useState<{ seller: SellerInfo; newPass: string } | null>(null);
  const [passwordResetLoading, setPasswordResetLoading] = useState(false);
  const [copiedCredentials, setCopiedCredentials] = useState(false);

  // Seller Uploaded Products Modal State
  const [sellerForProducts, setSellerForProducts] = useState<SellerInfo | null>(null);
  const [productStatusUpdatingId, setProductStatusUpdatingId] = useState<string | null>(null);
  const [copiedLinkNotice, setCopiedLinkNotice] = useState<string | null>(null);

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

  const handleStatusChange = async (orderId: string, newStatus: SaleRecord['status']) => {
    if (updatingOrderId) return;
    setUpdatingOrderId(orderId);
    try {
      await updateSaleStatus(orderId, newStatus);
      showToast(`Order #${orderId.slice(-6)} status updated to "${newStatus}"`, 'success');
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder((prev: any) => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      showToast(err.message || "Failed to update order status", 'error');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleConfirmCompletion = async (order: SaleRecord) => {
    if (updatingOrderId) return;
    setUpdatingOrderId(order.id);
    try {
      await updateSaleStatus(order.id, 'Completed');
      showToast(`Order #${order.id.slice(-6)} marked as Completed. Customer payment confirmed.`, 'success');
      if (selectedOrder && selectedOrder.id === order.id) {
        setSelectedOrder((prev: any) => prev ? { ...prev, status: 'Completed' } : null);
      }
      setOrderToComplete(null);
    } catch (err: any) {
      showToast(err.message || "Failed to complete order", 'error');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleConfirmCancellation = async (order: SaleRecord) => {
    if (updatingOrderId) return;
    setUpdatingOrderId(order.id);
    try {
      await updateSaleStatus(order.id, 'Cancelled');
      showToast(`Order #${order.id.slice(-6)} has been cancelled.`, 'success');
      if (selectedOrder && selectedOrder.id === order.id) {
        setSelectedOrder((prev: any) => prev ? { ...prev, status: 'Cancelled' } : null);
      }
      setOrderToCancel(null);
    } catch (err: any) {
      showToast(err.message || "Failed to cancel order", 'error');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleConfirmDelete = async (order: SaleRecord) => {
    if (updatingOrderId) return;
    setUpdatingOrderId(order.id);
    try {
      await deleteSale(order.id);
      showToast(`Order #${order.id.slice(-6)} deleted permanently.`, 'success');
      if (selectedOrder?.id === order.id) setSelectedOrder(null);
      setOrderToDelete(null);
    } catch (err: any) {
      showToast(err.message || "Failed to delete order", 'error');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleConfirmArchive = async (order: SaleRecord) => {
    if (updatingOrderId) return;
    setUpdatingOrderId(order.id);
    try {
      await archiveSale(order.id);
      showToast(`Order #${order.id.slice(-6)} safely archived and cancelled.`, 'success');
      if (selectedOrder?.id === order.id) {
        setSelectedOrder((prev: any) => prev ? { ...prev, status: 'Cancelled', isArchived: true } : null);
      }
      setOrderToDelete(null);
    } catch (err: any) {
      showToast(err.message || "Failed to archive order", 'error');
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleSaveEarnings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!earningSeller) return;
    const amountNum = parseFloat(earningForm.amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      showToast('Earnings amount must be greater than $0.00 USD.', 'error');
      return;
    }
    if (!earningForm.orderId.trim()) {
      showToast('Please enter or select a related Order ID.', 'error');
      return;
    }

    const trimmedOrderId = earningForm.orderId.trim();
    const existing = sellerEarnings.find(e => e.sellerId === earningSeller.id && e.orderId.toLowerCase() === trimmedOrderId.toLowerCase());
    if (existing && !earningForm.allowDuplicate) {
      showToast(`An earnings entry ($${existing.amount.toFixed(2)}) already exists for Order #${trimmedOrderId}. Check the box to confirm this authorized adjustment.`, 'error');
      return;
    }

    setEarningLoading(true);
    try {
      await addSellerEarning({
        sellerId: earningSeller.id,
        sellerName: earningSeller.shopName || earningSeller.fullName,
        orderId: trimmedOrderId,
        amount: amountNum,
        adminNote: earningForm.adminNote.trim() || undefined,
        createdByAdminEmail: user?.email || 'admin'
      });
      showToast(`Saved $${amountNum.toFixed(2)} USD earnings for ${earningSeller.shopName || earningSeller.fullName}.`, 'success');
      setEarningSeller(null);
      setEarningForm({ orderId: '', amount: '', adminNote: '', allowDuplicate: false });
    } catch (err: any) {
      showToast(err.message || "Failed to save earnings", 'error');
    } finally {
      setEarningLoading(false);
    }
  };

  const handleSavePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutSeller) return;
    const amountNum = parseFloat(payoutForm.amount);
    const { availableBalance } = getSellerFinancials(payoutSeller.id);

    if (isNaN(amountNum) || amountNum <= 0) {
      showToast('Payout amount must be greater than $0.00 USD.', 'error');
      return;
    }
    if (amountNum > availableBalance + 0.001) {
      showToast(`Payout amount ($${amountNum.toFixed(2)}) cannot exceed available balance ($${availableBalance.toFixed(2)}).`, 'error');
      return;
    }
    if (!payoutForm.confirmedSent) {
      showToast('Please check the confirmation box indicating payment was sent.', 'error');
      return;
    }

    setPayoutLoading(true);
    try {
      await addSellerPayout({
        sellerId: payoutSeller.id,
        sellerName: payoutSeller.shopName || payoutSeller.fullName,
        amount: amountNum,
        payoutDate: payoutForm.payoutDate,
        paymentMethod: payoutForm.paymentMethod,
        transactionReference: payoutForm.transactionReference.trim() || undefined,
        adminNote: payoutForm.adminNote.trim() || undefined,
        createdByAdminEmail: user?.email || 'admin',
        emailDeliveryStatus: 'Sent'
      });
      showToast(`Recorded $${amountNum.toFixed(2)} payout as Paid. Notification sent to Seller Panel.`, 'success');
      setPayoutSeller(null);
      setPayoutForm({
        amount: '',
        payoutDate: new Date().toISOString().split('T')[0],
        paymentMethod: 'International Bank Transfer',
        transactionReference: '',
        adminNote: '',
        confirmedSent: false
      });
    } catch (err: any) {
      showToast(err.message || "Failed to record payout", 'error');
    } finally {
      setPayoutLoading(false);
    }
  };

  const handleReversePayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!payoutToReverse) return;
    if (!reversalReason.trim()) {
      showToast('Please enter an authorized reason for this reversal.', 'error');
      return;
    }
    setReversalLoading(true);
    try {
      await reverseSellerPayout(payoutToReverse.id, reversalReason.trim(), user?.email || 'admin');
      showToast(`Payout #${payoutToReverse.id.slice(-6)} has been safely reversed. Available balance restored.`, 'success');
      setPayoutToReverse(null);
      setReversalReason('');
    } catch (err: any) {
      showToast(err.message || "Failed to reverse payout", 'error');
    } finally {
      setReversalLoading(false);
    }
  };

  const handleConfirmResetBalance = async () => {
    if (!sellerToResetBalance) return;
    const { seller, balance } = sellerToResetBalance;
    if (balance <= 0) {
      showToast('Available balance is already $0.00 USD.', 'error');
      setSellerToResetBalance(null);
      return;
    }
    setResetLoading(true);
    try {
      await resetSellerBalance(seller.id, balance, user?.email || 'admin', resetNote.trim() || undefined);
      showToast(`Successfully reset ${seller.shopName || seller.fullName}'s Available Balance to $0.00. Recorded $${balance.toFixed(2)} in Payout History.`, 'success');
      setSellerToResetBalance(null);
      setResetNote('');
    } catch (err: any) {
      showToast(err.message || 'Failed to reset balance', 'error');
    } finally {
      setResetLoading(false);
    }
  };

  const generateSecureRandomPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    let pass = 'WL-';
    for (let i = 0; i < 8; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass;
  };

  const getWhatsAppCredentialsUrl = (seller: SellerInfo, newPass: string) => {
    const rawPhone = seller.whatsapp || seller.contactNumber || '';
    const cleanPhone = rawPhone.replace(/[^\d]/g, '');
    const loginUrl = `${window.location.origin}/seller-login`;
    const message = `Hello ${seller.fullName},\n\nYour W-LORD Market seller portal login credentials have been securely updated by administrator:\n\n🌐 Portal: ${loginUrl}\n👤 Username / Seller ID: ${seller.showName || seller.id}\n🔑 New Password: ${newPass}\n\nPlease keep these credentials confidential.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  const computeSellerDetailedOverview = (seller: SellerInfo) => {
    // All orders associated with this seller
    const sellerOrders = sales.filter(s => 
      s.sellerId === seller.id || 
      (s.sellerShopName && (s.sellerShopName === seller.shopName || s.sellerShopName === seller.showName))
    );

    const totalOrdersCount = sellerOrders.length;
    
    // Completed orders only
    const completedOrders = sellerOrders.filter(s => s.status === 'Completed');
    const completedOrdersCount = completedOrders.length;

    // Pending orders (in progress)
    const pendingOrders = sellerOrders.filter(s => 
      ['New Order', 'Pending Payment', 'Confirmed', 'Processing', 'Shipped'].includes(s.status)
    );
    const pendingOrdersCount = pendingOrders.length;

    // Cancelled or refunded orders
    const cancelledOrders = sellerOrders.filter(s => s.status === 'Cancelled');
    const cancelledOrdersCount = cancelledOrders.length;

    // Total sales (Gross Completed Sales) - strictly exclude unpaid or cancelled orders!
    const grossCompletedSales = completedOrders.reduce((sum, s) => sum + (Number(s.amount) || 0), 0);

    // Seller commission & Admin commission
    const creditedEarningsRecords = sellerEarnings.filter(e => e.sellerId === seller.id);
    const totalCreditedEarnings = creditedEarningsRecords.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

    // Commission rate: default 5% or rank-based (Gold: 8.5%, Silver: 4%, Platinium/Standard: 5%)
    const commissionRatePercent = seller.commissionRate 
      ? seller.commissionRate 
      : (seller.rank === 'Gold' ? 8.5 : seller.rank === 'Silver' ? 4 : 5);
    const commissionRateFraction = commissionRatePercent / 100;

    const sellerCommission = totalCreditedEarnings > 0 
      ? totalCreditedEarnings 
      : Math.round(grossCompletedSales * commissionRateFraction * 100) / 100;

    const adminCommission = Math.max(0, Math.round((grossCompletedSales - sellerCommission) * 100) / 100);

    // Paid payouts
    const paidPayouts = sellerPayouts.filter(p => p.sellerId === seller.id && p.status === 'Paid');
    const totalPaidOut = paidPayouts.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    // Payable balance
    const fin = getSellerFinancials(seller.id);
    const sellerPayableBalance = fin.availableBalance;

    // Products uploaded by this seller
    const sellerProducts = products.filter(p => p.sellerId === seller.id || p.sellerId === seller.showName);

    return {
      sellerOrders,
      totalOrdersCount,
      completedOrdersCount,
      pendingOrdersCount,
      cancelledOrdersCount,
      grossCompletedSales,
      sellerCommission,
      commissionRatePercent,
      adminCommission,
      sellerPayableBalance,
      totalPaidOut,
      sellerProducts,
      isEligibleForPayout: fin.isEligibleForPayout
    };
  };

  const handleResetSellerPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sellerToResetPassword) return;
    const finalPassword = generatedPassword.trim();
    if (!finalPassword) {
      showToast('Please enter or generate a new password.', 'error');
      return;
    }
    if (finalPassword.length < 6) {
      showToast('Password should be at least 6 characters.', 'error');
      return;
    }

    setPasswordResetLoading(true);
    try {
      await updateSeller(sellerToResetPassword.id, {
        password: finalPassword,
        passwordUpdatedAt: new Date().toISOString()
      });
      showToast(`Password successfully reset for ${sellerToResetPassword.fullName}.`, 'success');
      setPasswordResetSuccess({
        seller: sellerToResetPassword,
        newPass: finalPassword
      });
      setSellerToResetPassword(null);
      setGeneratedPassword('');
    } catch (err: any) {
      showToast(err.message || 'Failed to update seller password', 'error');
    } finally {
      setPasswordResetLoading(false);
    }
  };

  const handleToggleProductApproval = async (product: Product, newStatus: 'Approved' | 'Pending' | 'Rejected') => {
    setProductStatusUpdatingId(product.id);
    try {
      await updateProduct(product.id, {
        approvalStatus: newStatus
      });
      showToast(`Product "${product.name}" status updated to ${newStatus}.`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Failed to update product approval status', 'error');
    } finally {
      setProductStatusUpdatingId(null);
    }
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLinkNotice(label);
      setTimeout(() => setCopiedLinkNotice(null), 3000);
      showToast(`Copied ${label} to clipboard!`, 'success');
    } catch (e) {
      showToast(`Failed to copy to clipboard`, 'error');
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
                          <span className={`px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                            s.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                            s.status === 'Shipped' ? 'bg-purple-100 text-purple-700' :
                            s.status === 'Processing' ? 'bg-blue-100 text-blue-700' :
                            s.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                            s.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-700' :
                            s.status === 'Pending Payment' ? 'bg-amber-100 text-amber-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {s.status}
                          </span>
                        </td>
                        <td className="px-6 md:px-10 py-6 text-right pr-6 md:pr-12">
                          <div className="flex flex-wrap justify-end items-center gap-1.5">
                            {/* New Order / Pending Payment stage */}
                            {(s.status === 'New Order' || s.status === 'Pending Payment') && (
                              <>
                                <button 
                                  disabled={updatingOrderId === s.id}
                                  onClick={() => handleStatusChange(s.id, 'Processing')}
                                  className="bg-blue-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-black transition-all disabled:opacity-50"
                                  title="Mark as Processing"
                                >
                                  Process
                                </button>
                                <button 
                                  disabled={updatingOrderId === s.id}
                                  onClick={() => setOrderToCancel(s)}
                                  className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                                  title="Cancel Order"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {/* Confirmed stage */}
                            {s.status === 'Confirmed' && (
                              <>
                                <button 
                                  disabled={updatingOrderId === s.id}
                                  onClick={() => handleStatusChange(s.id, 'Processing')}
                                  className="bg-blue-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-black transition-all disabled:opacity-50"
                                >
                                  Process
                                </button>
                                <button 
                                  disabled={updatingOrderId === s.id}
                                  onClick={() => handleStatusChange(s.id, 'Shipped')}
                                  className="bg-purple-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-black transition-all disabled:opacity-50"
                                >
                                  Ship
                                </button>
                                <button 
                                  disabled={updatingOrderId === s.id}
                                  onClick={() => setOrderToCancel(s)}
                                  className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {/* Processing stage */}
                            {s.status === 'Processing' && (
                              <>
                                <button 
                                  disabled={updatingOrderId === s.id}
                                  onClick={() => handleStatusChange(s.id, 'Shipped')}
                                  className="bg-purple-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-black transition-all disabled:opacity-50"
                                >
                                  Ship
                                </button>
                                <button 
                                  disabled={updatingOrderId === s.id}
                                  onClick={() => setOrderToCancel(s)}
                                  className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {/* Shipped stage */}
                            {s.status === 'Shipped' && (
                              <>
                                <button 
                                  disabled={updatingOrderId === s.id}
                                  onClick={() => setOrderToComplete(s)}
                                  className="bg-green-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-black transition-all disabled:opacity-50 shadow-sm"
                                >
                                  Complete
                                </button>
                                <button 
                                  disabled={updatingOrderId === s.id}
                                  onClick={() => setOrderToCancel(s)}
                                  className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {/* Completed stage */}
                            {s.status === 'Completed' && (
                              <button 
                                onClick={() => {
                                  const matchingSeller = sellers.find(sel => sel.id === s.sellerId || sel.shopName === s.sellerShopName) || {
                                    id: s.sellerId || 'admin',
                                    fullName: s.sellerShopName || 'Seller',
                                    shopName: s.sellerShopName || 'Seller Store',
                                    email: '',
                                    whatsapp: '',
                                    contactNumber: '',
                                    country: '',
                                    city: '',
                                    paymentDetails: '',
                                    showName: s.sellerShopName || 'seller',
                                    rank: 'Standard',
                                    rating: 5,
                                    totalSales: 0,
                                    joinedDate: new Date().toISOString(),
                                    responseTime: '24h',
                                    isVerified: true,
                                    verificationStatus: 'Verified',
                                    businessType: 'Business'
                                  } as SellerInfo;
                                  setEarningSeller(matchingSeller);
                                  setEarningForm({
                                    orderId: s.id,
                                    amount: (s.amount * 0.7).toFixed(2),
                                    adminNote: `Profit share for Order #${s.id.slice(-6)}`,
                                    allowDuplicate: false
                                  });
                                }}
                                className="bg-emerald-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-black transition-all shadow-sm"
                                title="Add Manual Seller Earnings"
                              >
                                + Earnings
                              </button>
                            )}
                            {/* Cancelled stage */}
                            {s.status === 'Cancelled' && (
                              <button 
                                disabled={updatingOrderId === s.id}
                                onClick={() => setOrderToDelete(s)}
                                className="bg-red-600 text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-black transition-all disabled:opacity-50"
                                title="Delete or Archive Order"
                              >
                                Delete
                              </button>
                            )}
                            <button 
                              onClick={() => setSelectedOrder(s)}
                              className="bg-black text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider hover:bg-blue-600 transition-all shadow-sm"
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

                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Order Management Actions</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedOrder.status !== 'Processing' && selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && (
                          <button
                            disabled={updatingOrderId === selectedOrder.id}
                            onClick={() => handleStatusChange(selectedOrder.id, 'Processing')}
                            className="bg-blue-600 hover:bg-black text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                          >
                            Mark Processing
                          </button>
                        )}
                        {selectedOrder.status !== 'Shipped' && selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && (
                          <button
                            disabled={updatingOrderId === selectedOrder.id}
                            onClick={() => handleStatusChange(selectedOrder.id, 'Shipped')}
                            className="bg-purple-600 hover:bg-black text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                          >
                            Mark Shipped
                          </button>
                        )}
                        {selectedOrder.status !== 'Completed' && selectedOrder.status !== 'Cancelled' && (
                          <button
                            disabled={updatingOrderId === selectedOrder.id}
                            onClick={() => setOrderToComplete(selectedOrder)}
                            className="bg-green-600 hover:bg-black text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                          >
                            Mark Completed
                          </button>
                        )}
                        {selectedOrder.status !== 'Cancelled' && (
                          <button
                            disabled={updatingOrderId === selectedOrder.id}
                            onClick={() => setOrderToCancel(selectedOrder)}
                            className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                          >
                            Cancel Order
                          </button>
                        )}
                        {selectedOrder.status === 'Completed' && (
                          <button
                            onClick={() => {
                              const matchingSeller = sellers.find(sel => sel.id === selectedOrder.sellerId || sel.shopName === selectedOrder.sellerShopName) || {
                                id: selectedOrder.sellerId || 'admin',
                                fullName: selectedOrder.sellerShopName || 'Seller',
                                shopName: selectedOrder.sellerShopName || 'Seller Store',
                                email: '',
                                whatsapp: '',
                                contactNumber: '',
                                country: '',
                                city: '',
                                paymentDetails: '',
                                showName: selectedOrder.sellerShopName || 'seller',
                                rank: 'Standard',
                                rating: 5,
                                totalSales: 0,
                                joinedDate: new Date().toISOString(),
                                responseTime: '24h',
                                isVerified: true,
                                verificationStatus: 'Verified',
                                businessType: 'Business'
                              } as SellerInfo;
                              setEarningSeller(matchingSeller);
                              setEarningForm({
                                orderId: selectedOrder.id,
                                amount: (selectedOrder.amount * 0.7).toFixed(2),
                                adminNote: `Profit share for Order #${selectedOrder.id.slice(-6)}`,
                                allowDuplicate: false
                              });
                            }}
                            className="bg-emerald-600 hover:bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all shadow-md"
                          >
                            + Add Seller Earnings
                          </button>
                        )}
                        {selectedOrder.status === 'Cancelled' && (
                          <button
                            disabled={updatingOrderId === selectedOrder.id}
                            onClick={() => setOrderToDelete(selectedOrder)}
                            className="bg-red-600 hover:bg-black text-white px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all disabled:opacity-50"
                          >
                            Delete / Archive
                          </button>
                        )}
                      </div>
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
                      <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Seller & Shop Link</th>
                      <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Contact & WhatsApp</th>
                      <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Bank / Payout Details</th>
                      <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Orders</th>
                      <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Financial Overview</th>
                      <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-center">Products</th>
                      <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                      <th className="px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right pr-10">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {sellers.map(s => {
                      const overview = computeSellerDetailedOverview(s);
                      const shopPath = `/seller/${s.showName || s.id}`;
                      const cleanPhone = (s.whatsapp || s.contactNumber || '').replace(/[^\d]/g, '');

                      return (
                        <tr key={s.id} className="hover:bg-gray-50/50 transition-colors group">
                          {/* Seller & Shop Link */}
                          <td className="px-6 md:px-8 py-5">
                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-black uppercase tracking-tighter text-gray-900">{s.fullName}</span>
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">{s.shopName || s.showName}</span>
                                <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono font-bold">ID: {s.id}</span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 text-[9px] text-gray-400">
                                <span className="font-mono">User: <strong className="text-gray-700">{s.showName || s.id}</strong></span>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(s.showName || s.id, `Username for ${s.fullName}`)}
                                  className="text-gray-400 hover:text-black"
                                  title="Copy Login Username"
                                >
                                  <Copy size={11} />
                                </button>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <Link 
                                  to={shopPath}
                                  target="_blank"
                                  className="inline-flex items-center gap-1 text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline"
                                >
                                  <span>Visit Shop</span>
                                  <ExternalLink size={10} />
                                </Link>
                                <button
                                  type="button"
                                  onClick={() => copyToClipboard(`${window.location.origin}${shopPath}`, `Shop Link for ${s.shopName || s.showName}`)}
                                  className="text-[9px] font-bold text-gray-400 hover:text-gray-700 uppercase"
                                  title="Copy Shop URL"
                                >
                                  Copy Link
                                </button>
                              </div>
                            </div>
                          </td>

                          {/* Contact & WhatsApp */}
                          <td className="px-6 md:px-8 py-5">
                            <div className="flex flex-col gap-1 text-xs">
                              <a href={`mailto:${s.email}`} className="text-[10px] text-blue-600 font-bold hover:underline truncate max-w-[160px]">
                                {s.email}
                              </a>
                              {cleanPhone && (
                                <a 
                                  href={`https://wa.me/${cleanPhone}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="inline-flex items-center gap-1 text-green-600 font-black text-[11px] hover:underline"
                                  title="Open WhatsApp chat with seller"
                                >
                                  <Phone size={12} />
                                  <span>{s.whatsapp}</span>
                                </a>
                              )}
                              <span className="text-[9px] text-gray-400 font-bold uppercase">{s.city}, {s.country}</span>
                            </div>
                          </td>

                          {/* Bank / Payout Details */}
                          <td className="px-6 md:px-8 py-5">
                            <div className="max-w-[180px] bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                              <span className="text-[8px] font-black uppercase text-gray-400 tracking-wider block mb-0.5">Payout Method</span>
                              <p className="text-[10px] font-bold text-gray-700 line-clamp-2 leading-tight">
                                {s.paymentDetails || 'No bank/payout details registered yet.'}
                              </p>
                            </div>
                          </td>

                          {/* Orders Breakdown */}
                          <td className="px-6 md:px-8 py-5">
                            <div className="flex flex-col gap-0.5 text-[10px]">
                              <span className="font-bold text-gray-700">Total: <strong className="text-gray-900">{overview.totalOrdersCount}</strong></span>
                              <span className="text-green-600 font-bold">✓ Completed: <strong>{overview.completedOrdersCount}</strong></span>
                              <span className="text-blue-600 font-bold">⏳ Pending: <strong>{overview.pendingOrdersCount}</strong></span>
                              {overview.cancelledOrdersCount > 0 && (
                                <span className="text-red-500 font-bold">✕ Cancelled: <strong>{overview.cancelledOrdersCount}</strong></span>
                              )}
                            </div>
                          </td>

                          {/* Financial Overview */}
                          <td className="px-6 md:px-8 py-5">
                            <div className="flex flex-col gap-1 text-[10px]">
                              <div>
                                <span className="text-gray-400 uppercase text-[8px] font-black tracking-wider">Gross Sales: </span>
                                <span className="font-black text-gray-900 text-xs">${overview.grossCompletedSales.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-emerald-700 font-bold">Seller: ${overview.sellerCommission.toFixed(2)}</span>
                                <span className="text-gray-400">|</span>
                                <span className="text-purple-700 font-bold">Admin: ${overview.adminCommission.toFixed(2)}</span>
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="text-gray-400 font-bold">Payable:</span>
                                <span className="font-black text-green-600 text-xs">${overview.sellerPayableBalance.toFixed(2)}</span>
                                {overview.isEligibleForPayout && (
                                  <span className="bg-green-100 text-green-800 text-[8px] font-black px-1.5 py-0.5 rounded">≥$30</span>
                                )}
                              </div>
                            </div>
                          </td>

                          {/* Products */}
                          <td className="px-6 md:px-8 py-5 text-center">
                            <button
                              type="button"
                              onClick={() => setSellerForProducts(s)}
                              className="inline-flex items-center gap-1.5 bg-gray-100 hover:bg-black hover:text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all"
                              title="View all products uploaded by this seller"
                            >
                              <Package size={12} />
                              <span>{overview.sellerProducts.length} Items</span>
                            </button>
                          </td>

                          {/* Status */}
                          <td className="px-6 md:px-8 py-5">
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                              s.isVerified || s.verificationStatus === 'Verified' 
                                ? 'bg-green-50 text-green-700 border border-green-200' 
                                : 'bg-orange-50 text-orange-700 border border-orange-200'
                            }`}>
                              {s.verificationStatus || (s.isVerified ? 'VERIFIED' : 'PENDING')}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-6 md:px-8 py-5 text-right pr-6 md:pr-10">
                            <div className="flex flex-wrap justify-end gap-1.5">
                              {/* Products button */}
                              <button
                                type="button"
                                onClick={() => setSellerForProducts(s)}
                                className="bg-gray-100 hover:bg-black hover:text-white text-gray-800 px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all shadow-sm"
                                title="View uploaded products"
                              >
                                Products
                              </button>

                              {/* Reset Password button */}
                              <button
                                type="button"
                                onClick={() => {
                                  setSellerToResetPassword(s);
                                  setGeneratedPassword(generateSecureRandomPassword());
                                  setPasswordResetSuccess(null);
                                }}
                                className="bg-indigo-600 hover:bg-black text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all shadow-sm"
                                title="Securely reset seller password"
                              >
                                <span className="flex items-center gap-1">
                                  <Key size={10} /> Password
                                </span>
                              </button>

                              {/* Add Earnings button */}
                              <button 
                                type="button"
                                onClick={() => {
                                  setEarningSeller(s);
                                  setEarningForm({ orderId: '', amount: '', adminNote: '', allowDuplicate: false });
                                }}
                                className="bg-emerald-600 hover:bg-black text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all shadow-sm"
                                title="Manually record seller earnings"
                              >
                                + Earnings
                              </button>
                              
                              {/* Reset Available Balance to $0 button */}
                              <button 
                                type="button"
                                disabled={overview.sellerPayableBalance <= 0}
                                onClick={() => {
                                  setSellerToResetBalance({ seller: s, balance: overview.sellerPayableBalance });
                                  setResetNote('');
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all shadow-sm ${
                                  overview.sellerPayableBalance > 0
                                    ? 'bg-amber-600 hover:bg-black text-white' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                                }`}
                                title={overview.sellerPayableBalance > 0 ? `Reset Available Balance ($${overview.sellerPayableBalance.toFixed(2)}) to $0.00 after manual payment` : 'Available balance is already $0.00'}
                              >
                                Reset (${overview.sellerPayableBalance.toFixed(2)})
                              </button>
                              
                              {/* Record Payout button */}
                              <button 
                                type="button"
                                disabled={!overview.isEligibleForPayout}
                                onClick={() => {
                                  setPayoutSeller(s);
                                  setPayoutForm({
                                    amount: overview.sellerPayableBalance.toFixed(2),
                                    payoutDate: new Date().toISOString().split('T')[0],
                                    paymentMethod: 'International Bank Transfer',
                                    transactionReference: '',
                                    adminNote: '',
                                    confirmedSent: false
                                  });
                                }}
                                className={`px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all shadow-sm ${
                                  overview.isEligibleForPayout 
                                    ? 'bg-blue-600 hover:bg-black text-white' 
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                                }`}
                                title={overview.isEligibleForPayout ? 'Record manual payout' : 'Available balance is below $30.00 minimum threshold'}
                              >
                                Payout
                              </button>

                              {/* Details button */}
                              <button 
                                type="button"
                                onClick={() => setSelectedSeller(s)}
                                className="bg-black text-white px-2.5 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest hover:bg-purple-600 transition-all shadow-sm"
                              >
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Seller Comprehensive Details & Financial Modal */}
            {selectedSeller && (() => {
              const overview = computeSellerDetailedOverview(selectedSeller);
              const shopPath = `/seller/${selectedSeller.showName || selectedSeller.id}`;
              const cleanPhone = (selectedSeller.whatsapp || selectedSeller.contactNumber || '').replace(/[^\d]/g, '');

              return (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn">
                  <div className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full overflow-hidden animate-scaleIn flex flex-col max-h-[90vh]">
                    {/* Header */}
                    <div className="bg-black text-white p-6 md:p-8 flex justify-between items-center shrink-0">
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Seller Control & Audit</span>
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${
                            selectedSeller.isVerified || selectedSeller.verificationStatus === 'Verified' ? 'bg-green-500/20 text-green-300' : 'bg-orange-500/20 text-orange-300'
                          }`}>
                            {selectedSeller.verificationStatus || (selectedSeller.isVerified ? 'VERIFIED' : 'PENDING')}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black italic tracking-tighter uppercase">
                          {selectedSeller.fullName} <span className="text-blue-500 font-normal">({selectedSeller.shopName || selectedSeller.showName})</span>
                        </h2>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400 font-mono flex-wrap">
                          <span>Unique ID: <strong className="text-white font-bold">#{selectedSeller.id}</strong></span>
                          <span>•</span>
                          <span>Username: <strong className="text-blue-400 font-bold">{selectedSeller.showName || selectedSeller.id}</strong></span>
                        </div>
                      </div>
                      <button onClick={() => setSelectedSeller(null)} className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-all text-white shrink-0">
                        <X size={20} />
                      </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="p-6 md:p-8 space-y-8 overflow-y-auto">
                      
                      {/* Section 1: Account, Credentials & Contact Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-3xl border border-gray-100">
                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Account & Identity</span>
                            <p className="text-base font-black uppercase text-gray-900">{selectedSeller.fullName}</p>
                            <p className="text-xs text-blue-600 font-bold uppercase mt-0.5">Shop: {selectedSeller.shopName || selectedSeller.showName}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-[10px] font-mono text-gray-500 bg-white px-2 py-1 rounded-md border border-gray-200">
                                Login Username: <strong>{selectedSeller.showName || selectedSeller.id}</strong>
                              </span>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(selectedSeller.showName || selectedSeller.id, 'Login Username')}
                                className="text-gray-400 hover:text-black p-1"
                                title="Copy Username"
                              >
                                <Copy size={12} />
                              </button>
                            </div>
                          </div>

                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Shop Front Link</span>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Link 
                                to={shopPath}
                                target="_blank"
                                className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-black text-white px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                              >
                                <span>Visit Public Shop</span>
                                <ExternalLink size={11} />
                              </Link>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(`${window.location.origin}${shopPath}`, 'Shop Link')}
                                className="bg-white hover:bg-gray-100 text-gray-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-200 transition-all flex items-center gap-1"
                              >
                                <Copy size={11} /> Copy Link
                              </button>
                            </div>
                          </div>

                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Security & Authentication</span>
                            <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-gray-200">
                              <div>
                                <p className="text-xs font-mono font-bold text-gray-500">Password: ••••••••</p>
                                <p className="text-[8px] text-gray-400 font-bold uppercase">Encrypted in Firebase • Plaintext never stored</p>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  setSellerToResetPassword(selectedSeller);
                                  setGeneratedPassword(generateSecureRandomPassword());
                                  setPasswordResetSuccess(null);
                                }}
                                className="bg-indigo-600 hover:bg-black text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all flex items-center gap-1"
                              >
                                <Key size={10} /> Reset Password
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Contact Channels</span>
                            <div className="space-y-1.5 text-xs">
                              <p className="flex items-center gap-2 font-bold text-gray-700">
                                <Mail size={13} className="text-gray-400" />
                                <a href={`mailto:${selectedSeller.email}`} className="text-blue-600 hover:underline">{selectedSeller.email}</a>
                              </p>
                              {cleanPhone && (
                                <p className="flex items-center gap-2 font-bold text-gray-700">
                                  <Phone size={13} className="text-green-600" />
                                  <a href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                                    WA: {selectedSeller.whatsapp} (Click to Chat)
                                  </a>
                                </p>
                              )}
                              <p className="flex items-center gap-2 text-gray-500 font-medium">
                                <Phone size={13} className="text-gray-400" /> Alt: {selectedSeller.contactNumber || 'N/A'}
                              </p>
                              <p className="flex items-center gap-2 text-gray-500 font-medium">
                                <MapPin size={13} className="text-gray-400" /> {selectedSeller.city}, {selectedSeller.country}
                              </p>
                            </div>
                          </div>

                          {/* Registered Payout / Bank Details */}
                          <div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Registered Payout & Bank Details</span>
                            <div className="bg-white p-4 rounded-2xl border border-gray-200">
                              <p className="text-xs font-bold text-gray-800 whitespace-pre-wrap leading-relaxed">
                                {selectedSeller.paymentDetails || 'No bank/payout details registered yet. Seller can configure this in their Seller Panel.'}
                              </p>
                              <p className="text-[8px] text-gray-400 uppercase font-black tracking-wider mt-2">
                                Used by administrators for manual payment disbursements
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Section 2: Comprehensive Financial Overview */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-gray-900">Financial Ledger & Orders</h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                              Calculated strictly from actual completed orders and verified payment records
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                          {/* Gross Sales */}
                          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Completed Sales (Gross)</span>
                            <p className="text-xl font-black text-gray-900">${overview.grossCompletedSales.toFixed(2)}</p>
                            <span className="text-[8px] text-gray-400 font-medium mt-1 block">Unpaid/cancelled excluded</span>
                          </div>

                          {/* Seller Commission */}
                          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-600 block mb-1">Seller Commission</span>
                            <p className="text-xl font-black text-emerald-600">${overview.sellerCommission.toFixed(2)}</p>
                            <span className="text-[8px] text-gray-400 font-medium mt-1 block">Rate: {overview.commissionRatePercent}% / manual credit</span>
                          </div>

                          {/* Admin Commission */}
                          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-purple-600 block mb-1">Admin Commission</span>
                            <p className="text-xl font-black text-purple-600">${overview.adminCommission.toFixed(2)}</p>
                            <span className="text-[8px] text-gray-400 font-medium mt-1 block">Platform share</span>
                          </div>

                          {/* Seller Payable Balance */}
                          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-green-700 block mb-1">Payable Balance</span>
                            <p className="text-xl font-black text-green-700">${overview.sellerPayableBalance.toFixed(2)}</p>
                            <span className="text-[8px] text-gray-400 font-medium mt-1 block">
                              {overview.isEligibleForPayout ? '✓ Eligible for Payout (≥$30)' : 'Below $30 threshold'}
                            </span>
                          </div>

                          {/* Orders Summary */}
                          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Completed Orders</span>
                            <p className="text-xl font-black text-green-600">{overview.completedOrdersCount}</p>
                            <span className="text-[8px] text-gray-400 font-medium mt-1 block">Total orders: {overview.totalOrdersCount}</span>
                          </div>

                          {/* Pending Orders */}
                          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-blue-600 block mb-1">Pending Orders</span>
                            <p className="text-xl font-black text-blue-600">{overview.pendingOrdersCount}</p>
                            <span className="text-[8px] text-gray-400 font-medium mt-1 block">In processing or shipping</span>
                          </div>

                          {/* Cancelled Orders */}
                          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-red-500 block mb-1">Cancelled Orders</span>
                            <p className="text-xl font-black text-red-500">{overview.cancelledOrdersCount}</p>
                            <span className="text-[8px] text-gray-400 font-medium mt-1 block">Refunded / rejected</span>
                          </div>

                          {/* Total Paid Out */}
                          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 block mb-1">Total Paid to Date</span>
                            <p className="text-xl font-black text-gray-900">${overview.totalPaidOut.toFixed(2)}</p>
                            <span className="text-[8px] text-gray-400 font-medium mt-1 block">Recorded disbursements</span>
                          </div>
                        </div>
                      </div>

                      {/* Section 3: Uploaded Products by this Seller */}
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="text-lg font-black uppercase tracking-tight text-gray-900">
                              Uploaded Products ({overview.sellerProducts.length})
                            </h3>
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                              Catalog items associated with Seller ID #{selectedSeller.id}
                            </p>
                          </div>
                          {overview.sellerProducts.length > 0 && (
                            <button
                              type="button"
                              onClick={() => {
                                setSellerForProducts(selectedSeller);
                                setSelectedSeller(null);
                              }}
                              className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline flex items-center gap-1"
                            >
                              <span>Manage All in Full View</span>
                              <ArrowRight size={12} />
                            </button>
                          )}
                        </div>

                        {overview.sellerProducts.length === 0 ? (
                          <div className="bg-gray-50 p-10 rounded-2xl border border-dashed border-gray-200 text-center text-gray-400">
                            <Package className="mx-auto mb-2 opacity-30" size={32} />
                            <p className="text-xs font-black uppercase tracking-wider">No products uploaded yet</p>
                          </div>
                        ) : (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-72 overflow-y-auto p-1">
                            {overview.sellerProducts.map(p => {
                              const productPath = `/product/${p.id}`;
                              const status = p.approvalStatus || 'Approved';
                              return (
                                <div key={p.id} className="bg-gray-50 p-3 rounded-2xl border border-gray-100 flex gap-3 items-center hover:border-blue-200 transition-all">
                                  <div className="w-16 h-16 rounded-xl bg-gray-200 overflow-hidden shrink-0">
                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-black uppercase text-gray-900 truncate">{p.name}</h4>
                                    <p className="text-[9px] font-black uppercase text-blue-600 tracking-wider">{p.category} • {formatPrice(p.price)}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className={`px-2 py-0.5 rounded text-[8px] font-bold ${
                                        p.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                      }`}>
                                        {p.stock > 0 ? `${p.stock} units` : 'Out of Stock'}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                                        status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                                        status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                                        'bg-red-100 text-red-800'
                                      }`}>
                                        {status}
                                      </span>
                                      <Link
                                        to={productPath}
                                        target="_blank"
                                        className="text-[9px] font-black text-blue-600 uppercase hover:underline ml-auto flex items-center gap-0.5"
                                      >
                                        <span>Link</span>
                                        <ExternalLink size={8} />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Bottom Action Footer */}
                    <div className="p-6 md:p-8 pt-4 border-t border-gray-100 flex flex-wrap gap-2 justify-between items-center bg-gray-50 shrink-0">
                      <div className="flex flex-wrap gap-2">
                        {/* Reset Password */}
                        <button
                          type="button"
                          onClick={() => {
                            setSellerToResetPassword(selectedSeller);
                            setGeneratedPassword(generateSecureRandomPassword());
                            setPasswordResetSuccess(null);
                          }}
                          className="bg-indigo-600 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                        >
                          <Key size={13} /> Reset Password
                        </button>

                        {/* Add Earnings */}
                        <button
                          type="button"
                          onClick={() => {
                            setEarningSeller(selectedSeller);
                            setEarningForm({ orderId: '', amount: '', adminNote: '', allowDuplicate: false });
                          }}
                          className="bg-emerald-600 hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm"
                        >
                          + Add Earnings
                        </button>

                        {/* Reset Balance */}
                        <button
                          type="button"
                          disabled={overview.sellerPayableBalance <= 0}
                          onClick={() => {
                            setSellerToResetBalance({ seller: selectedSeller, balance: overview.sellerPayableBalance });
                            setResetNote('');
                          }}
                          className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm ${
                            overview.sellerPayableBalance > 0
                              ? 'bg-amber-600 hover:bg-black text-white' 
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Reset Balance (${overview.sellerPayableBalance.toFixed(2)})
                        </button>

                        {/* Record Payout */}
                        <button
                          type="button"
                          disabled={!overview.isEligibleForPayout}
                          onClick={() => {
                            setPayoutSeller(selectedSeller);
                            setPayoutForm({
                              amount: overview.sellerPayableBalance.toFixed(2),
                              payoutDate: new Date().toISOString().split('T')[0],
                              paymentMethod: 'International Bank Transfer',
                              transactionReference: '',
                              adminNote: '',
                              confirmedSent: false
                            });
                          }}
                          className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-sm ${
                            overview.isEligibleForPayout 
                              ? 'bg-blue-600 hover:bg-black text-white' 
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Record Payout
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedSeller(null)}
                        className="bg-black text-white px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-gray-800 transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {activeTab === 'withdrawals' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h3 className="text-3xl font-black italic tracking-tighter uppercase">Seller <span className="text-blue-600 underline">Payouts</span></h3>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Manual Payout Records & Reversal Management</p>
              </div>
            </div>

            {/* Payout Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Paid Out</span>
                <p className="text-2xl font-black text-gray-900 mt-2">
                  ${sellerPayouts.filter(p => p.status === 'Paid').reduce((sum, p) => sum + (Number(p.amount) || 0), 0).toFixed(2)} USD
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Disbursement Records</span>
                <p className="text-2xl font-black text-blue-600 mt-2">
                  {sellerPayouts.length} Recorded
                </p>
              </div>
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Reversals</span>
                <p className="text-2xl font-black text-amber-600 mt-2">
                  {sellerPayouts.filter(p => p.status === 'Reversed').length} Corrected
                </p>
              </div>
            </div>

            {/* Payout Table */}
            <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-[10px] font-black uppercase tracking-widest text-gray-400">
                      <th className="px-6 md:px-10 py-6">Date</th>
                      <th className="px-6 md:px-10 py-6">Seller Details</th>
                      <th className="px-6 md:px-10 py-6">Amount</th>
                      <th className="px-6 md:px-10 py-6">Payment Method</th>
                      <th className="px-6 md:px-10 py-6">Reference / Note</th>
                      <th className="px-6 md:px-10 py-6">Status</th>
                      <th className="px-6 md:px-10 py-6 text-right pr-12">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-xs">
                    {sellerPayouts.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-10 py-16 text-center text-gray-400">
                          <p className="text-xs font-black uppercase tracking-widest">No seller payout records yet.</p>
                          <p className="text-[10px] font-medium text-gray-400 mt-1">Payouts are manually recorded via the Seller Management tab when a seller's available balance is at least $30.00 USD.</p>
                        </td>
                      </tr>
                    ) : (
                      sellerPayouts.map(p => {
                        const sellerObj = sellers.find(s => s.id === p.sellerId);
                        return (
                          <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 md:px-10 py-6 font-bold text-gray-500 whitespace-nowrap">
                              {p.payoutDate || new Date(p.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-6 md:px-10 py-6">
                              <div className="flex flex-col">
                                <span className="font-black text-gray-900 uppercase">{p.sellerName || sellerObj?.shopName || 'Seller'}</span>
                                <span className="text-[9px] text-gray-400 uppercase tracking-wider font-mono">UID: {p.sellerId}</span>
                              </div>
                            </td>
                            <td className="px-6 md:px-10 py-6 font-black text-sm text-gray-900 whitespace-nowrap">
                              ${p.amount.toFixed(2)} USD
                            </td>
                            <td className="px-6 md:px-10 py-6 font-bold text-gray-700">
                              {p.paymentMethod}
                            </td>
                            <td className="px-6 md:px-10 py-6">
                              <div className="flex flex-col max-w-[200px]">
                                {p.transactionReference && (
                                  <span className="font-mono text-[10px] text-blue-600 truncate">Ref: {p.transactionReference}</span>
                                )}
                                {p.adminNote && (
                                  <span className="text-[10px] text-gray-500 truncate">{p.adminNote}</span>
                                )}
                                {p.reversalReason && (
                                  <span className="text-[9px] text-red-500 font-bold truncate">Reversed: {p.reversalReason}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-6 md:px-10 py-6 whitespace-nowrap">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                p.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                            <td className="px-6 md:px-10 py-6 text-right pr-6 md:pr-12">
                              {p.status === 'Paid' ? (
                                <button 
                                  onClick={() => {
                                    setPayoutToReverse(p);
                                    setReversalReason('');
                                  }}
                                  className="bg-amber-50 text-amber-700 hover:bg-amber-600 hover:text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all"
                                  title="Reverse this payout entry and restore seller balance"
                                >
                                  Reverse
                                </button>
                              ) : (
                                <span className="text-[9px] text-gray-400 uppercase font-black">Restored</span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
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

      {/* Modals & Dialogs */}

      {/* Toast Alert */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[300] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-white text-xs font-black uppercase tracking-wider animate-slideUp ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Complete Order Confirmation Modal */}
      {orderToComplete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden p-8 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>
              <button onClick={() => setOrderToComplete(null)} className="p-2 text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-2">
              Confirm Order <span className="text-green-600">Completion</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
              Marking Order <strong className="text-gray-900 font-black">#{orderToComplete.id.slice(-6)}</strong> ({formatPrice(orderToComplete.amount)}) for customer <strong className="text-gray-900">{orderToComplete.customerName}</strong> as Completed.
            </p>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-amber-800 text-[11px] font-bold leading-relaxed mb-6">
              ⚠️ <strong className="font-black">Notice:</strong> Marking this order as Completed verifies customer payment and fulfillment. This will synchronize with both Admin and Seller panels. It will <strong className="underline">not</strong> automatically create a seller payout.
            </div>

            <div className="flex gap-3">
              <button
                disabled={updatingOrderId === orderToComplete.id}
                onClick={() => handleConfirmCompletion(orderToComplete)}
                className="flex-1 bg-green-600 hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-600/20 disabled:opacity-50"
              >
                {updatingOrderId === orderToComplete.id ? 'Updating...' : 'Confirm Completed'}
              </button>
              <button
                onClick={() => setOrderToComplete(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Order Confirmation Modal */}
      {orderToCancel && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden p-8 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <AlertCircle size={28} />
              </div>
              <button onClick={() => setOrderToCancel(null)} className="p-2 text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-2">
              Confirm Order <span className="text-red-600">Cancellation</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
              Are you sure you want to cancel Order <strong className="text-gray-900 font-black">#{orderToCancel.id.slice(-6)}</strong> for customer <strong className="text-gray-900">{orderToCancel.customerName}</strong>? Status will be updated to Cancelled and synchronized immediately across all panels.
            </p>

            <div className="flex gap-3">
              <button
                disabled={updatingOrderId === orderToCancel.id}
                onClick={() => handleConfirmCancellation(orderToCancel)}
                className="flex-1 bg-red-600 hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-red-600/20 disabled:opacity-50"
              >
                {updatingOrderId === orderToCancel.id ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
              <button
                onClick={() => setOrderToCancel(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Keep Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete / Archive Order Modal */}
      {orderToDelete && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden p-8 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
                <Trash2 size={28} />
              </div>
              <button onClick={() => setOrderToDelete(null)} className="p-2 text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-2">
              Order History <span className="text-red-600">Protection</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
              Order <strong className="text-gray-900 font-black">#{orderToDelete.id.slice(-6)}</strong> has been cancelled. To preserve transactional audit history, we recommend safe archival instead of permanent destruction.
            </p>

            <div className="space-y-3">
              <button
                disabled={updatingOrderId === orderToDelete.id}
                onClick={() => handleConfirmArchive(orderToDelete)}
                className="w-full bg-blue-600 hover:bg-black text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md"
              >
                Safe Archive (Recommended)
              </button>
              <button
                disabled={updatingOrderId === orderToDelete.id}
                onClick={() => handleConfirmDelete(orderToDelete)}
                className="w-full bg-red-600 hover:bg-black text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-md"
              >
                Permanent Delete
              </button>
              <button
                onClick={() => setOrderToDelete(null)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Manual Seller Earnings Modal */}
      {earningSeller && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full overflow-hidden p-8 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <DollarSign size={28} />
              </div>
              <button onClick={() => setEarningSeller(null)} className="p-2 text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-1">
              Add Seller <span className="text-emerald-600">Earnings</span>
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
              Manual Administrator Financial Credit
            </p>

            <form onSubmit={handleSaveEarnings} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs">
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">Seller Name</span>
                  <p className="font-black text-gray-900 truncate mt-0.5">{earningSeller.shopName || earningSeller.fullName}</p>
                </div>
                <div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">Seller ID</span>
                  <p className="font-mono text-gray-700 truncate mt-0.5">{earningSeller.id}</p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Related Order ID</label>
                <input
                  required
                  placeholder="e.g. sale_123 or select from list"
                  className="w-full bg-gray-50 border p-3 rounded-xl font-mono text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  value={earningForm.orderId}
                  onChange={(e) => setEarningForm({ ...earningForm, orderId: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Earnings Amount in USD ($)</label>
                <input
                  required
                  type="number"
                  step="0.01"
                  min="0.01"
                  placeholder="0.00"
                  className="w-full bg-gray-50 border p-3 rounded-xl font-black text-base outline-none focus:ring-2 focus:ring-emerald-500 text-emerald-600"
                  value={earningForm.amount}
                  onChange={(e) => setEarningForm({ ...earningForm, amount: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Optional Admin Note</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Confirmed completed order payment & fulfillment"
                  className="w-full bg-gray-50 border p-3 rounded-xl font-medium text-xs outline-none focus:ring-2 focus:ring-emerald-500"
                  value={earningForm.adminNote}
                  onChange={(e) => setEarningForm({ ...earningForm, adminNote: e.target.value })}
                />
              </div>

              {/* Duplicate check warning */}
              {earningForm.orderId && sellerEarnings.some(e => e.sellerId === earningSeller.id && e.orderId.toLowerCase() === earningForm.orderId.trim().toLowerCase()) && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
                  <p className="text-[10px] font-bold text-amber-800">
                    ⚠️ An earnings entry already exists for Order #{earningForm.orderId.trim()}.
                  </p>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                    <input
                      type="checkbox"
                      checked={earningForm.allowDuplicate}
                      onChange={(e) => setEarningForm({ ...earningForm, allowDuplicate: e.target.checked })}
                      className="rounded"
                    />
                    <span>I confirm this authorized financial adjustment/correction</span>
                  </label>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={earningLoading}
                  className="flex-1 bg-emerald-600 hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20 disabled:opacity-50"
                >
                  {earningLoading ? 'Saving Entry...' : 'Save Earnings Entry'}
                </button>
                <button
                  type="button"
                  onClick={() => setEarningSeller(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Seller Payout Modal */}
      {payoutSeller && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full overflow-hidden p-8 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CreditCard size={28} />
              </div>
              <button onClick={() => setPayoutSeller(null)} className="p-2 text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-1">
              Record Seller <span className="text-blue-600">Payout</span>
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
              Manual Administrative Disbursement Record
            </p>

            {(() => {
              const fin = getSellerFinancials(payoutSeller.id);
              return (
                <form onSubmit={handleSavePayout} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100 text-xs">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">Seller Name</span>
                      <p className="font-black text-gray-900 truncate mt-0.5">{payoutSeller.shopName || payoutSeller.fullName}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-wider text-gray-400">Available Balance</span>
                      <p className="font-black text-green-600 text-sm mt-0.5">${fin.availableBalance.toFixed(2)} USD</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-blue-900 text-[11px] font-bold">
                    ℹ️ <strong className="font-black">Policy Notice:</strong> Minimum payout threshold is $30.00 USD. Ensure funds have been transferred to the seller's registered account.
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Payout Amount ($ USD)</label>
                      <input
                        required
                        type="number"
                        step="0.01"
                        min="0.01"
                        max={fin.availableBalance}
                        className="w-full bg-gray-50 border p-3 rounded-xl font-black text-base outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                        value={payoutForm.amount}
                        onChange={(e) => setPayoutForm({ ...payoutForm, amount: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Payout Date</label>
                      <input
                        required
                        type="date"
                        className="w-full bg-gray-50 border p-3 rounded-xl font-bold text-xs outline-none focus:ring-2 focus:ring-blue-500"
                        value={payoutForm.payoutDate}
                        onChange={(e) => setPayoutForm({ ...payoutForm, payoutDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Payment Method</label>
                      <select
                        className="w-full bg-gray-50 border p-3 rounded-xl font-bold text-xs outline-none focus:ring-2 focus:ring-blue-500"
                        value={payoutForm.paymentMethod}
                        onChange={(e) => setPayoutForm({ ...payoutForm, paymentMethod: e.target.value })}
                      >
                        <option value="International Bank Transfer">Bank Transfer (Wire / IBAN)</option>
                        <option value="PayPal">PayPal</option>
                        <option value="JazzCash">JazzCash</option>
                        <option value="EasyPaisa">EasyPaisa</option>
                        <option value="Wise">Wise</option>
                        <option value="Cash / Manual">Cash / Manual</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Transaction Reference / ID</label>
                      <input
                        placeholder="e.g. TXN9988224"
                        className="w-full bg-gray-50 border p-3 rounded-xl font-mono text-xs outline-none focus:ring-2 focus:ring-blue-500"
                        value={payoutForm.transactionReference}
                        onChange={(e) => setPayoutForm({ ...payoutForm, transactionReference: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Optional Admin Note</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Monthly payout disbursement"
                      className="w-full bg-gray-50 border p-3 rounded-xl font-medium text-xs outline-none focus:ring-2 focus:ring-blue-500"
                      value={payoutForm.adminNote}
                      onChange={(e) => setPayoutForm({ ...payoutForm, adminNote: e.target.value })}
                    />
                  </div>

                  <div className="pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-800">
                      <input
                        type="checkbox"
                        checked={payoutForm.confirmedSent}
                        onChange={(e) => setPayoutForm({ ...payoutForm, confirmedSent: e.target.checked })}
                        className="rounded"
                      />
                      <span>I confirm that this payment has been sent to the seller's account.</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={payoutLoading || !payoutForm.confirmedSent}
                      className="flex-1 bg-blue-600 hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                    >
                      {payoutLoading ? 'Recording Payout...' : 'Confirm & Record Payout'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setPayoutSeller(null)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              );
            })()}
          </div>
        </div>
      )}

      {/* Payout Reversal Modal */}
      {payoutToReverse && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden p-8 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertCircle size={28} />
              </div>
              <button onClick={() => setPayoutToReverse(null)} className="p-2 text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>
            
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-1">
              Reverse Payout <span className="text-amber-600">Entry</span>
            </h3>
            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">
              Reversing this payout of <strong className="text-gray-900 font-black">${payoutToReverse.amount.toFixed(2)} USD</strong> will restore the seller's available balance and record an authorized audit note.
            </p>

            <form onSubmit={handleReversePayout} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Reason for Reversal</label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. Accidental payout entry, wrong bank account, or payment returned by bank"
                  className="w-full bg-gray-50 border p-3 rounded-xl font-medium text-xs outline-none focus:ring-2 focus:ring-amber-500"
                  value={reversalReason}
                  onChange={(e) => setReversalReason(e.target.value)}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={reversalLoading}
                  className="flex-1 bg-amber-600 hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-600/20 disabled:opacity-50"
                >
                  {reversalLoading ? 'Reversing...' : 'Confirm Reversal'}
                </button>
                <button
                  type="button"
                  onClick={() => setPayoutToReverse(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reset Available Balance to $0 Confirmation Modal */}
      {sellerToResetBalance && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden p-8 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <DollarSign size={28} />
              </div>
              <button onClick={() => setSellerToResetBalance(null)} className="p-2 text-gray-400 hover:text-black">
                <X size={20} />
              </button>
            </div>

            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-2">
              Reset Available <span className="text-amber-600">Balance</span>
            </h3>
            
            <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">
              You are about to reset the Available Balance for <strong className="text-gray-900 font-black">{sellerToResetBalance.seller.shopName || sellerToResetBalance.seller.fullName}</strong> after manual payment.
            </p>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-4 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase font-black text-[9px] tracking-wider">Current Available Balance:</span>
                <span className="text-amber-600 font-black text-base">${sellerToResetBalance.balance.toFixed(2)} USD</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400 uppercase font-black text-[9px] tracking-wider">New Available Balance:</span>
                <span className="text-green-600 font-black text-base">$0.00 USD</span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 text-blue-900 text-[11px] font-bold leading-relaxed mb-5 space-y-1">
              <p className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-blue-600 shrink-0" /> Total Earnings and all previous earnings records remain unchanged.</p>
              <p className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-blue-600 shrink-0" /> A payout of <strong>${sellerToResetBalance.balance.toFixed(2)} USD</strong> is saved to Payout History.</p>
              <p className="flex items-center gap-1.5"><CheckCircle2 size={13} className="text-blue-600 shrink-0" /> Available Balance updates to $0.00 immediately in Firebase and Seller Panel.</p>
            </div>

            <div className="mb-6 space-y-1">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">Payment Method / Note (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Paid via Bank Transfer / EasyPaisa / JazzCash / Cash"
                className="w-full bg-gray-50 border p-3 rounded-xl font-bold text-xs outline-none focus:ring-2 focus:ring-amber-500"
                value={resetNote}
                onChange={(e) => setResetNote(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button
                disabled={resetLoading}
                onClick={handleConfirmResetBalance}
                className="flex-1 bg-amber-600 hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-600/20 disabled:opacity-50"
              >
                {resetLoading ? 'Resetting Balance...' : 'Confirm & Reset to $0'}
              </button>
              <button
                type="button"
                onClick={() => setSellerToResetBalance(null)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Seller Password Modal */}
      {sellerToResetPassword && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden p-8 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Key size={26} />
              </div>
              <button 
                onClick={() => {
                  setSellerToResetPassword(null);
                  setGeneratedPassword('');
                }} 
                className="p-2 text-gray-400 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-1">
              Reset Seller <span className="text-indigo-600">Password</span>
            </h3>
            
            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-5">
              Generate or set a new password for <strong className="text-gray-900 font-bold">{sellerToResetPassword.fullName}</strong> ({sellerToResetPassword.shopName || 'Shop'}). Stored password hashes remain protected and are never exposed.
            </p>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 mb-5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-400 font-black text-[10px] uppercase tracking-wider">Seller ID:</span>
                <span className="font-mono font-bold text-gray-800">{sellerToResetPassword.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-black text-[10px] uppercase tracking-wider">Login Username:</span>
                <span className="font-mono font-bold text-gray-800">{sellerToResetPassword.showName || sellerToResetPassword.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 font-black text-[10px] uppercase tracking-wider">WhatsApp:</span>
                <span className="font-medium text-gray-800">{sellerToResetPassword.whatsapp || sellerToResetPassword.contactNumber || 'Not provided'}</span>
              </div>
            </div>

            <form onSubmit={handleResetSellerPassword} className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black uppercase text-gray-500 tracking-wider">New Password</label>
                  <button
                    type="button"
                    onClick={() => setGeneratedPassword(generateSecureRandomPassword())}
                    className="text-[10px] font-black uppercase tracking-wider text-indigo-600 hover:text-indigo-800 underline font-bold"
                  >
                    Generate Strong Password
                  </button>
                </div>
                <div className="relative">
                  <input
                    required
                    type="text"
                    placeholder="Enter or generate new password"
                    value={generatedPassword}
                    onChange={(e) => setGeneratedPassword(e.target.value)}
                    className="w-full bg-gray-50 border p-3.5 pr-10 rounded-xl font-mono text-sm font-bold text-gray-900 outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-amber-900 text-[11px] font-medium leading-relaxed">
                ℹ️ After saving, you will be given an instant link to deliver the new login credentials directly to the seller via WhatsApp or copy them safely.
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={passwordResetLoading || !generatedPassword.trim()}
                  className="flex-1 bg-indigo-600 hover:bg-black text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                >
                  {passwordResetLoading ? 'Updating Password...' : 'Save & Prepare Delivery'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSellerToResetPassword(null);
                    setGeneratedPassword('');
                  }}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Reset Success / WhatsApp Delivery Modal */}
      {passwordResetSuccess && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[260] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-lg w-full overflow-hidden p-8 animate-scaleIn">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                <CheckCircle2 size={28} />
              </div>
              <button 
                onClick={() => {
                  setPasswordResetSuccess(null);
                  setCopiedCredentials(false);
                }} 
                className="p-2 text-gray-400 hover:text-black"
              >
                <X size={20} />
              </button>
            </div>

            <h3 className="text-2xl font-black italic uppercase tracking-tight text-gray-900 mb-1">
              Password <span className="text-green-600">Updated</span>
            </h3>
            
            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-5">
              The login password for <strong className="text-gray-900 font-bold">{passwordResetSuccess.seller.fullName}</strong> has been updated securely. Deliver the new credentials to the seller:
            </p>

            <div className="bg-gray-900 text-white p-5 rounded-2xl font-mono text-xs space-y-2.5 mb-5 relative group">
              <div className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">Portal Login Credentials</div>
              <div><span className="text-gray-400">Portal:</span> <span className="text-blue-300 underline">{window.location.origin}/seller-login</span></div>
              <div><span className="text-gray-400">Username:</span> <span className="text-amber-400 font-bold">{passwordResetSuccess.seller.showName || passwordResetSuccess.seller.id}</span></div>
              <div><span className="text-gray-400">Seller ID:</span> <span className="text-gray-300">{passwordResetSuccess.seller.id}</span></div>
              <div><span className="text-gray-400">New Password:</span> <span className="text-green-400 font-bold">{passwordResetSuccess.newPass}</span></div>
            </div>

            <div className="space-y-3">
              {(passwordResetSuccess.seller.whatsapp || passwordResetSuccess.seller.contactNumber) && (
                <a
                  href={getWhatsAppCredentialsUrl(passwordResetSuccess.seller, passwordResetSuccess.newPass)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20"
                >
                  <MessageCircle size={18} />
                  Send Credentials via WhatsApp
                </a>
              )}

              <button
                type="button"
                onClick={() => {
                  const creds = `W-LORD Market Seller Login:\nPortal: ${window.location.origin}/seller-login\nUsername: ${passwordResetSuccess.seller.showName || passwordResetSuccess.seller.id}\nPassword: ${passwordResetSuccess.newPass}`;
                  copyToClipboard(creds, 'Credentials');
                  setCopiedCredentials(true);
                  setTimeout(() => setCopiedCredentials(false), 3000);
                }}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
              >
                {copiedCredentials ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                {copiedCredentials ? 'Copied to Clipboard!' : 'Copy Credentials to Clipboard'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setPasswordResetSuccess(null);
                  setCopiedCredentials(false);
                }}
                className="w-full bg-gray-900 hover:bg-black text-white py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Done / Close
              </button>
            </div>
            
            <p className="text-[10px] text-gray-400 text-center font-bold uppercase tracking-wider mt-4">
              🔒 For security, this password will not be shown again once closed.
            </p>
          </div>
        </div>
      )}

      {/* Seller Uploaded Products Modal */}
      {sellerForProducts && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[250] flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-scaleIn">
            <div className="bg-gray-900 text-white p-6 md:p-8 flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-amber-400">
                  <Package size={24} />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black italic uppercase tracking-tight">
                    {sellerForProducts.shopName || sellerForProducts.fullName} <span className="text-amber-400">Products</span>
                  </h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mt-0.5">
                    Seller ID: {sellerForProducts.id} &bull; Total Products: {products.filter(p => p.sellerId === sellerForProducts.id || p.sellerId === sellerForProducts.showName).length}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSellerForProducts(null)} 
                className="bg-white/10 p-2.5 rounded-full hover:bg-white/20 transition-all text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-4">
              {(() => {
                const sellerProds = products.filter(p => p.sellerId === sellerForProducts.id || p.sellerId === sellerForProducts.showName);
                if (sellerProds.length === 0) {
                  return (
                    <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                      <ShoppingBag size={48} className="mx-auto text-gray-300 mb-3" />
                      <h4 className="text-base font-black uppercase text-gray-700 tracking-tight">No Products Found</h4>
                      <p className="text-xs text-gray-400 font-medium mt-1">This seller has not uploaded any products yet.</p>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {sellerProds.map(prod => {
                      const approval = prod.approvalStatus || 'Approved';
                      const isUpdating = productStatusUpdatingId === prod.id;
                      return (
                        <div key={prod.id} className="bg-gray-50 border border-gray-200 rounded-2xl p-4 flex gap-4 hover:border-black transition-all">
                          <img 
                            src={prod.image} 
                            alt={prod.name} 
                            className="w-20 h-20 rounded-xl object-cover shrink-0 bg-white border border-gray-100" 
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <div className="flex items-start justify-between gap-2">
                                <h5 className="font-black text-xs text-gray-900 truncate" title={prod.name}>{prod.name}</h5>
                                <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                                  approval === 'Approved' ? 'bg-green-100 text-green-700' :
                                  approval === 'Rejected' ? 'bg-red-100 text-red-700' :
                                  'bg-amber-100 text-amber-700'
                                }`}>
                                  {approval}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-black text-xs text-blue-600">${prod.price.toFixed(2)}</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase">&bull; {prod.category}</span>
                                <span className="text-[10px] text-gray-400 font-bold uppercase">&bull; Stock: {prod.stock !== undefined ? prod.stock : 'N/A'}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-2 pt-2 border-t border-gray-200 mt-2">
                              <Link
                                to={`/product/${prod.id}`}
                                target="_blank"
                                className="text-[10px] font-black uppercase tracking-wider text-blue-600 hover:text-black flex items-center gap-1"
                              >
                                View Live <ExternalLink size={10} />
                              </Link>

                              <div className="flex items-center gap-1">
                                <select
                                  disabled={isUpdating}
                                  value={approval}
                                  onChange={(e) => handleToggleProductApproval(prod, e.target.value as any)}
                                  className="text-[10px] font-bold bg-white border rounded-lg px-2 py-1 outline-none text-gray-800 disabled:opacity-50"
                                >
                                  <option value="Approved">Approved</option>
                                  <option value="Pending">Pending</option>
                                  <option value="Rejected">Rejected</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })()}
            </div>

            <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => setSellerForProducts(null)}
                className="bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Admin;
