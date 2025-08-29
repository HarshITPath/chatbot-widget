import fs from 'fs';
import path from 'path';

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Copy files to dist
const filesToCopy = [
    { src: 'index.html', dest: 'dist/index.html' },
    { src: 'widget-test.html', dest: 'dist/widget-test.html' },
    { src: 'README.md', dest: 'dist/README.md' },
    { src: 'INTEGRATION.md', dest: 'dist/INTEGRATION.md' }
];

filesToCopy.forEach(({ src, dest }) => {
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`✅ Copied ${src} to ${dest}`);
    } else {
        console.log(`⚠️  ${src} not found, skipping...`);
    }
});

console.log('🎉 Build completed successfully!');
