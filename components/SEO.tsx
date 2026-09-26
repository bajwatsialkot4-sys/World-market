import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  article?: boolean;
  keywords?: string[];
  author?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({ 
  title, 
  description, 
  image, 
  article, 
  keywords,
  author,
  canonical
}) => {
  const { pathname } = useLocation();
  
  const siteName = 'W-LORD MARKET';
  const defaultTitle = 'W-LORD MARKET | Global Sportswear Manufacturer';
  const defaultDescription = 'W-LORD MARKET is a premier international sports uniform manufacturing company from Sialkot, delivering high-end athletic apparel worldwide.';
  const defaultImage = 'https://picsum.photos/seed/worldmarket/1200/630';
  const siteUrl = 'https://worldmarket.shop'; // Placeholder for actual URL

  const seo = {
    title: title ? `${title} | ${siteName}` : defaultTitle,
    description: description || defaultDescription,
    image: image || defaultImage,
    url: `${siteUrl}${pathname}`,
    keywords: keywords ? keywords.join(', ') : 'global marketplace, factory direct, wholesale, worldwide shipping, e-commerce',
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="keywords" content={seo.keywords} />
      {author && <meta name="author" content={author} />}

      {/* Canonical Link */}
      <link rel="canonical" href={canonical || seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": article ? "BlogPosting" : "WebSite",
          "name": siteName,
          "url": siteUrl,
          "description": seo.description,
          "publisher": {
            "@type": "Organization",
            "name": siteName,
            "logo": {
              "@type": "ImageObject",
              "url": `${siteUrl}/logo.png`
            }
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;
