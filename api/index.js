const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Views (use project root so it works in serverless)
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Static (Vercel serves /public automatically, but keep express for local parity)
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index', { title: 'EarnNow - Shop and earn real cashback first, crypto when you\'re ready', user: null });
});
app.get('/merchants', (req, res) => res.render('merchants', { title: 'Merchants - EarnNow', user: null }));
app.get('/how-it-works', (req, res) => res.render('how-it-works', { title: 'How It Works - EarnNow', user: null }));
app.get('/rewards', (req, res) => res.render('rewards', { title: 'Your Rewards - EarnNow', user: null }));
app.get('/tiers', (req, res) => res.render('tiers', { title: 'Membership Tiers - EarnNow', user: null }));

module.exports = app;