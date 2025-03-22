// routes/index.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_BASE = 'http://localhost:5000/api';

// Home page
router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome to FinWise' });
});

// Registration page
router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});

// Login page
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

// Dashboard page
router.get('/dashboard', (req, res) => {
  // In a real app you would check session or token; here we just render the dashboard.
  res.render('dashboard', { title: 'Dashboard' });
});

// Dynamic Users page (fetches user data from backend)
router.get('/users', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/users`);
    res.render('users', { title: 'User Management', users: response.data, error: null });
  } catch (error) {
    res.render('users', { title: 'User Management', users: [], error: error.message });
  }
});

// Dynamic Transactions page
router.get('/transactions', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/transactions`);
    res.render('transactions', { title: 'Transactions', transactions: response.data, error: null });
  } catch (error) {
    res.render('transactions', { title: 'Transactions', transactions: [], error: error.message });
  }
});

// Dynamic Budgets page
router.get('/budgets', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/budgets`);
    res.render('budgets', { title: 'Budgets', budgets: response.data, error: null });
  } catch (error) {
    res.render('budgets', { title: 'Budgets', budgets: [], error: error.message });
  }
});

// Dynamic Savings Goals page
router.get('/savings', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/savings`);
    res.render('savings', { title: 'Savings Goals', savings: response.data, error: null });
  } catch (error) {
    res.render('savings', { title: 'Savings Goals', savings: [], error: error.message });
  }
});

// Dynamic Bills page
router.get('/bills', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/bills`);
    res.render('bills', { title: 'Bills', bills: response.data, error: null });
  } catch (error) {
    res.render('bills', { title: 'Bills', bills: [], error: error.message });
  }
});

// Dynamic Loan Applications page
router.get('/loan-applications', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/loan-applications`);
    res.render('loanApplications', { title: 'Loan Applications', loans: response.data, error: null });
  } catch (error) {
    res.render('loanApplications', { title: 'Loan Applications', loans: [], error: error.message });
  }
});

// Dynamic Reports page (example: transactions summary)
router.get('/reports', async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/reports/transactions-summary`);
    res.render('reports', { title: 'Reports', summary: response.data, error: null });
  } catch (error) {
    res.render('reports', { title: 'Reports', summary: [], error: error.message });
  }
});

module.exports = router;