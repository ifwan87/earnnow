#!/usr/bin/env node

// Simple diagnostic script
console.log('🔍 EarnNow Server Diagnostic\n');

// Check if views exist
const fs = require('fs');
const path = require('path');

const viewsPath = path.join(__dirname, 'views');
const requiredViews = ['signup.ejs', 'login.ejs', 'dashboard.ejs', 'index.ejs'];

console.log('Checking views folder:', viewsPath);
requiredViews.forEach(view => {
  const exists = fs.existsSync(path.join(viewsPath, view));
  console.log(`  ${exists ? '✅' : '❌'} ${view}`);
});

console.log('\n📦 Checking required packages...');
try {
  require('express');
  console.log('  ✅ express');
} catch (e) {
  console.log('  ❌ express - Run: npm install express');
}

try {
  require('ejs');
  console.log('  ✅ ejs');
} catch (e) {
  console.log('  ❌ ejs - Run: npm install ejs');
}

try {
  require('express-session');
  console.log('  ✅ express-session');
} catch (e) {
  console.log('  ❌ express-session - Run: npm install express-session');
}

try {
  require('bcryptjs');
  console.log('  ✅ bcryptjs');
} catch (e) {
  console.log('  ❌ bcryptjs - Run: npm install bcryptjs');
}

console.log('\n✨ Starting server...\n');
require('./server.js');
