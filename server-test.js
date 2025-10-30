require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001; // Fresh port for testing

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

// Static files
app.use(express.static(path.join(process.cwd(), 'public')));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('📁 Views directory:', path.join(process.cwd(), 'views'));
console.log('📁 Public directory:', path.join(process.cwd(), 'public'));

// Routes
app.get('/', (req, res) => {
  console.log('✅ GET / - Homepage accessed');
  res.render('index', { 
    title: 'EarnNow - Shop and earn real cashback first, crypto when you\'re ready',
    user: null
  });
});

app.get('/signup', (req, res) => {
  console.log('✅ GET /signup - Signup page accessed');
  res.render('signup', { 
    title: 'Sign Up - EarnNow',
    error: null,
    user: null
  });
});

app.get('/login', (req, res) => {
  console.log('✅ GET /login - Login page accessed');
  res.render('login', { 
    title: 'Login - EarnNow',
    error: null,
    user: null
  });
});

app.get('/merchants', (req, res) => {
  console.log('✅ GET /merchants - Merchants page accessed');
  res.render('merchants', { 
    title: 'Merchants - EarnNow',
    user: null
  });
});

app.get('/how-it-works', (req, res) => {
  console.log('✅ GET /how-it-works - How It Works page accessed');
  res.render('how-it-works', { 
    title: 'How It Works - EarnNow',
    user: null
  });
});

app.get('/tiers', (req, res) => {
  console.log('✅ GET /tiers - Tiers page accessed');
  res.render('tiers', { 
    title: 'Membership Tiers - EarnNow',
    user: null
  });
});

// Test route to verify server is working
app.get('/test', (req, res) => {
  res.json({ 
    status: 'Server is running!',
    port: PORT,
    message: 'If you can see this, the server is working perfectly!' 
  });
});

// 404 handler - this will catch any routes that don't exist
app.use((req, res) => {
  console.log('❌ 404 - Route not found:', req.url);
  res.status(404).send(`
    <h1>404 - Page Not Found</h1>
    <p>The route "${req.url}" does not exist.</p>
    <p><a href="/">Go back to homepage</a></p>
  `);
});

// Error handler
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).send(`
    <h1>500 - Server Error</h1>
    <p>Something went wrong!</p>
    <pre>${err.message}</pre>
  `);
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log('\n' + '='.repeat(50));
    console.log('🚀 EarnNow TEST SERVER running on port 3001');
    console.log('='.repeat(50));
    console.log(`📍 Open: http://localhost:${PORT}`);
    console.log(`🧪 Test endpoint: http://localhost:${PORT}/test`);
    console.log(`📝 Signup page: http://localhost:${PORT}/signup`);
    console.log('='.repeat(50) + '\n');
  });
}

module.exports = app;
