// Generates sitemap.xml from project and blog data
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://mta-coder.github.io/portfolio'

const today = new Date().toISOString().split('T')[0]

// Static pages
const staticPages = [
    { path: '/', changefreq: 'weekly', priority: '1.0' },
    { path: '/projects', changefreq: 'weekly', priority: '0.9' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' },
    { path: '/privacy-policy', changefreq: 'yearly', priority: '0.3' },
    { path: '/terms', changefreq: 'yearly', priority: '0.3' },
]

// All project IDs (update when adding new projects)
const projectIds = [
    'lamasat-erp',
    'yesser-recruitment',
    'smart-race-application',
    'restuo',
    'nova-tech',
    'issan-mosque-dmk',
    'pro-decor',
    'correspondence',
    'moei',
    'restaurant',
    'erp',
    'elearning',
    'ecommerce',
]

// Blog slugs (update when adding new posts)
const blogSlugs = [
    'zone-js-angular-deep-dive',
    'responsively-responsive-design-testing',
]

function buildUrl(loc, changefreq, priority) {
    return `  <url>
    <loc>${BASE_URL}${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const urls = [
    ...staticPages.map((p) => buildUrl(p.path, p.changefreq, p.priority)),
    ...projectIds.map((id) => buildUrl(`/projects/${id}`, 'monthly', '0.7')),
    ...blogSlugs.map((slug) => buildUrl(`/blog/${slug}`, 'monthly', '0.6')),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

const outPath = path.resolve(__dirname, '../public/sitemap.xml')
fs.writeFileSync(outPath, sitemap)
console.log(`[sitemap] Generated ${outPath} with ${urls.length} URLs`)
