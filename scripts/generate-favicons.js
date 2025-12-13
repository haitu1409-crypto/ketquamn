const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputImage = path.join(__dirname, '../public/logoketquamn.png');
const outputDir = path.join(__dirname, '../public');

// Các kích thước favicon cần tạo
const faviconSizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
    { name: 'apple-touch-icon.png', size: 180 },
];

async function generateFavicons() {
    try {
        // Kiểm tra file nguồn có tồn tại không
        if (!fs.existsSync(inputImage)) {
            console.error(`❌ File không tồn tại: ${inputImage}`);
            process.exit(1);
        }

        console.log('🔄 Đang tạo favicons từ logoketquamn.png...\n');

        // Tạo từng favicon
        for (const favicon of faviconSizes) {
            const outputPath = path.join(outputDir, favicon.name);
            
            await sharp(inputImage)
                .resize(favicon.size, favicon.size, {
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 } // Transparent background
                })
                .png()
                .toFile(outputPath);

            console.log(`✅ Đã tạo: ${favicon.name} (${favicon.size}x${favicon.size}px)`);
        }

        // Tạo favicon.ico từ 32x32 (cho các trình duyệt cũ)
        const icoPath = path.join(outputDir, 'favicon.ico');
        await sharp(inputImage)
            .resize(32, 32, {
                fit: 'contain',
                background: { r: 255, g: 255, b: 255, alpha: 0 }
            })
            .png()
            .toFile(icoPath);
        
        console.log(`✅ Đã tạo: favicon.ico (32x32px)`);

        console.log('\n✨ Hoàn thành! Tất cả favicons đã được tạo thành công.');
        
    } catch (error) {
        console.error('❌ Lỗi khi tạo favicons:', error);
        process.exit(1);
    }
}

generateFavicons();

