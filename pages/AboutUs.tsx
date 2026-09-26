import React from 'react';
import { useStore } from '../context/StoreContext';
import { useTranslation } from '../src/translations';
import { Globe, Factory, ShieldCheck, TrendingUp, Users, Award } from 'lucide-react';

const AboutUs: React.FC = () => {
  const { language } = useStore();
  const { t } = useTranslation(language.code);

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse" />
        <div className="max-w-4xl mx-auto text-center relative">
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter mb-8 leading-none">
            Global <span className="text-blue-500 underline">Marketplace</span> Vision
          </h1>
          <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-2xl mx-auto">
            Connecting the world directly to the source. Factory-direct pricing, worldwide operations, and a commitment to quality.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} />
              Our Mission
            </div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter leading-none">
              Eliminating the <span className="text-blue-600 underline">Middleman</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              W-LORD MARKET was founded on a simple principle: high-quality products should be accessible to everyone, regardless of location. By partnering directly with manufacturers, we eliminate unnecessary markups and deliver value directly to your doorstep.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8">
              <div>
                <p className="text-4xl font-black tracking-tighter text-gray-900 mb-1">150+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Countries Served</p>
              </div>
              <div>
                <p className="text-4xl font-black tracking-tighter text-gray-900 mb-1">500+</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Verified Factories</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gray-100 rounded-[4rem] overflow-hidden shadow-2xl shadow-blue-600/10">
              <img src="https://picsum.photos/seed/factory/800/800" alt="Factory Direct" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-12 -left-12 bg-white p-10 rounded-[3rem] shadow-2xl shadow-blue-600/10 border border-gray-100 max-w-xs">
              <Factory className="text-blue-600 mb-4" size={32} />
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Factory Direct</h4>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">We source directly from the manufacturing floor to ensure the best price and quality control.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-gray-50 py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">Core <span className="text-blue-600 underline">Values</span></h2>
            <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">What drives us every day</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Globe, title: 'Global Reach', desc: 'Breaking down borders to bring the world closer together through commerce.' },
              { icon: Users, title: 'Community First', desc: 'Empowering sellers and providing exceptional value to every customer.' },
              { icon: Award, title: 'Quality Assured', desc: 'Rigorous inspection processes for every product on our marketplace.' },
            ].map((value, i) => (
              <div key={i} className="bg-white p-12 rounded-[4rem] shadow-2xl shadow-blue-600/5 border border-gray-100 group hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <value.icon size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm font-bold leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
