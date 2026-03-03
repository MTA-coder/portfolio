// Generates RSS feed (feed.xml) from blog data
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BASE_URL = 'https://mta-coder.github.io/portfolio'

// Blog posts — keep in sync with src/data/blogData.ts
const posts = [
    {
        slug: 'zone-js-angular-deep-dive',
        title: 'Zone.js in Angular: Deep Dive into Its Evolution (Angular 16–19)',
        excerpt:
            'Explore how Angular has evolved its change detection mechanism from Zone.js dependency to Signal-based reactivity across Angular 16–19.',
        date: 'March 2, 2025',
        category: 'Angular',
    },
    {
        slug: 'responsively-responsive-design-testing',
        title:
            'Revolutionize Your Responsive Web Design Testing with Responsively',
        excerpt:
            'Effortlessly test your website on multiple devices and resolutions with Responsively — an open-source Electron-based browser with dev tools, click/scroll mirroring & batch screenshot export.',
        date: 'September 28, 2023',
        category: 'Tools',
    },
]

function escapeXml(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

function toRFC822(dateStr) {
    return new Date(dateStr).toUTCString()
}

const items = posts
    .map(
        (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE_URL}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${p.slug}</guid>
      <description>${escapeXml(p.excerpt)}</description>
      <pubDate>${toRFC822(p.date)}</pubDate>
      <category>${escapeXml(p.category)}</category>
    </item>`,
    )
    .join('\n')

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Mohammed Tawfeq Amiri — Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Thoughts, insights, and tutorials on web development, software engineering, and technology.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`

const outPath = path.resolve(__dirname, '../public/feed.xml')
fs.writeFileSync(outPath, feed)
console.log(`[rss] Generated ${outPath} with ${posts.length} items`)
