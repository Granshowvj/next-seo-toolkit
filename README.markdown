# Next SEO Package

A comprehensive SEO package for Next.js applications, providing meta tags, Open Graph, Twitter Cards, JSON-LD schemas, Google Analytics, and sitemap generation.

## Installation

```bash
npm install @your-username/next-seo-package
```

## Usage

### NextSEO Component

```jsx
import { NextSEO } from '@your-username/next-seo-package';

export default function Home() {
  return (
    <>
      <NextSEO
        title="My Website"
        description="Welcome to my awesome website"
        canonical="https://example.com"
        openGraph={{
          title: 'My Website',
          description: 'Welcome to my awesome website',
          images: [{ url: 'https://example.com/image.jpg' }],
        }}
        twitter={{
          handle: '@myhandle',
          site: '@mysite',
          cardType: 'summary_large_image',
        }}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'My Website',
          url: 'https://example.com',
        }}
        googleAnalyticsId="G-XXXXXXXXXX"
      />
      <h1>Welcome to my site</h1>
    </>
  );
}
```

### Sitemap Generation

```jsx
import { generateSitemap } from '@your-username/next-seo-package';

export default function handler(req, res) {
  const pages = [
    { url: '/', lastmod: '2025-06-13', changefreq: 'daily', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
  ];
  const sitemap = generateSitemap(pages);
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
```

## Features

- Meta Tags (title, description, canonical, viewport)
- Open Graph Tags for social sharing
- Twitter Card Tags
- JSON-LD Schema support
- Google Analytics integration
- XML Sitemap generation

## License

MIT