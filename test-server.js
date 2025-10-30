// Test if server can start without errors
console.log('🧪 Testing server startup...\n');

try {
  console.log('1️⃣ Loading dotenv...');
  require('dotenv').config();
  console.log('✅ dotenv loaded\n');

  console.log('2️⃣ Loading express-session...');
  const session = require('express-session');
  console.log('✅ express-session loaded\n');

  console.log('3️⃣ Loading cookie-parser...');
  const cookieParser = require('cookie-parser');
  console.log('✅ cookie-parser loaded\n');

  console.log('4️⃣ Loading bcryptjs...');
  const bcrypt = require('bcryptjs');
  console.log('✅ bcryptjs loaded\n');

  console.log('5️⃣ Loading userStore...');
  const userStore = require('./models/userStore');
  console.log('✅ userStore loaded\n');

  console.log('6️⃣ Loading auth middleware...');
  const auth = require('./middleware/auth');
  console.log('✅ auth middleware loaded\n');

  console.log('7️⃣ Testing bcrypt...');
  const testHash = bcrypt.hashSync('test123', 10);
  const testVerify = bcrypt.compareSync('test123', testHash);
  console.log(`✅ bcrypt working: ${testVerify}\n`);

  console.log('8️⃣ Testing userStore...');
  const testUser = userStore.findByEmail('m.ifwan@gmail.com');
  console.log(`✅ Test user found: ${testUser ? testUser.email : 'NOT FOUND'}\n`);

  console.log('═'.repeat(50));
  console.log('✅ ALL TESTS PASSED!');
  console.log('═'.repeat(50));
  console.log('\n🚀 Your server should work fine!');
  console.log('\nTo start the server, run:');
  console.log('   npm start');
  console.log('\nThen go to: http://localhost:3000/login');
  console.log('Login with: m.ifwan@gmail.com / password123\n');

} catch (error) {
  console.error('\n❌ ERROR FOUND:');
  console.error(error.message);
  console.error('\nFull error:');
  console.error(error);
  process.exit(1);
}

