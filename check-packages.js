// Check if required packages are installed
console.log('Checking required packages...\n');

const packages = [
  'express',
  'express-session',
  'cookie-parser',
  'bcryptjs',
  'ejs',
  'dotenv'
];

let allInstalled = true;

packages.forEach(pkg => {
  try {
    require.resolve(pkg);
    console.log(`✅ ${pkg} - installed`);
  } catch (e) {
    console.log(`❌ ${pkg} - NOT INSTALLED`);
    allInstalled = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allInstalled) {
  console.log('✅ All packages are installed!');
  console.log('\nYou can now run: npm start');
} else {
  console.log('❌ Some packages are missing!');
  console.log('\nPlease run: npm install');
}

console.log('='.repeat(50));

