const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

/**
 * Convert SVG banners to high-quality PNG images using Puppeteer.
 * Renders at 2x scale for retina/HiDPI quality.
 */
async function convertSvgToPng(svgPath, pngPath, width, height) {
    const absoluteSvg = path.resolve(svgPath);
    const svgContent = fs.readFileSync(absoluteSvg, 'utf-8');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();

    // Render at 2x for high quality (retina)
    const scale = 2;
    await page.setViewport({
        width,
        height,
        deviceScaleFactor: scale,
    });

    // Build a minimal HTML page that renders the SVG at exact dimensions
    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: ${width}px;
    height: ${height}px;
    overflow: hidden;
    background: transparent;
  }
  svg {
    width: ${width}px;
    height: ${height}px;
    display: block;
  }
</style>
</head>
<body>${svgContent}</body>
</html>`;

    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Small delay to ensure all filters/gradients are rendered
    await new Promise((r) => setTimeout(r, 500));

    const outputPath = path.resolve(pngPath);
    await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: { x: 0, y: 0, width, height },
        omitBackground: false,
    });

    await browser.close();

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`  ✓ ${path.basename(pngPath)} — ${width * scale}x${height * scale}px (${sizeKB} KB)`);
}

async function main() {
    console.log('\n🎨 Converting SVG banners to high-quality PNG...\n');

    const banners = [
        {
            svg: 'public/assets/cover-banner-linkedin.svg',
            png: 'public/assets/cover-banner-linkedin.png',
            width: 1584,
            height: 396,
            label: 'LinkedIn Cover',
        },
        {
            svg: 'public/assets/cover-banner-whatsapp.svg',
            png: 'public/assets/cover-banner-whatsapp.png',
            width: 1200,
            height: 630,
            label: 'WhatsApp Cover',
        },
    ];

    for (const b of banners) {
        if (!fs.existsSync(b.svg)) {
            console.error(`  ✗ ${b.svg} not found — skipping`);
            continue;
        }
        console.log(`  Converting ${b.label} (${b.width}x${b.height})...`);
        await convertSvgToPng(b.svg, b.png, b.width, b.height);
    }

    console.log('\n✅ All banners converted successfully!\n');
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
