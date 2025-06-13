import Head from 'next/head';
import { useRouter } from 'next/router';
import Script, { ScriptProps } from 'next/script';
import { FC } from 'react';

// SEO Configuration Interface
interface SEOConfig {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: {
    type?: string;
    locale?: string;
    url?: string;
    site_name?: string;
    title?: string;
    description?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
  };
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: string;
  };
  additionalMetaTags?: Array<Record<string, string>>;
  schema?: Record<string, unknown>;
  googleAnalyticsId?: string;
}

// Default SEO configuration
const defaultSEOConfig: SEOConfig = {
  title: 'Default Title',
  description: 'Default Description',
  canonical: '',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '',
    site_name: 'Default Site Name',
    title: 'Default OG Title',
    description: 'Default OG Description',
    images: [
      {
        url: 'https://example.com/default-image.jpg',
        width: 800,
        height: 600,
        alt: 'Default Image Alt',
      },
    ],
  },
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [],
};

// JSON-LD Schema Generator
const generateSchema = (schemaData?: Record<string, unknown>): { __html: string } | undefined => {
  if (!schemaData) return undefined;
  return {
    __html: JSON.stringify(schemaData),
  };
};

// Main SEO Component
const NextSEO: FC<SEOConfig> = ({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  schema,
  additionalMetaTags,
  googleAnalyticsId,
}) => {
  const router = useRouter();
  const seo: SEOConfig = {
    ...defaultSEOConfig,
    title: title || defaultSEOConfig.title,
    description: description || defaultSEOConfig.description,
    canonical: canonical || `https://example.com${router.asPath}`,
    openGraph: {
      ...defaultSEOConfig.openGraph,
      ...openGraph,
      url: openGraph?.url || `https://example.com${router.asPath}`,
    },
    twitter: {
      ...defaultSEOConfig.twitter,
      ...twitter,
    },
    additionalMetaTags: additionalMetaTags || defaultSEOConfig.additionalMetaTags,
    schema,
    googleAnalyticsId,
  };

  return (
    <>
      <Head>
        {/* Basic Meta Tags */}
        <title>{seo.title}</title>
        <meta name="description" content={seo.description || ''} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {seo.canonical && <link rel="canonical" href={seo.canonical} />}

        {/* Open Graph Tags */}
        {seo.openGraph && (
          <>
            <meta property="og:title" content={seo.openGraph.title || seo.title || ''} />
            <meta property="og:description" content={seo.openGraph.description || seo.description || ''} />
            <meta property="og:type" content={seo.openGraph.type || 'website'} />
            <meta property="og:url" content={seo.openGraph.url || ''} />
            <meta property="og:locale" content={seo.openGraph.locale || 'en_US'} />
            <meta property="og:site_name" content={seo.openGraph.site_name || ''} />
            {seo.openGraph.images &&
              seo.openGraph.images.map((image, index) => (
                <meta
                  key={`og-image-${index}`}
                  property="og:image"
                  content={image.url}
                />
              ))}
          </>
        )}

        {/* Twitter Card Tags */}
        {seo.twitter && (
          <>
            <meta name="twitter:card" content={seo.twitter.cardType || 'summary_large_image'} />
            <meta name="twitter:site" content={seo.twitter.site || ''} />
            <meta name="twitter:creator" content={seo.twitter.handle || ''} />
            <meta name="twitter:title" content={seo.title || ''} />
            <meta name="twitter:description" content={seo.description || ''} />
            {seo.openGraph?.images?.[0]?.url && (
              <meta name="twitter:image" content={seo.openGraph.images[0].url} />
            )}
          </>
        )}

        {/* Additional Meta Tags */}
        {seo.additionalMetaTags?.map((tag, index) => (
          <meta key={`meta-${index}`} {...tag} />
        ))}

        {/* JSON-LD Schema */}
        {seo.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={generateSchema(seo.schema)}
          />
        )}
      </Head>

      {/* Google Analytics Script */}
      {googleAnalyticsId && (
        <>
          <Script
            id="google-analytics-script"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `}
          </Script>
        </>
      )}
    </>
  );
};

// Sitemap Generator
interface SitemapPage {
  url: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

const generateSitemap = (pages: SitemapPage[], domain: string = 'https://example.com'): string => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${pages
      .map(
        (page) => `
      <url>
        <loc>${domain}${page.url}</loc>
        <lastmod>${page.lastmod || new Date().toISOString()}</lastmod>
        <changefreq>${page.changefreq || 'weekly'}</changefreq>
        <priority>${page.priority || '0.5'}</priority>
      </url>`
      )
      .join('')}
  </urlset>`;
  return xml;
};

// Export the component and utilities
export { NextSEO, generateSitemap };