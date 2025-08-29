@echo off
echo 🤖 Chatbot Widget - Deployment Helper
echo ======================================

REM Check if package.json exists
if not exist "package.json" (
    echo ❌ Error: package.json not found. Are you in the project root?
    pause
    exit /b 1
)

REM Build the project
echo 📦 Building project...
call npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Please fix errors and try again.
    pause
    exit /b 1
)

echo ✅ Build completed successfully!

REM Check if vercel CLI is available
vercel --version >nul 2>&1
if %errorlevel% equ 0 (
    echo.
    echo 🚀 Vercel CLI detected!
    set /p deploy_choice="Would you like to deploy now? (y/n): "
    
    if /i "%deploy_choice%"=="y" (
        echo 🚀 Deploying to Vercel...
        call vercel --prod
        
        if %errorlevel% equ 0 (
            echo.
            echo 🎉 Deployment successful!
            echo.
            echo Your widget is now available at:
            echo 📱 Demo: https://your-project.vercel.app
            echo 📦 CDN: https://your-project.vercel.app/widget/chatbot-widget.umd.js
            echo.
            echo Integration example:
            echo ^<script src="https://your-project.vercel.app/widget/chatbot-widget.umd.js"^>^</script^>
            echo ^<script^>ChatbotWidget.init();^</script^>
        ) else (
            echo ❌ Deployment failed. Please check the error messages above.
        )
    ) else (
        echo ⏭️ Skipping deployment. Run 'vercel --prod' when ready.
    )
) else (
    echo.
    echo 📝 Next steps for deployment:
    echo 1. Install Vercel CLI: npm install -g vercel
    echo 2. Login: vercel login
    echo 3. Deploy: vercel --prod
    echo.
    echo Or upload the 'dist' folder to any static hosting service.
)

echo.
echo 📋 Files ready for deployment:
dir dist

echo.
echo ✨ Deployment preparation complete!
pause
