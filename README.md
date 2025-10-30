# 🎯 EarnNow - Shop and Earn Cashback

A shopping rewards platform that gives you real cashback first, with optional crypto features when you're ready.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- express-session
- cookie-parser
- bcryptjs
- And all other dependencies

### 2. Start the Server

```bash
npm start
```

### 3. Open in Browser

Go to: **http://localhost:3000**

## 🔐 Test Login

A test account has been created for you:

- **Email**: `m.ifwan@gmail.com`
- **Password**: `password123`

Login at: http://localhost:3000/login

## 📁 Project Structure

```
earnnow/
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   └── userStore.js         # User storage system
├── views/
│   ├── index.ejs            # Homepage
│   ├── login.ejs            # Login page
│   ├── signup.ejs           # Signup page
│   ├── dashboard.ejs        # User dashboard
│   ├── rewards.ejs          # Rewards page
│   ├── merchants.ejs        # Merchants page
│   ├── how-it-works.ejs     # How it works
│   └── tiers.ejs            # Membership tiers
├── public/
│   ├── css/                 # Stylesheets
│   ├── js/                  # JavaScript files
│   └── images/              # Images
├── server.js                # Main server file
├── .env                     # Environment variables
└── package.json             # Dependencies
```

## 🎯 Available Routes

### Public Routes
- `GET /` - Homepage
- `GET /login` - Login page
- `POST /login` - Login submission
- `GET /signup` - Signup page
- `POST /signup` - Signup submission
- `GET /merchants` - Browse merchants
- `GET /how-it-works` - How it works
- `GET /tiers` - Membership tiers

### Protected Routes (Require Login)
- `GET /dashboard` - User dashboard
- `GET /rewards` - User rewards
- `GET /logout` - Logout

## 🔧 Development

### Run with Auto-Reload

```bash
npm run dev
```

### Build CSS

```bash
npm run build
```

### Watch CSS Changes

```bash
npm run build:css
```

## 🐛 Troubleshooting

### "Cannot GET /signup" or "Cannot GET /login"

**Solution**: Install the authentication packages:
```bash
npm install express-session cookie-parser bcryptjs
```

Then restart the server:
```bash
npm start
```

### Port 3000 Already in Use

Edit `.env` and change the port:
```
PORT=3001
```

### Packages Not Installing

Try:
```bash
npm cache clean --force
npm install
```

### Check Package Installation

Run:
```bash
node check-packages.js
```

## 📚 Documentation

- **FIX_ERROR.md** - Troubleshooting guide for common errors
- **QUICK_START.md** - Quick start guide
- **SETUP_INSTRUCTIONS.md** - Detailed setup instructions
- **AUTH_SETUP.md** - Authentication system documentation
- **PRD_EarnNow_v1.md** - Product requirements document

## 🔒 Security Features

- ✅ Password hashing with bcryptjs
- ✅ HTTP-only session cookies
- ✅ Session expiry (24 hours)
- ✅ Input validation
- ✅ Protected routes with middleware

## ⚠️ Important Notes

### Current Setup (Development)
- User data is stored in memory (will reset on server restart)
- Not production-ready
- For development and testing only

### For Production
Before deploying to production:
1. Replace in-memory storage with a database (MongoDB/PostgreSQL)
2. Change `SESSION_SECRET` in `.env` to a strong random value
3. Enable HTTPS
4. Add rate limiting
5. Implement email verification
6. Add password reset functionality

## 🎊 Features

### Current Features
- ✅ User registration and login
- ✅ Session management
- ✅ Protected routes
- ✅ User dashboard
- ✅ Rewards tracking (UI ready)
- ✅ Membership tiers (UI ready)
- ✅ Merchant browsing (UI ready)

### Planned Features
- [ ] Real merchant API integration
- [ ] Cashback calculation
- [ ] Referral system
- [ ] Tier progression
- [ ] Email notifications
- [ ] Web3 wallet connection (optional)
- [ ] Crypto conversion (optional)

## 🚀 Next Steps

1. **Test the Authentication**
   - Login with test account
   - Create a new account
   - Test protected routes

2. **Integrate Merchant APIs**
   - Connect to Shopee, Lazada, Agoda
   - Track purchases
   - Calculate cashback

3. **Implement Rewards System**
   - Pending → Approved → Available flow
   - Tier progression logic
   - Referral tracking

4. **Set Up Database**
   - Choose MongoDB or PostgreSQL
   - Migrate from in-memory storage
   - Add data persistence

## 📞 Support

If you encounter any issues:

1. Check **FIX_ERROR.md** for common solutions
2. Run `node check-packages.js` to verify installation
3. Check the browser console for errors
4. Make sure Node.js version is 14 or higher

## 📝 Scripts

- `npm start` - Start the server
- `npm run dev` - Start with auto-reload (nodemon)
- `npm run build` - Build CSS (production)
- `npm run build:css` - Watch and build CSS (development)
- `npm run setup` - Install auth packages and start server

## 🌟 Tech Stack

- **Backend**: Node.js + Express
- **Frontend**: EJS templates
- **Styling**: TailwindCSS
- **Authentication**: express-session + bcryptjs
- **Environment**: dotenv

## 📄 License

ISC

---

**Created for**: m.ifwan@gmail.com  
**Version**: 1.0  
**Last Updated**: 2025-10-30

---

## 🎉 Getting Started Checklist

- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Open http://localhost:3000
- [ ] Login with m.ifwan@gmail.com / password123
- [ ] Explore the dashboard
- [ ] Test signup with a new account
- [ ] Check the rewards page
- [ ] Browse merchants

**Happy coding! 🚀**

