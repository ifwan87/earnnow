require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const userStore = require('../models/userStore');
const { isAuthenticated, redirectIfAuthenticated } = require('../middleware/auth');

const app = express();

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

    // Check if user already exists
    if (userStore.findByEmail(email)) {
      return res.render('signup', {
        title: 'Sign Up - EarnNow',
        error: 'Email already registered',
        user: null
      });
    }

    // Create user
    const user = await userStore.create({ name, email, password });

    // Set session
    req.session.userId = user.id;

    // Redirect to dashboard
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Signup error:', error);
    res.render('signup', {
      title: 'Sign Up - EarnNow',
      error: 'An error occurred during signup',
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
    const isValid = await userStore.verifyPassword(password, user.password);
    if (!isValid) {
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
    console.error('Login error:', error);
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
      logo: '/images/stores/shopee-v1.png',
      cashback: 'Up to 35% Cashback',
      bonus: 'Plus 3.5% • Ends in 3 days',
      category: 'E-commerce',
      url: 'https://shopee.com.my'
    },
    {
      name: 'Expedia',
      logo: '/images/stores/expedia-v1.jpeg',
      cashback: 'Up to 8% Cashback',
      bonus: 'Plus 5% • Travel Deals',
      category: 'Travel Deals',
      url: 'https://www.expedia.com.my'
    },
    {
      name: 'Lazada',
      logo: '/images/stores/lazada-v1.png',
      cashback: 'Up to 18% Cashback',
      bonus: 'Plus 18.5% • Ends in 46:41',
      category: 'E-commerce',
      url: 'https://www.lazada.com.my'
    },
    {
      name: 'Agoda',
      logo: '/images/stores/agoda-v1.png',
      cashback: 'Up to 4% Cashback',
      bonus: 'Plus 6.5%',
      category: 'Hotels & Travel',
      url: 'https://www.agoda.com'
    },
    {
      name: 'Trip.com',
      logo: '/images/stores/trip-v1.png',
      cashback: 'Up to 6% Cashback',
      bonus: 'Plus 6.5%',
      category: 'Travel',
      url: 'https://www.trip.com'
    },
    {
      name: 'foodpanda',
      logo: '/images/stores/Foodpanda-v1.png',
      cashback: 'Up to RM6 Cashback',
      bonus: '',
      category: 'Food Delivery',
      url: 'https://www.foodpanda.my'
    },
    {
      name: 'Booking.com',
      logo: '/images/stores/booking-v1.png',
      cashback: '9% Cashback',
      bonus: '',
      category: 'Hotels & Accommodation',
      url: 'https://www.booking.com'
    },
    {
      name: 'Klook',
      logo: '/images/stores/klook-v1.png',
      cashback: 'Up to 25% Cashback',
      bonus: '',
      category: 'Activities & Tours',
      url: 'https://www.klook.com'
    },
    {
      name: 'SHEIN',
      logo: '/images/stores/shein-v1.png',
      cashback: 'Up to 12% Cashback',
      bonus: '',
      category: 'Fashion',
      url: 'https://www.shein.com'
    },
    {
      name: 'AirAsia',
      logo: '/images/stores/airasia-v1.png',
      cashback: 'Up to 3% Cashback',
      bonus: '',
      category: 'Airlines',
      url: 'https://www.airasia.com'
    },
    {
      name: 'Malaysia Airlines',
      logo: '/images/stores/malaysia-airlines-v1.png',
      cashback: 'Up to 2% Cashback',
      bonus: '',
      category: 'Airlines',
      url: 'https://www.malaysiaairlines.com'
    },
    {
      name: 'Watsons',
      logo: '/images/stores/watsons-v1.png',
      cashback: 'Up to 8% Cashback',
      bonus: '',
      category: 'Health & Beauty',
      url: 'https://www.watsons.com.my'
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

  // Mock transactions
  const transactions = [
    { merchant: 'Shopee', amount: 25.50, status: 'approved', date: '2024-01-15' },
    { merchant: 'Lazada', amount: 18.75, status: 'pending', date: '2024-01-14' },
    { merchant: 'Grab', amount: 12.30, status: 'approved', date: '2024-01-13' }
  ];

  res.render('dashboard', {
    title: 'Dashboard - EarnNow',
    user: user,
    balance: {
      pending: user.balance.pending,
      approved: user.balance.approved,
      available: user.balance.available,
      totalEarned: totalEarned
    },
    transactions: transactions
  });
});

app.get('/rewards', isAuthenticated, (req, res) => {
  const user = userStore.findById(req.session.userId);

  // Calculate total earned
  const totalEarned = user.balance.pending + user.balance.approved + user.balance.available;

  // Mock transactions
  const transactions = [
    { merchant: 'Shopee', amount: 25.50, status: 'approved', date: '2024-01-15' },
    { merchant: 'Lazada', amount: 18.75, status: 'pending', date: '2024-01-14' },
    { merchant: 'Grab', amount: 12.30, status: 'approved', date: '2024-01-13' }
  ];

  res.render('rewards', {
    title: 'Your Rewards - EarnNow',
    user: user,
    balance: user.balance,
    totalEarned: totalEarned,
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

module.exports = (req, res) => app(req, res);