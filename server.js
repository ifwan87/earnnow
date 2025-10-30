require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const userStore = require('./models/userStore');
const { isAuthenticated, redirectIfAuthenticated } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Static files
app.use(express.static(path.join(process.cwd(), 'public')));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'earnnow-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'EarnNow - Shop and earn real cashback first, crypto when you\'re ready',
    user: null
  });
});

app.get('/signup', redirectIfAuthenticated, (req, res) => {
  res.render('signup', {
    title: 'Sign Up - EarnNow',
    error: null,
    user: null
  });
});

app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.render('signup', {
        title: 'Sign Up - EarnNow',
        error: 'All fields are required',
        user: null
      });
    }

    if (password !== confirmPassword) {
      return res.render('signup', {
        title: 'Sign Up - EarnNow',
        error: 'Passwords do not match',
        user: null
      });
    }

    if (password.length < 6) {
      return res.render('signup', {
        title: 'Sign Up - EarnNow',
        error: 'Password must be at least 6 characters',
        user: null
      });
    }

    // Create user
    const user = await userStore.createUser({ name, email, password });

    // Set session
    req.session.userId = user.id;

    // Redirect to dashboard
    res.redirect('/dashboard');
  } catch (error) {
    res.render('signup', {
      title: 'Sign Up - EarnNow',
      error: error.message || 'An error occurred during signup',
      user: null
    });
  }
});

app.get('/login', redirectIfAuthenticated, (req, res) => {
  res.render('login', {
    title: 'Login - EarnNow',
    error: null,
    user: null
  });
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.render('login', {
        title: 'Login - EarnNow',
        error: 'Email and password are required',
        user: null
      });
    }

    // Find user
    const user = userStore.findByEmail(email);
    if (!user) {
      return res.render('login', {
        title: 'Login - EarnNow',
        error: 'Invalid email or password',
        user: null
      });
    }

    // Verify password
    const isValidPassword = await userStore.verifyPassword(password, user.password);
    if (!isValidPassword) {
      return res.render('login', {
        title: 'Login - EarnNow',
        error: 'Invalid email or password',
        user: null
      });
    }

    // Set session
    req.session.userId = user.id;

    // Redirect to dashboard
    res.redirect('/dashboard');
  } catch (error) {
    res.render('login', {
      title: 'Login - EarnNow',
      error: 'An error occurred during login',
      user: null
    });
  }
});

app.get('/merchants', isAuthenticated, (req, res) => {
  const user = userStore.findById(req.session.userId);

  // Merchants data with actual URLs and local images
  const merchants = [
    {
      name: 'Shopee Official Store',
      logo: '/images/stores/shopeee.jpeg',
      cashback: 'Up to 35% Cashback',
      category: 'E-commerce',
      url: 'https://shopee.com.my',
      badge: 'Updated',
      tier: 'Plus',
      bonus: '3.5% • Ends in 3 days'
    },
    {
      name: 'Expedia',
      logo: '/images/stores/expedia-v1.jpeg',
      cashback: 'Up to 8% Cashback',
      category: 'Travel Deals',
      url: 'https://www.expedia.com.my',
      badge: 'Updated',
      tier: 'Plus',
      bonus: '5% • Travel Deals'
    },
    {
      name: 'Lazada',
      logo: '/images/stores/Lazada.jpeg',
      cashback: 'Up to 18% Cashback',
      category: 'E-commerce',
      url: 'https://www.lazada.com.my',
      badge: 'Updated',
      tier: 'Plus',
      bonus: '18.5% • Ends in 46:41'
    },
    {
      name: 'Agoda',
      logo: '/images/stores/agoda.jpeg',
      cashback: 'Up to 4% Cashback',
      category: 'Hotels & Travel',
      url: 'https://www.agoda.com',
      tier: 'Plus',
      bonus: '6.5%'
    },
    {
      name: 'Trip.com',
      logo: '/images/stores/Trip.com_Icon_2022.png',
      cashback: 'Up to 6% Cashback',
      category: 'Travel',
      url: 'https://www.trip.com',
      tier: 'Plus',
      bonus: '6.5%'
    },
    {
      name: 'foodpanda',
      logo: '/images/stores/Foodpanda.jpeg',
      cashback: 'Up to RM6 Cashback',
      category: 'Food Delivery',
      url: 'https://www.foodpanda.my',
      badge: 'Updated'
    },
    {
      name: 'Booking.com',
      logo: '/images/stores/booking.png',
      cashback: '9% Cashback',
      category: 'Hotels & Accommodation',
      url: 'https://www.booking.com',
      badge: 'Updated'
    },
    {
      name: 'Klook',
      logo: '/images/stores/klook.png',
      cashback: 'Up to 25% Cashback',
      category: 'Activities & Tours',
      url: 'https://www.klook.com',
      badge: 'Updated'
    },
    {
      name: 'SHEIN',
      logo: '/images/stores/shein.png',
      cashback: 'Up to 7.5% Cashback',
      category: 'Fashion',
      url: 'https://www.shein.com'
    },
    {
      name: 'AirAsia',
      logo: '/images/stores/AirAsia_Logo.svg.png',
      cashback: 'Up to 3% Cashback',
      category: 'Airlines',
      url: 'https://www.airasia.com',
      tier: 'Plus',
      bonus: '2.5%'
    },
    {
      name: 'Malaysia Airlines',
      logo: '/images/stores/malaysia airlinw.png',
      cashback: 'Up to 2% Cashback',
      category: 'Airlines',
      url: 'https://www.malaysiaairlines.com'
    },
    {
      name: 'Watsons',
      logo: '/images/stores/logo_watsons_mobile.avif',
      cashback: 'Up to 8% Cashback',
      category: 'Health & Beauty',
      url: 'https://www.watsons.com.my',
      tier: 'Plus',
      bonus: '4.5%'
    },
    {
      name: 'Adidas',
      logo: '/images/stores/adidas-white-logo-hd-png-701751694777208ogwssxbgpj.png',
      cashback: 'Up to 12% Cashback',
      category: 'Sports & Fashion',
      url: 'https://www.adidas.com.my',
      tier: 'Plus',
      bonus: '8% • Limited Time'
    },
    {
      name: 'Uniqlo',
      logo: '/images/stores/uniqlo-v1.jpeg',
      cashback: 'Up to 5% Cashback',
      category: 'Fashion',
      url: 'https://www.uniqlo.com/my'
    },
    {
      name: 'Zalora',
      logo: '/images/stores/Zalora_sg.jpg',
      cashback: 'Up to 15% Cashback',
      category: 'Fashion',
      url: 'https://www.zalora.com.my',
      badge: 'Updated',
      tier: 'Plus',
      bonus: '10% • Fashion Week'
    }
  ];

  res.render('merchants', {
    title: 'Merchants - EarnNow',
    user: user,
    merchants: merchants
  });
});

app.get('/how-it-works', (req, res) => {
  res.render('how-it-works', { 
    title: 'How It Works - EarnNow',
    user: null
  });
});

app.get('/tiers', (req, res) => {
  res.render('tiers', { 
    title: 'Membership Tiers - EarnNow',
    user: null
  });
});

// Protected routes
app.get('/dashboard', isAuthenticated, (req, res) => {
  const user = userStore.findById(req.session.userId);

  // Calculate total earned (sum of all balance types)
  const totalEarned = user.balance.pending + user.balance.approved + user.balance.available;

  // Sample transactions (empty for now - will be populated when merchant integration is done)
  const transactions = [];

  res.render('dashboard', {
    title: 'Dashboard - EarnNow',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      tier: user.tier,
      balance: user.balance,
      referralCode: user.referralCode,
      // Add properties expected by dashboard.ejs
      totalEarned: totalEarned,
      approvedCashback: user.balance.available,
      pendingCashback: user.balance.pending
    },
    transactions: transactions
  });
});

app.get('/rewards', isAuthenticated, (req, res) => {
  const user = userStore.findById(req.session.userId);

  // Calculate total earned
  const totalEarned = user.balance.pending + user.balance.approved + user.balance.available;

  // Sample transactions (empty for now - will be populated when merchant integration is done)
  const transactions = [];

  res.render('rewards', {
    title: 'Your Rewards - EarnNow',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      tier: user.tier,
      balance: user.balance,
      // Add properties that might be expected by rewards.ejs
      totalEarned: totalEarned,
      approvedCashback: user.balance.available,
      pendingCashback: user.balance.pending
    },
    transactions: transactions
  });
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
});

// Export for Vercel
module.exports = app;

// Local development server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 EarnNow server running on http://localhost:${PORT}`);
    console.log(`✅ Authentication system enabled!`);
    console.log(`🔐 Test login: m.ifwan@gmail.com / password123`);
  });
}
