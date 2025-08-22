## Prerequisites

* Node.js must be installed on your system.

## Getting Started

1. Open the project's root folder in your terminal.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

This will launch a development server on your local network.
To access the site, open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## Important Notes

* **URL Structure**:
  This project uses brand and model **names** in URLs instead of IDs:
  Example: `localhost:3000/brands/(brand-name)/(model-name)`
  This improves readability and SEO, but it comes with the cost of additional network requests because the backend [API](https://graphql-api-brown.vercel.app/api/graphql) does not support fetching brands or models by name.

* **Pagination / Infinite Scrolling**:
  The backend [API](https://graphql-api-brown.vercel.app/api/graphql) does not support paginated queries, so all pagination is handled client-side.
  To simulate infinite scrolling, the project uses a fake delay to gradually display models that have already been fetched as the user scrolls. You can tweak this behavior in `/components/model-grid.tsx`.

* **Localization**:
  The app supports language switching while maintaining the benefits of server-side rendering (SSR). Locale files are located in `/app/assets/locales`.

* **Responsive Design**:
  All pages are mobile-friendly and responsive across various screen sizes.

* **Icons**:
  While the UI closely follows the original Figma design, icons from [Lucide](https://lucide.dev) were used as substitutes for some generic icons.
