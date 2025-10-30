# EarnNow Authentication Setup

## ✅ Authentication System Enabled!

The authentication system has been successfully implemented for EarnNow. You can now use login and signup functionality.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

Or use the setup script:
```bash
npm run setup
```

### 2. Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### 3. Access the Application
Open your browser and go to: **http://localhost:3000**

## 🔐 Test Credentials

A test user has been pre-created for you:

- **Email**: `m.ifwan@gmail.com`
- **Password**: `password123`

You can login with these credentials or create a new account via the signup page.

## 📁 New Files Added

### Authentication Middleware
- **`middleware/auth.js`** - Contains authentication middleware functions:
  - `isAuthenticated` - Protects routes that require login
  - `redirectIfAuthenticated` - Redirects logged-in users away from login/signup pages

### User Storage
- **`models/userStore.js`** - In-memory user storage system:
  - User creation and management
  - Password hashing with bcryptjs
  - User lookup by email and ID
  - Referral code generation
  - Balance tracking (pending, approved, available)

### Environment Configuration
- **`.env`** - Environment variables including session secret

## 🔧 Updated Files

### server.js
Added the following features:
- Session management with express-session
- Cookie parsing with cookie-parser
- POST routes for `/login` and `/signup`
- Protected routes for `/dashboard` and `/rewards`
- Logout functionality at `/logout`
- User authentication and validation

## 🎯 Available Routes

### Public Routes
- `GET /` - Homepage
- `GET /login` - Login page
- `POST /login` - Login form submission
- `GET /signup` - Signup page
- `POST /signup` - Signup form submission
- `GET /merchants` - Merchants page
- `GET /how-it-works` - How it works page
- `GET /tiers` - Membership tiers page

### Protected Routes (Require Login)
- `GET /dashboard` - User dashboard
- `GET /rewards` - User rewards page
- `GET /logout` - Logout and destroy session

## 💾 User Data Structure

Each user has the following properties:
```javascript
{
  id: String,              // Unique user ID
  name: String,            // Full name
  email: String,           // Email address (unique)
  password: String,        // Hashed password
  tier: String,            // Membership tier (Starter, Silver, Gold)
  balance: {
    pending: Number,       // Pending cashback
    approved: Number,      // Approved cashback
    available: Number      // Available for withdrawal
  },
  referralCode: String,    // Unique referral code
  referredBy: String,      // ID of referring user (if any)
  createdAt: Date          // Account creation date
}
```

## 🔒 Security Features

1. **Password Hashing**: All passwords are hashed using bcryptjs with salt rounds of 10
2. **Session Management**: Secure session handling with configurable secret
3. **HTTP-Only Cookies**: Session cookies are HTTP-only to prevent XSS attacks
4. **Session Expiry**: Sessions expire after 24 hours
5. **Input Validation**: Email and password validation on signup/login

## ⚠️ Important Notes

### Current Limitations
- **In-Memory Storage**: User data is stored in memory and will be lost when the server restarts
- **No Database**: This is a temporary solution for development/testing
- **Single Server**: Won't work with multiple server instances

### Production Recommendations
Before deploying to production, you should:
1. Replace in-memory storage with a real database (MongoDB, PostgreSQL, etc.)
2. Change the `SESSION_SECRET` in `.env` to a strong, random value
3. Enable HTTPS and set `cookie.secure` to `true`
4. Add rate limiting to prevent brute force attacks
5. Implement email verification
6. Add password reset functionality
7. Consider using OAuth providers (Google, Facebook, etc.)

## 🧪 Testing the Authentication

### Test Signup Flow
1. Go to http://localhost:3000/signup
2. Fill in the form with:
   - Name: Your Name
   - Email: your@email.com
   - Password: (at least 6 characters)
   - Confirm Password: (same as password)
3. Click "Sign Up"
4. You should be redirected to the dashboard

### Test Login Flow
1. Go to http://localhost:3000/login
2. Enter credentials:
   - Email: m.ifwan@gmail.com
   - Password: password123
3. Click "Login"
4. You should be redirected to the dashboard

### Test Protected Routes
1. Try accessing http://localhost:3000/dashboard without logging in
2. You should be redirected to the login page
3. After logging in, you can access the dashboard and rewards pages

### Test Logout
1. While logged in, click the logout button or go to http://localhost:3000/logout
2. You should be redirected to the homepage
3. Try accessing the dashboard again - you should be redirected to login

## 📝 Next Steps

Now that authentication is working, you can:
1. Integrate with merchant APIs for cashback tracking
2. Implement the rewards calculation system
3. Add referral tracking functionality
4. Create admin panel for managing users and transactions
5. Set up a real database (MongoDB, PostgreSQL, etc.)
6. Add email notifications
7. Implement the tier progression system
8. Add Web3 wallet connection (optional feature)

## 🐛 Troubleshooting

### "Cannot find module" errors
Run: `npm install`

### Session not persisting
Check that cookies are enabled in your browser

### "User already exists" error
The email is already registered. Try a different email or use the login page.

### Server won't start
1. Make sure port 3000 is not already in use
2. Check that all dependencies are installed
3. Look for error messages in the console

## 📞 Support

If you encounter any issues, check:
1. Node.js version (should be 14+ or higher)
2. All dependencies are installed
3. .env file exists with SESSION_SECRET
4. No other process is using port 3000

---

**Created by**: Augment Agent
**Date**: 2025-10-30
**Version**: 1.0

