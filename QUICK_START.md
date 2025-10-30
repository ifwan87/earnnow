# 🚀 EarnNow - Quick Start Guide

## ✅ Authentication System is Ready!

Your EarnNow application now has a fully functional authentication system!

---

## 📦 Step 1: Install Dependencies

Open your terminal in the project folder and run:

```bash
npm install
```

This will install the required authentication packages:
- express-session
- cookie-parser  
- bcryptjs

---

## 🎯 Step 2: Start the Server

```bash
npm start
```

You should see:
```
🚀 EarnNow server running on http://localhost:3000
```

---

## 🔐 Step 3: Login

Open your browser and go to: **http://localhost:3000/login**

Use these credentials:
- **Email**: `m.ifwan@gmail.com`
- **Password**: `password123`

---

## 🎉 That's It!

You're now logged in and can access:
- **Dashboard**: http://localhost:3000/dashboard
- **Rewards**: http://localhost:3000/rewards
- **Merchants**: http://localhost:3000/merchants

---

## 📝 To Commit to GitHub

```bash
git add .
git commit -m "feat: Enable authentication system"
git push origin main
```

---

## 📚 More Information

- **SETUP_INSTRUCTIONS.md** - Complete setup guide
- **AUTH_SETUP.md** - Detailed authentication documentation
- **PRD_EarnNow_v1.md** - Product requirements

---

## 🆘 Having Issues?

### Can't install packages?
```bash
npm cache clean --force
npm install
```

### Port 3000 in use?
Edit `.env` and change `PORT=3000` to `PORT=3001`

### Session not working?
Clear your browser cookies and restart the server

---

**Happy coding! 🎊**

