#!/bin/bash

echo "🔧 Installing authentication packages..."
npm install express-session cookie-parser bcryptjs

echo ""
echo "✅ Installation complete!"
echo ""
echo "🚀 Starting EarnNow server..."
echo ""

node server.js

