require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.render('index', { 
    title: 'EarnNow - Shop and earn real cashback first, crypto when you\'re ready',
    user: null 
  });
});

app.get('/merchants', (req, res) => {
  res.render('merchants', { 
    title: 'Merchants - EarnNow',
    user: null 
  });
});

app.get('/how-it-works', (req, res) => {
  res.render('how-it-works', { 
    title: 'How It Works - EarnNow',
    user: null 
  });
});

app.get('/rewards', (req, res) => {
  res.render('rewards', { 
    title: 'Your Rewards - EarnNow',
    user: null 
  });
});

app.get('/tiers', (req, res) => {
  res.render('tiers', { 
    title: 'Membership Tiers - EarnNow',
    user: null 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 EarnNow server running on http://localhost:${PORT}`);
});
