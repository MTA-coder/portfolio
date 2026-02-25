const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, '..', 'public', 'assets', 'Mohammed Tawfeq Amiri Picture.png');
const outputDir = path.join(__dirname, '..', 'public');

async function generateSEOImages() {
  const input = sharp(inputPath);
  const metadata = await input.metadata();
  console.log(`Source image: ${metadata.width}x${metadata.height}`);

  // 1. OG image (1200x630) - profile centered on dark branded background
  const ogWidth = 1200;
  const ogHeight = 630;
  const profileSize = 400; // profile pic size within the OG image

  const resizedProfile = await sharp(inputPath)
    .resize(profileSize, profileSize, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  // Create dark background and composite the profile
  await sharp({
    create: {
      width: ogWidth,
      height: ogHeight,
      channels: 4,
      background: { r: 11, g: 1, b: 30, alpha: 1 } // #0b011e - matches theme-color
    }
  })
    .composite([
      {
        input: resizedProfile,
        left: Math.round((ogWidth - profileSize) / 2),
        top: Math.round((ogHeight - profileSize) / 2)
      }
    ])
    .png({ quality: 85 })
    .toFile(path.join(outputDir, 'og-image.png'));

  console.log('Created og-image.png (1200x630)');

  // 2. Square OG image for Twitter summary card (400x400)
  await sharp(inputPath)
    .resize(400, 400, { fit: 'cover', position: 'top' })
    .png({ quality: 85 })
    .toFile(path.join(outputDir, 'og-image-square.png'));

  console.log('Created og-image-square.png (400x400)');

  // 3. Small profile for structured data / Telegram (300x300)
  await sharp(inputPath)
    .resize(300, 300, { fit: 'cover', position: 'top' })
    .png({ quality: 80 })
    .toFile(path.join(outputDir, 'profile-seo.png'));

  console.log('Created profile-seo.png (300x300)');

  console.log('\nAll SEO images generated successfully!');
}

generateSEOImages().catch(console.error);
