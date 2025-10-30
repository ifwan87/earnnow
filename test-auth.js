// Quick test to verify authentication modules load correctly
console.log('Testing authentication modules...\n');

try {
  const userStore = require('./models/userStore');
  console.log('✓ userStore loaded successfully');
  
  const auth = require('./middleware/auth');
  console.log('✓ auth middleware loaded successfully');
  
  const bcrypt = require('bcryptjs');
  console.log('✓ bcryptjs loaded successfully');
  
  const session = require('express-session');
  console.log('✓ express-session loaded successfully');
  
  const cookieParser = require('cookie-parser');
  console.log('✓ cookie-parser loaded successfully');
  
  console.log('\n✅ All authentication modules loaded successfully!');
  console.log('\nTest user credentials:');
  console.log('Email: m.ifwan@gmail.com');
  console.log('Password: password123');
  
} catch (error) {
  console.error('❌ Error loading modules:', error.message);
  process.exit(1);
}

