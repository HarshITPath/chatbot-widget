#!/bin/bash

# Chatbot Widget Deployment Script

echo "🤖 Chatbot Widget - Deployment Helper"
echo "======================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the project root?"
    exit 1
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Please fix errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"

# Check if vercel CLI is installed
if command -v vercel &> /dev/null; then
    echo ""
    echo "🚀 Vercel CLI detected!"
    echo "Would you like to deploy now? (y/n)"
    read -r deploy_choice
    
    if [ "$deploy_choice" = "y" ] || [ "$deploy_choice" = "Y" ]; then
        echo "🚀 Deploying to Vercel..."
        vercel --prod
        
        if [ $? -eq 0 ]; then
            echo ""
            echo "🎉 Deployment successful!"
            echo ""
            echo "Your widget is now available at:"
            echo "📱 Demo: https://your-project.vercel.app"
            echo "📦 CDN: https://your-project.vercel.app/widget/chatbot-widget.umd.js"
            echo ""
            echo "Integration example:"
            echo '<script src="https://your-project.vercel.app/widget/chatbot-widget.umd.js"></script>'
            echo '<script>ChatbotWidget.init();</script>'
        else
            echo "❌ Deployment failed. Please check the error messages above."
        fi
    else
        echo "⏭️  Skipping deployment. Run 'vercel --prod' when ready."
    fi
else
    echo ""
    echo "📝 Next steps for deployment:"
    echo "1. Install Vercel CLI: npm install -g vercel"
    echo "2. Login: vercel login"
    echo "3. Deploy: vercel --prod"
    echo ""
    echo "Or upload the 'dist' folder to any static hosting service."
fi

echo ""
echo "📋 Files ready for deployment:"
ls -la dist/

echo ""
echo "✨ Deployment preparation complete!"
