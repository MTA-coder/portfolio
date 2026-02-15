# Welcome to your Lovable project

## Project info

URL: <https://lovable.dev/projects/5a5d9a8d-b0c9-45b7-bf89-ede9c93c61ae>

## How can I edit this code?

### Use Lovable

Simply visit the [Lovable Project](https://lovable.dev/projects/5a5d9a8d-b0c9-45b7-bf89-ede9c93c61ae) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

### Use your preferred IDE

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

### Edit a file directly in GitHub

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

### Use GitHub Codespaces

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/5a5d9a8d-b0c9-45b7-bf89-ede9c93c61ae) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Performance & Architecture Enhancements

This codebase has been refactored for high performance & SEO:

- Route level Suspense + Error Boundaries
- Adaptive performance (hooks: `useOptimizedPerformance`, dynamic qualityFactor)
- Web Vitals (CLS, LCP, INP, FCP, TTFB) collection via `web-vitals` library
- JSON-LD (Person, WebSite, ItemList, Blog, BlogPosting, BreadcrumbList, SoftwareSourceCode)
- Canonical links + robots meta + sitemap + improved robots.txt
- Responsive `<picture>` for Unsplash, lazy images, async decode
- Prefetching of route bundles & idle hydration assistance
- Accessibility improvements: aria labels, semantic structure

### Suggested Security Headers (configure at CDN / hosting)

```text
Content-Security-Policy: default-src 'self'; img-src 'self' https://images.unsplash.com data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self';
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### Additional Optimizations (10/10 Final Pass)

- PWA offline fallback (`offline.html`) + extended Workbox runtime caching (fonts, images, JSON)
- Manual vendor chunk splitting (`react`, `ui`, `three`) for improved cache efficiency
- Shared IntersectionObserver hook to consolidate observers (`useSharedIntersectionObserver`)
- Critical CSS inlining via Critters + SRI hashing (`scripts/postbuild.js`)
- Offline resilience & graceful degradation messaging

### Updated Scripts

- `build:critical` – runs normal build then postbuild (critical CSS + SRI)

### Next (Future Considerations)

- Full SSR or static prerender for improved TTFB
- Automated Lighthouse + axe + Vitest CI
- Dynamic critical CSS extraction (experiment with lightningcss or tailoring Critters config per route)
- Real analytics endpoint + batching persistence
- Security header automation (deploy hook) & CSP nonce hash pipeline

### Running Production Build with Enhancements

```sh
npm run build:critical
# Outputs dist/ with inlined critical CSS and SRI attributes applied
```
