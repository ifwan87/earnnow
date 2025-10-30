#!/bin/bash

echo "🔍 EarnNow Server Startup Script"
echo ""
echo "📦 Installing required packages..."
npm install express-session cookie-parser bcryptjs

echo ""
echo "✨ Starting server..."
echo ""
node server.js
