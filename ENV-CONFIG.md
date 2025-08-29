# 🌍 Environment Configuration Guide

## 📋 Environment Variables

Your chatbot widget now supports environment-based configuration. This allows you to have different settings for development, staging, and production environments.

## 🔧 Available Environment Variables

| Variable | Description | Default | Example |
|----------|-------------|---------|---------|
| `VITE_API_URL` | API endpoint URL | `http://192.168.0.39:3000/api` | `https://api.yourapp.com/api` |
| `VITE_PRIMARY_COLOR` | Primary theme color | `#1976d2` | `#ff6b35` |
| `VITE_SECONDARY_COLOR` | Secondary theme color | `#dc004e` | `#004e92` |
| `VITE_BOT_NAME` | Bot display name | `IT Path Assistant` | `Your Assistant` |
| `VITE_BOT_AVATAR` | Bot avatar emoji | `🤖` | `🚀` |
| `VITE_USER_AVATAR` | User avatar emoji | `👤` | `👨‍💼` |
| `VITE_POSITION` | Widget position | `bottom-right` | `bottom-left` |
| `VITE_BUTTON_SIZE` | Chat button size (px) | `64` | `72` |
| `VITE_BORDER_RADIUS` | Border radius | `3` | `8` |
| `VITE_Z_INDEX` | CSS z-index | `1300` | `9999` |
| `VITE_GREETING` | Initial bot message | `Hi! 👋 How can I help...` | `Welcome to support!` |
| `VITE_PLACEHOLDER` | Input placeholder | `Type your message...` | `Ask me anything...` |
| `VITE_SHADOW` | Box shadow | `0 8px 32px rgba(0,0,0,0.12)` | Custom shadow |
| `VITE_FONT_FAMILY` | Font family | `"Roboto", sans-serif` | Custom font |

## 📁 Environment Files

### `.env.development` (Development)
```env
VITE_API_URL=http://localhost:3000/api
VITE_PRIMARY_COLOR=#1976d2
VITE_BOT_NAME=Development Assistant
VITE_GREETING=Hi! 👋 Development mode active
```

### `.env.production` (Production)
```env
VITE_API_URL=https://your-production-api.com/api
VITE_PRIMARY_COLOR=#667eea
VITE_BOT_NAME=Assistant
VITE_GREETING=Hello! How can I assist you today?
```

### `.env.local` (Local Overrides)
```env
# This file is ignored by git
# Use for local development overrides
VITE_API_URL=http://192.168.1.100:3000/api
VITE_BOT_NAME=Local Test Bot
```

## 🚀 Usage

### 1. **Local Development**
```bash
# Copy example and customize
cp .env.example .env.local

# Edit .env.local with your settings
# Then build
npm run build
```

### 2. **Production Build**
```bash
# Uses .env.production automatically
npm run build:prod
```

### 3. **Development Build**
```bash
# Uses .env.development automatically
npm run build:dev
```

## 🌐 Deployment Platform Setup

### Vercel
1. Go to your project dashboard
2. Settings > Environment Variables
3. Add your production variables:

```
VITE_API_URL = https://your-api.com/api
VITE_PRIMARY_COLOR = #667eea
VITE_BOT_NAME = Your Assistant
```

### Netlify
1. Site settings > Environment variables
2. Add the same variables as above

### Cloudflare Pages
1. Pages > your-project > Settings > Environment variables
2. Add production environment variables

## 🔄 Dynamic Configuration

Your widget also supports runtime configuration overrides:

```javascript
// This will override environment settings
ChatbotWidget.init({
  apiUrl: 'https://different-api.com/api',
  primaryColor: '#custom-color',
  botName: 'Override Bot'
});
```

## 📊 Environment Detection

The widget automatically detects the environment:

```javascript
// In your widget code
const isProduction = import.meta.env.PROD;
const isDevelopment = import.meta.env.DEV;
const mode = import.meta.env.MODE; // 'development' or 'production'
```

## 🔧 Build Process

When you run `npm run build`, the system:

1. **Loads environment variables** from appropriate `.env` files
2. **Builds the widget** with those variables
3. **Processes HTML files** to replace placeholders
4. **Outputs configured files** to `dist/`

## 🎯 Quick Setup Examples

### For Different Brands
```bash
# Brand A
VITE_API_URL=https://brand-a-api.com/api
VITE_PRIMARY_COLOR=#ff6b35
VITE_BOT_NAME=Brand A Assistant
VITE_BOT_AVATAR=🌟

# Brand B  
VITE_API_URL=https://brand-b-api.com/api
VITE_PRIMARY_COLOR=#6c5ce7
VITE_BOT_NAME=Brand B Helper
VITE_BOT_AVATAR=💼
```

### For Different Environments
```bash
# Development
VITE_API_URL=http://localhost:3000/api
VITE_BOT_NAME=Dev Bot
VITE_GREETING=Development mode - debugging enabled

# Staging
VITE_API_URL=https://staging-api.com/api
VITE_BOT_NAME=Staging Bot
VITE_GREETING=Staging environment

# Production
VITE_API_URL=https://api.production.com/api
VITE_BOT_NAME=Assistant
VITE_GREETING=Hello! How can I help you?
```

## 🛠 Troubleshooting

### Environment Variables Not Working?
1. **Check file names**: Must start with `VITE_`
2. **Restart build**: Environment changes require rebuild
3. **Check syntax**: No spaces around `=` in `.env` files
4. **File location**: `.env` files must be in project root

### Wrong Configuration in Build?
```bash
# Check what environment variables are being used
npm run build

# Look for this output:
# 📊 Environment Configuration:
#    API URL: https://your-api.com/api
#    Primary Color: #667eea
#    Bot Name: Your Assistant
```

## 🎉 Benefits

✅ **Environment-specific builds**
✅ **Easy brand customization**  
✅ **Secure API configuration**
✅ **Zero code changes for deployment**
✅ **Consistent across platforms**

Now your widget can be customized for any environment without touching the code! 🚀
