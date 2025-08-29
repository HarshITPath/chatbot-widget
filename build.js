import fs from 'fs';
import path from 'path';

// Load environment variables
const env = process.env;

// Ensure dist directory exists
if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
}

// Function to replace environment placeholders in HTML files
function replaceEnvPlaceholders(content) {
    const replacements = {
        'VITE_API_URL_PLACEHOLDER': env.VITE_API_URL || 'http://192.168.0.39:3000/api',
        'VITE_PRIMARY_COLOR_PLACEHOLDER': env.VITE_PRIMARY_COLOR || '#667eea',
        'VITE_SECONDARY_COLOR_PLACEHOLDER': env.VITE_SECONDARY_COLOR || '#764ba2',
        'VITE_BOT_NAME_PLACEHOLDER': env.VITE_BOT_NAME || 'Demo Assistant',
        'VITE_BOT_AVATAR_PLACEHOLDER': env.VITE_BOT_AVATAR || '🚀',
        'VITE_USER_AVATAR_PLACEHOLDER': env.VITE_USER_AVATAR || '👨‍💼',
        'VITE_GREETING_PLACEHOLDER': env.VITE_GREETING || 'Hello! Welcome to our chatbot widget demo. How can I assist you today?',
        'VITE_PLACEHOLDER_PLACEHOLDER': env.VITE_PLACEHOLDER || 'Type your message here...',
        'VITE_POSITION_PLACEHOLDER': env.VITE_POSITION || 'bottom-right'
    };

    let result = content;
    for (const [placeholder, value] of Object.entries(replacements)) {
        result = result.replace(new RegExp(placeholder, 'g'), value);
    }
    return result;
}

// Copy files to dist with environment variable replacement
const filesToCopy = [
    { src: 'index.html', dest: 'dist/index.html', processEnv: true },
    { src: 'widget-test.html', dest: 'dist/widget-test.html', processEnv: true },
    { src: 'README.md', dest: 'dist/README.md', processEnv: false },
    { src: 'INTEGRATION.md', dest: 'dist/INTEGRATION.md', processEnv: false }
];

filesToCopy.forEach(({ src, dest, processEnv }) => {
    if (fs.existsSync(src)) {
        let content = fs.readFileSync(src, 'utf8');
        
        if (processEnv) {
            content = replaceEnvPlaceholders(content);
        }
        
        fs.writeFileSync(dest, content);
        console.log(`✅ Copied ${src} to ${dest}${processEnv ? ' (with env processing)' : ''}`);
    } else {
        console.log(`⚠️  ${src} not found, skipping...`);
    }
});

// Log environment variables being used
console.log('\n📊 Environment Configuration:');
console.log(`   API URL: ${env.VITE_API_URL || 'http://192.168.0.39:3000/api'}`);
console.log(`   Primary Color: ${env.VITE_PRIMARY_COLOR || '#667eea'}`);
console.log(`   Bot Name: ${env.VITE_BOT_NAME || 'Demo Assistant'}`);
console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);

console.log('\n🎉 Build completed successfully!');
