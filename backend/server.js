require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User, Transaction, InterestProfile } = require('./models/AllModels');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Middleware
const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

// Routes

// Register
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ name, email, password: hashedPassword });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).send('Server error'); }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) { res.status(500).send('Server error'); }
});

// Get All Data
app.get('/api/data/all', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    const profiles = await InterestProfile.find({ userId: req.user.id });
    res.json({ transactions, profiles });
  } catch (err) { 
    console.error(err);
    res.status(500).send('Server Error'); 
  }
});

// Add Transaction (FIXED THIS SECTION)
app.post('/api/transactions', auth, async (req, res) => {
  try {
    // 1. Create a clean object to hold valid data
    const cleanData = {
      userId: req.user.id,
      type: req.body.type,
      amount: req.body.amount,
      category: req.body.category,
      description: req.body.description,
      date: req.body.date || Date.now()
    };

    // 2. Only add these fields if they are NOT empty strings
    if (req.body.investmentRoi) cleanData.investmentRoi = req.body.investmentRoi;
    if (req.body.linkedLoanId && req.body.linkedLoanId !== '') cleanData.linkedLoanId = req.body.linkedLoanId;
    if (req.body.interestProfileId && req.body.interestProfileId !== '') cleanData.interestProfileId = req.body.interestProfileId;

    const newTx = new Transaction(cleanData);
    const savedTx = await newTx.save();
    res.json(savedTx);
  } catch (err) { 
    console.error("Error Saving Transaction:", err); // This prints the real error to your terminal
    res.status(500).send('Server Error: ' + err.message); 
  }
});

// Add Interest Profile
app.post('/api/profiles', auth, async (req, res) => {
  try {
    const newProfile = new InterestProfile({ ...req.body, userId: req.user.id });
    await newProfile.save();
    res.json(newProfile);
  } catch (err) { res.status(500).send('Server Error'); }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));