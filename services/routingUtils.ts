
/**
 * Utility to handle link generation and show detection.
 * Supports clean path-based identification (e.g., domain.com/showname).
 */

const RESERVED_NAMES = [
  'products', 'ai-designer', 'contact', 'admin', 'cart', 'register-show', 'checkout', 'sport-store'
];

export const getEnvironmentMode = () => {
  try {
    const hostname = window.location.hostname;
    if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) return 'development';
    if (hostname.includes('preview') || window.location.search.includes('mode=preview')) return 'preview';
    return 'production';
  } catch (e) {
    return 'production';
  }
};

export const detectShowName = () => {
  try {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;
    const hash = window.location.hash;
    
    // 1. Check Hash first (for HashRouter support)
    if (hash && hash.startsWith('#/')) {
      const hashSegments = hash.substring(2).split('/').filter(Boolean);
      if (hashSegments.length > 0) {
        const firstSegment = hashSegments[0].toLowerCase();
        if (!RESERVED_NAMES.includes(firstSegment)) {
          return firstSegment;
        }
      }
    }

    // 2. Check the first path segment (e.g., /arslan/products -> arslan)
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const firstSegment = pathSegments[0].toLowerCase();
      if (!RESERVED_NAMES.includes(firstSegment)) {
        return firstSegment;
      }
    }

    // 2. Fallback: Check for subdomains
    const parts = hostname.split('.');
    if (parts.length > 2) {
      const subdomain = parts[0].toLowerCase();
      const ignored = ['www', 'preview', 'dev', 'api', 'app', 'github', 'vercel', 'world-market-shop'];
      if (!ignored.includes(subdomain)) {
        return subdomain;
      }
    }
  } catch (e) {
    console.error("Show detection failed", e);
  }
  return null;
};

export const generateProfessionalLink = (showName: string) => {
  try {
    const cleanName = showName.toLowerCase().trim().replace(/\s+/g, '-');
    const hostname = window.location.hostname;
    const protocol = window.location.protocol;
    const port = window.location.port ? `:${window.location.port}` : '';
    
    // Generates the exact clean format requested: https://world-market-shop.vercel.app/#/arslan
    return `${protocol}//${hostname}${port}/#/${cleanName}`;
  } catch (e) {
    return `/${showName}`;
  }
};

/**
 * Generates the most direct WhatsApp link.
 * On mobile (Android/iOS), it uses the custom deep link scheme "whatsapp://" to open the installed app directly without any intermediate pages.
 * On desktop, it falls back to the official API web link.
 */
export const getWhatsAppLink = (phone: string, text: string) => {
  const cleanPhone = phone.replace(/[^\d]/g, '');
  const encodedText = encodeURIComponent(text);
  
  // Detect mobile devices (Android, iOS)
  const isMobile = typeof navigator !== 'undefined' && 
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
  if (isMobile) {
    // Return direct deep link scheme to launch the WhatsApp mobile application directly
    return `whatsapp://send?phone=${cleanPhone}&text=${encodedText}`;
  } else {
    // Desktop fallback link
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodedText}`;
  }
};
