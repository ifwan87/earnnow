# 🔧 Fix "Cannot GET /signup" Error

## The Problem

You're getting "Cannot GET /signup" because the authentication packages are not installed yet.

## The Solution (3 Simple Steps)

### Step 1: Stop Any Running Server

If you have a server running, press `Ctrl+C` in the terminal to stop it.

### Step 2: Install Required Packages

Open your terminal in the project folder and run:

```bash
npm install express-session cookie-parser bcryptjs
```

Wait for the installation to complete (it may take 30-60 seconds).

### Step 3: Start the Server

```bash
npm start
```

You should see:
```
🚀 EarnNow server running on http://localhost:3000
✅ Authentication system enabled!
🔐 Test login: m.ifwan@gmail.com / password123
```

### Step 4: Test in Browser

Go to: **http://localhost:3000/login**

Login with:
- Email: `m.ifwan@gmail.com`
- Password: `password123`

---

## Alternative: Use the Install Script

I've created a script that does everything for you:

```bash
chmod +x install-and-run.sh
./install-and-run.sh
```

---

## Check if Packages are Installed

Run this to verify:

```bash
node check-packages.js
```

This will show you which packages are installed and which are missing.

---

## About the CSP Warnings

The Content Security Policy warnings you see are just warnings, not errors. They won't prevent the app from working. They're related to browser dev tools and external fonts.

You can ignore them for now. They look like this:
```
Refused to load the font 'https://r2cdn.perplexity.ai/fonts/...'
```

These are just browser console warnings and don't affect functionality.

---

## Still Having Issues?

### Error: "Cannot find module 'express-session'"

**Solution**: Run `npm install express-session cookie-parser bcryptjs`

### Error: "Port 3000 is already in use"

**Solution**: 
1. Stop any other server running on port 3000
2. Or change the port in `.env` file: `PORT=3001`

### Error: "Cannot GET /login" or "Cannot GET /signup"

**Solution**: 
1. Make sure the server is running (`npm start`)
2. Check that packages are installed (`node check-packages.js`)
3. Restart the server

### Server starts but pages don't load

**Solution**:
1. Clear browser cache
2. Try in incognito/private mode
3. Check browser console for errors

---

## Quick Verification Checklist

- [ ] Packages installed? Run: `npm install`
- [ ] Server running? Run: `npm start`
- [ ] Correct URL? Use: `http://localhost:3000/login`
- [ ] Browser cache cleared?

---

## Expected Behavior

When everything is working:

1. **Homepage** (http://localhost:3000) - Should load
2. **Login** (http://localhost:3000/login) - Should show login form
3. **Signup** (http://localhost:3000/signup) - Should show signup form
4. **Dashboard** (http://localhost:3000/dashboard) - Should redirect to login if not logged in

---

## Need More Help?

Run these diagnostic commands:

```bash
# Check if packages are installed
node check-packages.js

# Check Node.js version (should be 14+)
node --version

# Check npm version
npm --version

# List installed packages
npm list --depth=0
```

---

**The main issue is that the authentication packages need to be installed first!**

Run: `npm install express-session cookie-parser bcryptjs`

Then: `npm start`

That should fix it! 🎉

