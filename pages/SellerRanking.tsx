import React from 'react';
import { useStore } from '../context/StoreContext';
import { Award, CheckCircle, TrendingUp, ShieldCheck, Star, Zap, ShoppingBag, MessageCircle } from 'lucide-react';

const SellerRanking: React.FC = () => {
  const { language } = useStore();

  const RankCard = ({ rank, color, icon: Icon, requirements, benefits }: any) => (
    <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5 flex flex-col h-full hover:-translate-y-2 transition-all duration-500">
      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-10 ${color}`}>
        <Icon size={40} />
      </div>
      <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-8 leading-none">
        {rank} <span className="text-blue-600 underline">Seller</span>
      </h3>
      
      <div className="space-y-8 flex-grow">
        <div>
          <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Requirements</h4>
          <ul className="space-y-3">
            {requirements.map((req: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-600">
                <CheckCircle size={14} className="text-blue-600" />
                {req}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="pt-8 border-t border-gray-50">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4">Exclusive Benefits</h4>
          <ul className="space-y-3">
            {benefits.map((ben: string, i: number) => (
              <li key={i} className="flex items-center gap-3 text-sm font-bold text-gray-900">
                <Zap size={14} className="text-yellow-500 fill-yellow-500" />
                {ben}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <button className={`w-full mt-12 py-5 rounded-2xl font-black uppercase tracking-widest transition-all ${rank === 'Gold' ? 'bg-gray-900 text-white hover:bg-blue-600' : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white'}`}>
        Learn More
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full border border-blue-600/30 mb-8">
            <Award size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Seller Excellence Program</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
            Grow Your <span className="text-blue-500 underline">Business</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Our tiered ranking system rewards high-performing sellers with increased visibility, lower fees, and premium support.
          </p>
        </div>
      </div>

      {/* Ranks Grid */}
      <div className="max-w-7xl mx-auto px-4 -mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          <RankCard 
            rank="Standard"
            color="bg-blue-50 text-blue-600"
            icon={ShoppingBag}
            requirements={[
              "Basic Seller Account",
              "Verified Email & Phone",
              "Complete Business Profile",
              "Active Product Listings"
            ]}
            benefits={[
              "Global Marketplace Access",
              "Basic Seller Dashboard",
              "Standard Support",
              "3% Commission Rate"
            ]}
          />
          <RankCard 
            rank="Silver"
            color="bg-gray-100 text-gray-600"
            icon={ShieldCheck}
            requirements={[
              "Minimum 100 Successful Orders",
              "4.0+ Average Rating",
              "Verified Seller Status",
              "90% Response Rate"
            ]}
            benefits={[
              "Silver Badge on Profile",
              "Priority Search Listing",
              "24/7 Priority Support",
              "4% Commission Rate"
            ]}
          />
          <RankCard 
            rank="Gold"
            color="bg-yellow-50 text-yellow-600"
            icon={Award}
            requirements={[
              "Minimum 200 Successful Orders",
              "4.5+ Average Rating",
              "Verified Business Entity",
              "98% Response Rate"
            ]}
            benefits={[
              "Gold Badge & Verification",
              "Top-Tier Search Placement",
              "Dedicated Account Manager",
              "8-8.5% Commission Rate"
            ]}
          />
        </div>
      </div>

      {/* Metrics Section */}
      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="bg-white p-12 md:p-20 rounded-[4rem] border border-gray-100 shadow-2xl shadow-blue-600/5">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-8 leading-none">
                How We Calculate <span className="text-blue-600 underline">Rankings</span>
              </h2>
              <p className="text-gray-500 font-medium leading-relaxed mb-12">
                Our algorithm evaluates seller performance every 30 days based on key metrics to ensure a high-quality experience for all customers.
              </p>
              
              <div className="space-y-8">
                {[
                  { title: "Order Fulfillment", desc: "Percentage of orders shipped within 48 hours", icon: TrendingUp },
                  { title: "Customer Satisfaction", desc: "Average rating and review sentiment analysis", icon: Star },
                  { title: "Response Time", desc: "Average time taken to respond to customer inquiries", icon: MessageCircle },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black uppercase tracking-tighter text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-blue-600 rounded-[4rem] overflow-hidden shadow-2xl shadow-blue-600/20">
                <img 
                  src="https://picsum.photos/seed/success/800/800" 
                  alt="Success" 
                  className="w-full h-full object-cover mix-blend-overlay opacity-50"
                />
                <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                  <p className="text-4xl font-black italic uppercase tracking-tighter mb-4">Join the top 1% of global sellers.</p>
                  <p className="text-sm font-bold uppercase tracking-widest opacity-80">Start your journey today and unlock premium benefits.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRanking;
