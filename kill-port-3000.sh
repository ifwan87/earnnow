#!/bin/bash

echo "🔍 Checking what's running on port 3000..."
lsof -i:3000

echo ""
echo "🔪 Killing process on port 3000..."
lsof -ti:3000 | xargs kill -9

echo ""
echo "✅ Port 3000 is now free!"
echo ""
echo "🚀 Starting server..."
npm start

