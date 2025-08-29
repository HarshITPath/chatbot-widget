# 🤖 Chatbot Widget

A lightweight, embeddable chatbot widget that can be integrated into any website using a simple script tag. Built with React and designed for easy customization and deployment.

## 🚀 Quick Start

### 1. Build the Widget
```bash
npm install
npm run build:widget
```

This creates the production-ready widget file at `dist/widget/chatbot-widget.umd.js`.

### 2. Basic Integration
Add these two lines to any HTML page:

```html
<script src="path/to/chatbot-widget.umd.js"></script>
<script>
  ChatbotWidget.init();
</script>
```

## 📦 Project Structure

```
chatbot-widget/
├── src/
│   ├── components/          # React components
│   │   ├── chat-button.jsx
│   │   └── chat-window.jsx
│   ├── utils/              # Utilities and constants
│   ├── App.jsx             # Main app component
│   └── widget.jsx          # Widget entry point
├── dist/widget/            # Built widget files
│   └── chatbot-widget.umd.js
├── package.json
├── vite.config.js          # Standard Vite config
├── vite.widget.config.js   # Widget build config
└── README.md
```

## ⚙️ Configuration Options

```javascript
ChatbotWidget.init({
  // API Configuration
  apiUrl: 'https://your-api-endpoint.com/api',
  
  // Appearance
  primaryColor: '#1976d2',      // Main theme color
  secondaryColor: '#dc004e',    // Secondary color
  botName: 'Assistant',         // Bot name in header
  botAvatar: '🤖',             // Bot avatar emoji
  userAvatar: '👤',            // User avatar emoji
  
  // Positioning & Size
  position: 'bottom-right',     // bottom-right, bottom-left, top-right, top-left
  buttonSize: 64,               // Chat button size in pixels
  zIndex: 1300,                 // CSS z-index
  
  // Messages
  greeting: 'Hi! How can I help?',
  placeholder: 'Type your message...',
  
  // Styling
  borderRadius: 3,
  shadow: '0 8px 32px rgba(0,0,0,0.12)',
  fontFamily: '"Roboto", sans-serif'
});
```

## 🛠 API Methods

| Method | Description | Example |
|--------|-------------|---------|
| `init(config)` | Initialize widget with configuration | `ChatbotWidget.init({ primaryColor: '#ff6b35' })` |
| `show()` | Show the widget | `ChatbotWidget.show()` |
| `hide()` | Hide the widget | `ChatbotWidget.hide()` |
| `updateConfig(config)` | Update configuration dynamically | `ChatbotWidget.updateConfig({ botName: 'New Name' })` |
| `destroy()` | Remove widget completely | `ChatbotWidget.destroy()` |
| `getInstance()` | Get widget instance for advanced usage | `const instance = ChatbotWidget.getInstance()` |

## 🧪 Testing the Widget in Other Projects

### Method 1: Local File Testing

1. **Copy the widget file to your project:**
   ```bash
   cp dist/widget/chatbot-widget.umd.js /path/to/your-project/js/
   ```

2. **Create a test HTML file:**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Widget Test</title>
   </head>
   <body>
       <h1>Testing Chatbot Widget</h1>
       <p>The chat button should appear in the bottom-right corner.</p>
       
       <!-- Load the widget -->
       <script src="./js/chatbot-widget.umd.js"></script>
       <script>
           ChatbotWidget.init({
               apiUrl: 'http://192.168.0.39:3000/api',
               primaryColor: '#007bff',
               botName: 'Test Bot',
               greeting: 'Hello! This is a test widget.'
           });
       </script>
   </body>
   </html>
   ```

### Method 2: CDN/Remote Testing

1. **Upload widget to your server/CDN:**
   ```bash
   # Upload to your hosting
   dist/widget/chatbot-widget.umd.js → https://your-cdn.com/js/chatbot-widget.js
   ```

2. **Include in any website:**
   ```html
   <script src="https://your-cdn.com/js/chatbot-widget.js"></script>
   <script>
       ChatbotWidget.init({
           apiUrl: 'https://your-api.com/api'
       });
   </script>
   ```

### Method 3: WordPress Integration

```php
// Add to your theme's functions.php
function add_chatbot_widget() {
    ?>
    <script src="<?php echo get_template_directory_uri(); ?>/js/chatbot-widget.js"></script>
    <script>
        ChatbotWidget.init({
            apiUrl: '<?php echo get_option('chatbot_api_url', 'http://192.168.0.39:3000/api'); ?>',
            primaryColor: '<?php echo get_theme_mod('primary_color', '#1976d2'); ?>'
        });
    </script>
    <?php
}
add_action('wp_footer', 'add_chatbot_widget');
```

### Method 4: React App Integration

```jsx
// In your React component
import { useEffect } from 'react';

function MyComponent() {
    useEffect(() => {
        // Load widget script
        const script = document.createElement('script');
        script.src = '/js/chatbot-widget.js';
        script.onload = () => {
            window.ChatbotWidget.init({
                apiUrl: process.env.REACT_APP_API_URL,
                primaryColor: '#your-brand-color'
            });
        };
        document.body.appendChild(script);
        
        return () => {
            // Cleanup
            window.ChatbotWidget?.destroy();
        };
    }, []);

    return <div>Your app content</div>;
}
```

### Method 5: Next.js Integration

```jsx
// pages/_app.js or in a component
import { useEffect } from 'react';
import Script from 'next/script';

export default function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <Script 
                src="/js/chatbot-widget.js" 
                onLoad={() => {
                    window.ChatbotWidget.init({
                        apiUrl: process.env.NEXT_PUBLIC_API_URL
                    });
                }}
            />
        </>
    );
}
```

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Development mode (for widget development)
npm run dev

# Build standard app
npm run build

# Build widget for distribution
npm run build:widget

# Lint code
npm run lint

# Preview build
npm run preview
```

## 📁 Distribution Files

After building, you'll get:
- `dist/widget/chatbot-widget.umd.js` - Main widget file (~1.4MB, includes React & all dependencies)
- No external dependencies required on target websites

## 🔒 Security Notes

- Always serve over HTTPS in production
- Ensure your API endpoints are properly secured
- Validate all user inputs on your backend
- Consider implementing rate limiting

## 🐛 Troubleshooting

### Widget not appearing?
1. Check browser console for errors
2. Verify script path is correct
3. Ensure `ChatbotWidget.init()` is called after script loads

### API connection issues?
1. Check API URL configuration
2. Verify CORS settings on your server
3. Check network tab for failed requests

### Styling conflicts?
1. Widget uses isolated Material-UI styling
2. Check for CSS z-index conflicts
3. Verify no global styles override widget

## 📞 Support

For issues and questions:
1. Check the browser console for error messages
2. Verify API connectivity
3. Test with provided examples
4. Review configuration options

## 🏗 Build Details

- **Framework:** React 19+ with Material-UI
- **Build Tool:** Vite
- **Output:** UMD module (Universal Module Definition)
- **Size:** ~1.4MB (includes all dependencies)
- **Compatibility:** All modern browsers

---

**Happy chatting!** 🤖✨+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
