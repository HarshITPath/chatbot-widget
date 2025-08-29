# 🚀 Quick Integration Guide

## Step 1: Get the Widget File
After building the widget (`npm run build:widget`), you'll find the distributable file at:
```
dist/widget/chatbot-widget.umd.js
```

## Step 2: Copy to Your Project
```bash
# Copy the widget file to your project
cp dist/widget/chatbot-widget.umd.js /path/to/your-project/js/

# Or upload to your CDN/server
```

## Step 3: Add to Your HTML
```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Add before closing </body> tag -->
    <script src="./js/chatbot-widget.umd.js"></script>
    <script>
        ChatbotWidget.init({
            apiUrl: 'https://your-api-endpoint.com/api',
            primaryColor: '#your-brand-color',
            botName: 'Your Assistant'
        });
    </script>
</body>
</html>
```

## Step 4: Test
1. Open your webpage
2. Look for the chat button (usually bottom-right corner)
3. Click to test the widget functionality

## Examples for Different Platforms

### WordPress
Add to your theme's `functions.php`:
```php
function add_chatbot_widget() {
    wp_enqueue_script('chatbot-widget', get_template_directory_uri() . '/js/chatbot-widget.umd.js', array(), '1.0.0', true);
    wp_add_inline_script('chatbot-widget', '
        ChatbotWidget.init({
            apiUrl: "' . get_option('chatbot_api_url') . '",
            primaryColor: "' . get_theme_mod('primary_color', '#1976d2') . '"
        });
    ');
}
add_action('wp_enqueue_scripts', 'add_chatbot_widget');
```

### Shopify
Add to your theme's `theme.liquid` before `</body>`:
```html
<script src="{{ 'chatbot-widget.umd.js' | asset_url }}"></script>
<script>
    ChatbotWidget.init({
        apiUrl: 'https://your-api.com/api',
        primaryColor: '{{ settings.primary_color }}'
    });
</script>
```

### React/Next.js
```jsx
useEffect(() => {
    const script = document.createElement('script');
    script.src = '/js/chatbot-widget.umd.js';
    script.onload = () => {
        window.ChatbotWidget.init({
            apiUrl: process.env.REACT_APP_API_URL
        });
    };
    document.body.appendChild(script);
}, []);
```

## Configuration Options
All available options:
```javascript
ChatbotWidget.init({
    // Required
    apiUrl: 'https://your-api.com/api',
    
    // Appearance
    primaryColor: '#1976d2',
    secondaryColor: '#dc004e',
    botName: 'Assistant',
    botAvatar: '🤖',
    userAvatar: '👤',
    
    // Position & Size
    position: 'bottom-right', // bottom-right, bottom-left, top-right, top-left
    buttonSize: 64,
    zIndex: 1300,
    
    // Content
    greeting: 'Hi! How can I help you?',
    placeholder: 'Type your message...',
    
    // Advanced
    fontFamily: '"Roboto", sans-serif',
    borderRadius: 3,
    shadow: '0 8px 32px rgba(0,0,0,0.12)'
});
```

## Testing
Use the included `widget-test.html` file to test the widget locally:
```bash
# Build the widget
npm run build:widget

# Open widget-test.html in your browser
# The test page will verify the widget works correctly
```

That's it! Your chatbot widget should now be working on your website. 🎉
