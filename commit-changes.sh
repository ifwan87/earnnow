#!/bin/bash

echo "🔍 Checking git status..."
git status

echo ""
echo "📝 Adding all changes..."
git add .

echo ""
echo "💾 Committing changes..."
git commit -m "feat: Enable authentication system with login/signup functionality

- Add express-session, cookie-parser, and bcryptjs for authentication
- Create authentication middleware (middleware/auth.js)
- Implement in-memory user storage system (models/userStore.js)
- Add POST routes for /login and /signup with validation
- Enable protected routes for /dashboard and /rewards
- Add logout functionality
- Create .env file for session configuration
- Add test user: m.ifwan@gmail.com / password123
- Include comprehensive AUTH_SETUP.md documentation

This resolves the authentication issues and enables full user management."

echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Done! Changes have been committed and pushed to GitHub."

