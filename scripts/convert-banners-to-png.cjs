const puppeteer = require('puppeteer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

/**
 * Convert SVG banners to high-quality PNG images.
 * Renders at 3x supersampled resolution via Puppeteer, then downscales
 * to the target dimensions using sharp's Lanczos3 resampling for
 * crisp text, smooth gradients, and sharp filter effects.
 */
async function convertSvgToPng(svgPath, pngPath, targetWidth, targetHeight) {
    const absoluteSvg = path.resolve(svgPath);
    const svgContent = fs.readFileSync(absoluteSvg, 'utf-8');

    // Render at 3x for supersampled quality
    const renderScale = 3;

    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    });

    const page = await browser.newPage();

    await page.setViewport({
        width: targetWidth,
        height: targetHeight,
        deviceScaleFactor: renderScale,
    });

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body {
    width: ${targetWidth}px;
    height: ${targetHeight}px;
    overflow: hidden;
    background: #0f1117;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: geometricPrecision;
  }
  svg {
    width: ${targetWidth}px;
    height: ${targetHeight}px;
    display: block;
    shape-rendering: geometricPrecision;
    image-rendering: optimizeQuality;
  }
</style>
</head>
<body>${svgContent}</body>
</html>`;

    await page.setContent(html, { waitUntil: 'networkidle0' });
    await new Promise((r) => setTimeout(r, 800));

    // Screenshot produces a 3x resolution image
    const hiResBuffer = await page.screenshot({
        type: 'png',
        clip: { x: 0, y: 0, width: targetWidth, height: targetHeight },
        omitBackground: false,
    });

    await browser.close();

    // Downscale to exact target dimensions with Lanczos3 for maximum sharpness
    const outputPath = path.resolve(pngPath);
    await sharp(hiResBuffer)
        .resize(targetWidth, targetHeight, {
            kernel: sharp.kernel.lanczos3,
            fastShrinkOnLoad: false,
        })
        .png({
            quality: 100,
            compressionLevel: 6,
        })
        .toFile(outputPath);

    const stats = fs.statSync(outputPath);
    const sizeKB = (stats.size / 1024).toFixed(1);
    console.log(`  ✓ ${path.basename(pngPath)} — ${targetWidth}x${targetHeight}px (${sizeKB} KB) [rendered at ${renderScale}x]`);
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
