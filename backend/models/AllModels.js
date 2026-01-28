const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const interestProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  tax: { type: Number, default: 0 }
});

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { 
    type: String, 
    enum: ['Income', 'Expense', 'Investment', 'Loan', 'LoanRepayment'], 
    required: true 
  },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  
  investmentRoi: { type: Number },
  interestProfileId: { type: mongoose.Schema.Types.ObjectId, ref: 'InterestProfile' },
  linkedLoanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }
});

const User = mongoose.model('User', userSchema);
const InterestProfile = mongoose.model('InterestProfile', interestProfileSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = { User, InterestProfile, Transaction };