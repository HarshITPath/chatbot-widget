# 🚀 Deployment Guide - Chatbot Widget

## 📦 Quick Deploy to Vercel

### Option 1: GitHub + Vercel (Recommended)

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect and deploy!

3. **Your widget will be available at:**
   ```
   https://your-project-name.vercel.app/widget/chatbot-widget.umd.js
   ```

### Option 2: Vercel CLI (Fast Deploy)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login and Deploy:**
   ```bash
   vercel login
   vercel --prod
   ```

3. **Follow the prompts:**
   - Project name: `chatbot-widget`
   - Deploy to production: `Y`

## 🌐 Other Deployment Platforms

### Netlify
1. **Drag & Drop:**
   - Build: `npm run build`
   - Drag `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)

2. **GitHub Integration:**
   - Connect your repo at [netlify.com](https://netlify.com)
   - Build command: `npm run build`
   - Publish directory: `dist`

### GitHub Pages
1. **Enable GitHub Pages:**
   - Go to repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages`

2. **Deploy Script:**
   ```bash
   npm run build
   npx gh-pages -d dist
   ```

### Cloudflare Pages
1. **Connect Repository:**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pages > Create a project
   - Connect to Git

2. **Build Settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`

## 📋 Pre-Deployment Checklist

- [ ] ✅ Project builds successfully (`npm run build`)
- [ ] ✅ Widget file exists at `dist/widget/chatbot-widget.umd.js`
- [ ] ✅ Demo page works at `dist/index.html`
- [ ] ✅ Test page works at `dist/widget-test.html`
- [ ] ✅ API endpoint is configured correctly
- [ ] ✅ CORS headers are set on your API server

## 🔧 Post-Deployment Setup

### 1. Update API Configuration
After deployment, update your API URL in the demo:

```javascript
// In your deployed widget
ChatbotWidget.init({
  apiUrl: 'https://your-production-api.com/api', // Update this
  primaryColor: '#your-brand-color'
});
```

### 2. Configure CORS
Ensure your API server allows requests from your deployed domain:

```javascript
// Express.js example
app.use(cors({
  origin: [
    'https://your-widget-domain.vercel.app',
    'https://your-website.com'
  ]
}));
```

### 3. Test the Deployed Widget
```html
<!-- Test integration with your deployed widget -->
<script src="https://your-widget-domain.vercel.app/widget/chatbot-widget.umd.js"></script>
<script>
  ChatbotWidget.init({
    apiUrl: 'https://your-api.com/api'
  });
</script>
```

## 📊 CDN Usage Examples

### Basic Integration
```html
<script src="https://your-project.vercel.app/widget/chatbot-widget.umd.js"></script>
<script>
  ChatbotWidget.init();
</script>
```

### WordPress
```php
function add_chatbot_widget() {
    wp_enqueue_script('chatbot-widget', 'https://your-project.vercel.app/widget/chatbot-widget.umd.js');
    wp_add_inline_script('chatbot-widget', '
        ChatbotWidget.init({
            apiUrl: "' . get_option('chatbot_api_url') . '"
        });
    ');
}
add_action('wp_enqueue_scripts', 'add_chatbot_widget');
```

### React/Next.js
```jsx
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://your-project.vercel.app/widget/chatbot-widget.umd.js';
  script.onload = () => {
    window.ChatbotWidget.init({
      apiUrl: process.env.REACT_APP_API_URL
    });
  };
  document.body.appendChild(script);
}, []);
```

## 🔐 Environment Variables

### For Vercel Deployment
Set environment variables in Vercel dashboard:

- `VITE_API_URL` - Your production API endpoint
- `VITE_PRIMARY_COLOR` - Default theme color
- `VITE_BOT_NAME` - Default bot name

### Update Widget to Use Environment Variables
```javascript
// In src/widget.jsx
const defaultConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  primaryColor: import.meta.env.VITE_PRIMARY_COLOR || '#1976d2',
  botName: import.meta.env.VITE_BOT_NAME || 'Assistant',
  // ... other configs
};
```

## 📈 Performance Optimization

### 1. CDN Caching
The widget file is optimized for CDN caching:
- File size: ~1.4MB (gzipped: ~265KB)
- Cache headers: Set for 24 hours
- No external dependencies

### 2. Loading Strategy
```html
<!-- Preload for better performance -->
<link rel="preload" href="https://your-project.vercel.app/widget/chatbot-widget.umd.js" as="script">

<!-- Load the widget -->
<script src="https://your-project.vercel.app/widget/chatbot-widget.umd.js"></script>
```

## 🐛 Troubleshooting

### Deployment Issues
- **Build fails:** Check Node.js version (requires 20.19+)
- **Widget not found:** Verify build output includes `dist/widget/`
- **CORS errors:** Configure your API server for cross-origin requests

### Integration Issues
- **Widget not appearing:** Check browser console for errors
- **API connection fails:** Verify API URL and CORS settings
- **Styling conflicts:** Widget uses isolated Material-UI styles

## 📞 Support & Monitoring

### Health Check Endpoint
Your deployed widget provides a health check:
```
GET https://your-project.vercel.app/widget/chatbot-widget.umd.js
Status: 200 OK = Widget is available
```

### Analytics Integration
```javascript
ChatbotWidget.init({
  // ... your config
  onMessage: (message, isUser) => {
    // Track usage with your analytics
    gtag('event', 'chatbot_message', {
      'message_type': isUser ? 'user' : 'bot'
    });
  }
});
```

---

## 🎉 You're Ready!

Your chatbot widget is now deployed and ready to be embedded in any website. Share your CDN link and start chatting! 🤖✨

**Live Demo:** https://your-project.vercel.app
**CDN Link:** https://your-project.vercel.app/widget/chatbot-widget.umd.js
