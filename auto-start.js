#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 EarnNow Auto-Start Script\n');

const projectDir = __dirname;

try {
  console.log('📦 Installing required packages...');
  execSync('npm install express-session cookie-parser bcryptjs', { 
    cwd: projectDir,
    stdio: 'inherit' 
  });
  
  console.log('\n✅ Packages installed successfully!\n');
  console.log('🌟 Starting server...\n');
  
  // Start the server
  require('./server.js');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
