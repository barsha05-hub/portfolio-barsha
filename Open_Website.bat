@echo off
echo ===================================================
echo   Starting Cinematic Portfolio & AI Chatbot...
echo ===================================================
echo.

REM Check if node_modules exists, if not install dependencies
if not exist "node_modules\" (
    echo [1/2] Installing necessary files (this runs only once)...
    call npm install
) else (
    echo [1/2] Files already installed. Skipping...
)

echo.
echo [2/2] Launching Server...
echo.
echo The website will open in your browser shortly...
echo Press Ctrl+C to stop the server.
echo.

REM Open browser after 3 seconds
timeout /t 3 >nul
start http://localhost:3000

REM Start the server
node server.js
pause
