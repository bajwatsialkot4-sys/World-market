
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'CAD' | 'AUD' | 'PKR';
export type LanguageCode = 'en' | 'ar' | 'fr' | 'es' | 'de';
export type SellerRank = 'Platinium' | 'Diamond' | 'Gold' | 'Silver' | 'Standard';
export type VerificationStatus = 'Pending' | 'Verified' | 'Rejected';
export type BusinessType = 'Individual' | 'Business' | 'Enterprise';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // Rate relative to USD
  name: string;
}

export interface Language {
  code: LanguageCode;
  name: string;
  flag: string;
  dir: 'ltr' | 'rtl';
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
  country?: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  images?: string[];
  price: number;
  oldPrice?: number;
  discount?: number;
  offer?: string;
  rating: number;
  stock: number;
  datePosted: string;
  fabric?: string;
  quality?: 'Standard' | 'Premium' | 'Export Quality';
  sizes?: string[];
  colors?: string[];
  reviews?: Review[];
  shippingCountry?: string;
  sellerId?: string;
  sales?: number;
  viewers?: number;
  saleEndsAt?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  imageAlt?: string;
  badges?: string[];
  tags?: string[];
  ratingCount?: number;
  ratingBreakdown?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface SaleRecord {
  id: string;
  products: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    color?: string;
  }[];
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  customerAddress: string;
  customerCity: string;
  customerCountry: string;
  customerZip: string;
  amount: number;
  date: string;
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Pending Payment' | 'Confirmed' | 'Cancelled' | 'Completed';
  sellerId?: string;
  sellerShopName?: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  location: string;
  totalSpent: number;
  orderCount: number;
  lastOrderDate: string;
}

export interface SellerInfo {
  id: string;
  fullName: string;
  whatsapp: string;
  email: string;
  password?: string;
  country: string;
  city: string;
  location?: string;
  contactNumber: string;
  paymentDetails: string;
  showName: string;
  shopName?: string;
  rank: SellerRank;
  rating: number;
  totalSales: number;
  responseTime: string;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  businessType: BusinessType;
  joinedDate: string;
}

export interface AppNotification {
  id: string;
  type: 'New Order' | 'New Seller' | 'Payment Request' | 'Stock Alert';
  title: string;
  message: string;
  targetId?: string;
  targetRole: 'admin' | 'seller';
  sellerId?: string;
  isRead: boolean;
  timestamp: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  date: string;
  author: string;
  tags: string[];
}
