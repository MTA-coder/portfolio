// Post-build processing: inline critical CSS & inject SRI hashes
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'
import Critters from 'critters'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const distDir = path.resolve(__dirname, '../dist')
const indexPath = path.join(distDir, 'index.html')
const offlinePath = path.join(distDir, 'offline.html')

async function run() {
    if (!fs.existsSync(indexPath)) {
        console.log('[postbuild] index.html not found, skipping.')
        return
    }

    // Basic SRI helper
    function generateIntegrity(filePath) {
        const data = fs.readFileSync(filePath)
        const hash = crypto.createHash('sha384').update(data).digest('base64')
        return `sha384-${hash}`
    }

    const addSRI = (html) => {
        const assetRegex = /<link rel="stylesheet" href="(.*?)">|<script type="module" crossorigin src="(.*?)"><\/script>/g
        let match
        const sriMap = {}
        while ((match = assetRegex.exec(html)) !== null) {
            const href = match[1] || match[2]
            if (!href) continue
            const assetPath = path.join(distDir, href.replace(/^\//, ''))
            if (fs.existsSync(assetPath)) {
                const integrity = generateIntegrity(assetPath)
                sriMap[href] = integrity
            }
        }
        html = html.replace(/<link rel="stylesheet" href="(.*?)">/g, (full, href) => {
            const integrity = sriMap[href]
            return integrity
                ? `<link rel="stylesheet" href="${href}" integrity="${integrity}" crossorigin="anonymous">`
                : full
        })
        html = html.replace(/<script type="module" crossorigin src="(.*?)"><\/script>/g, (full, src) => {
            const integrity = sriMap[src]
            return integrity
                ? `<script type="module" crossorigin src="${src}" integrity="${integrity}"></script>`
                : full
        })
        return html
    }

    // Inline critical CSS using Critters (idempotent if re-run)
    const critters = new Critters({
        path: distDir,
        preload: 'swap',
        pruneSource: true,
        reduceInlineStyles: true,
        compress: true,
        logLevel: 'info',
    })

    const processHtml = async (filePath) => {
        if (!fs.existsSync(filePath)) return
        let html = fs.readFileSync(filePath, 'utf8')
        try {
            html = await critters.process(html)
            html = addSRI(html)
            fs.writeFileSync(filePath, html)
            console.log(`[postbuild] Processed critical CSS + SRI for ${path.basename(filePath)}`)
        } catch (e) {
            console.warn(`[postbuild] Failed Critters processing for ${filePath}:`, e.message)
            // Still attempt SRI even if Critters fails
            html = addSRI(html)
            fs.writeFileSync(filePath, html)
        }
    }

    await processHtml(indexPath)
    await processHtml(offlinePath)

    console.log('[postbuild] Completed postbuild enhancements.')
}

run().catch((e) => {
    console.error('[postbuild] Unexpected error', e)
    process.exit(1)
})
