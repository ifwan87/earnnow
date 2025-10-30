const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Installing authentication packages...\n');

// Check if packages are already installed
const packagesToCheck = ['express-session', 'cookie-parser', 'bcryptjs'];
const missingPackages = [];

packagesToCheck.forEach(pkg => {
  const pkgPath = path.join(__dirname, 'node_modules', pkg);
  if (!fs.existsSync(pkgPath)) {
    missingPackages.push(pkg);
    console.log(`❌ ${pkg} - NOT INSTALLED`);
  } else {
    console.log(`✅ ${pkg} - already installed`);
  }
});

if (missingPackages.length === 0) {
  console.log('\n✅ All packages are already installed!');
  console.log('\nYou can now run: npm start');
  process.exit(0);
}

console.log(`\n📦 Installing ${missingPackages.length} missing package(s)...\n`);

try {
  // Install missing packages
  const command = `npm install ${missingPackages.join(' ')}`;
  console.log(`Running: ${command}\n`);
  
  execSync(command, { 
    stdio: 'inherit',
    cwd: __dirname 
  });
  
  console.log('\n✅ Installation complete!');
  console.log('\n🚀 You can now run: npm start');
  console.log('🔐 Test login: m.ifwan@gmail.com / password123');
  
} catch (error) {
  console.error('\n❌ Installation failed!');
  console.error('Error:', error.message);
  console.log('\n📝 Please try manually:');
  console.log('   npm install express-session cookie-parser bcryptjs');
  process.exit(1);
}

