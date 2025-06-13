# next-seo-toolkit

![npm](https://img.shields.io/npm/v/next-seo-toolkit) ![license](https://img.shields.io/npm/l/next-seo-toolkit) ![downloads](https://img.shields.io/npm/dm/next-seo-toolkit)

A comprehensive SEO package for Next.js, simplifying meta tags, Open Graph, Twitter Cards, JSON-LD schemas, Google Analytics, and sitemap generation. Built by [Granshow](https://github.com/granshow), a developer with over 8 years of experience crafting robust web solutions.

## Features

- **Meta Tags**: Easily manage title, description, canonical, and viewport tags.
- **Open Graph**: Optimize social sharing for platforms like Facebook and LinkedIn.
- **Twitter Cards**: Enhance Twitter post visibility with rich card support.
- **JSON-LD Schemas**: Improve search engine understanding with structured data.
- **Google Analytics**: Seamless integration for tracking and analytics.
- **Sitemap Generation**: Generate XML sitemaps for better search engine crawling.

## Installation

Install the package via npm:

```bash
npm install next-seo-toolkit
```

## Usage

### NextSEO Component

Use the `NextSEO` component to add SEO metadata to your Next.js pages:

```jsx
import { NextSEO } from 'next-seo-toolkit';

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
          images: [{ url: 'https://example.com/image.jpg', width: 800, height: 600, alt: 'Site Image' }],
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
        additionalMetaTags={[
          { name: 'keywords', content: 'nextjs, seo, web development' },
        ]}
      />
      <h1>Welcome to My Site</h1>
    </>
  );
}
```

### Sitemap Generation

Generate XML sitemaps in an API route:

```jsx
import { generateSitemap } from 'next-seo-toolkit';

export default function handler(req, res) {
  const pages = [
    { url: '/', lastmod: '2025-06-13', changefreq: 'daily', priority: '1.0' },
    { url: '/about', changefreq: 'monthly', priority: '0.8' },
  ];
  const sitemap = generateSitemap(pages, 'https://example.com');
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
}
```

## Configuration

The `NextSEO` component accepts the following props:

| Prop                | Type     | Description                                      |
|---------------------|----------|--------------------------------------------------|
| `title`             | string   | Page title                                       |
| `description`       | string   | Meta description                                 |
| `canonical`         | string   | Canonical URL                                    |
| `openGraph`         | object   | Open Graph metadata (title, description, etc.)   |
| `twitter`           | object   | Twitter Card metadata (handle, site, cardType)   |
| `schema`            | object   | JSON-LD schema for structured data               |
| `googleAnalyticsId` | string   | Google Analytics tracking ID                     |
| `additionalMetaTags`| array    | Additional meta tags as key-value pairs          |

## Example Project Setup

1. Initialize a Next.js project: `npx create-next-app@latest my-app`
2. Install the package: `npm install next-seo-toolkit`
3. Add the `NextSEO` component to your pages or `_app.js` for global SEO.
4. Create an API route (e.g., `pages/api/sitemap.xml`) for sitemap generation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/granshow/next-seo-toolkit).

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a pull request.

## About the Author

**Granshow** is a seasoned developer with over 8 years of experience in web development, specializing in building scalable and optimized web solutions. Passionate about enhancing web visibility, Granshow created `next-seo-toolkit` to streamline SEO for Next.js developers.

## License

This project is licensed under the [MIT License](LICENSE).