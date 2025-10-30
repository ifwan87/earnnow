// In-memory user storage (can be upgraded to database later)
const bcrypt = require('bcryptjs');

// Store users in memory (this will reset when server restarts)
// In production, you should use a real database
const users = new Map();
const usersByEmail = new Map();

// Sample data - you can remove this later
const initializeUsers = async () => {
  // Create a sample user for testing
  const hashedPassword = await bcrypt.hash('password123', 10);
  const sampleUser = {
    id: '1',
    name: 'Test User',
    email: 'm.ifwan@gmail.com',
    password: hashedPassword,
    tier: 'Starter',
    balance: {
      pending: 0,
      approved: 0,
      available: 0
    },
    createdAt: new Date()
  };
  users.set('1', sampleUser);
  usersByEmail.set('m.ifwan@gmail.com', sampleUser);
};

// Initialize sample users
initializeUsers();

// User counter for generating IDs
let userIdCounter = 2;

const userStore = {
  // Create a new user
  async createUser(userData) {
    const { name, email, password } = userData;
    
    // Check if user already exists
    if (usersByEmail.has(email)) {
      throw new Error('User with this email already exists');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user object
    const user = {
      id: String(userIdCounter++),
      name,
      email,
      password: hashedPassword,
      tier: 'Starter',
      balance: {
        pending: 0,
        approved: 0,
        available: 0
      },
      referralCode: this.generateReferralCode(),
      referredBy: null,
      createdAt: new Date()
    };
    
    // Store user
    users.set(user.id, user);
    usersByEmail.set(email, user);
    
    return user;
  },
  
  // Find user by email
  findByEmail(email) {
    return usersByEmail.get(email);
  },
  
  // Find user by ID
  findById(id) {
    return users.get(id);
  },
  
  // Verify password
  async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  },
  
  // Generate referral code
  generateReferralCode() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  },
  
  // Get all users (for admin purposes)
  getAllUsers() {
    return Array.from(users.values());
  },
  
  // Update user
  updateUser(id, updates) {
    const user = users.get(id);
    if (!user) {
      throw new Error('User not found');
    }
    
    const updatedUser = { ...user, ...updates };
    users.set(id, updatedUser);
    
    // Update email index if email changed
    if (updates.email && updates.email !== user.email) {
      usersByEmail.delete(user.email);
      usersByEmail.set(updates.email, updatedUser);
    }
    
    return updatedUser;
  }
};

module.exports = userStore;

