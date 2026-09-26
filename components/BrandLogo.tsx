
import React from 'react';
import { motion } from 'motion/react';

interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ className = "", showTagline = true }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Icon: New Image Logo */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative w-12 h-12 md:w-14 md:h-14 flex-shrink-0"
      >
        <img 
          src="https://res.cloudinary.com/dc0ytviey/image/upload/v1775930088/IMG-20260410-WA0022_lbw18d.jpg" 
          alt="W-LORD MARKET Logo" 
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl md:text-3xl font-black italic tracking-tighter text-white">W-</span>
          <span className="text-3xl md:text-4xl font-black italic tracking-tighter text-[#fbbf24] drop-shadow-sm">LORD</span>
        </div>
        {showTagline && (
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#94a3b8] uppercase mt-1">
            MARKET
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandLogo;
