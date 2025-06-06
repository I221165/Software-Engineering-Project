// routes/loanApplications.js
const express = require('express');
const router = express.Router();
const LoanApplication = require('../models/LoanApplication');

// Get all loan applications
router.get('/', async (req, res) => {
  try {
    const loans = await LoanApplication.find().populate('user', 'name email');
    res.json(loans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get loan application by id
router.get('/:id', async (req, res) => {
  try {
    const loan = await LoanApplication.findById(req.params.id).populate('user', 'name email');
    if (!loan) return res.status(404).json({ message: 'Loan application not found.' });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create loan application
router.post('/', async (req, res) => {
  const { user, amount, tax } = req.body;
  const loan = new LoanApplication({ user, amount, tax });
  try {
    const saved = await loan.save();
    res.status(201).json({ message: 'Loan application created.', loan: saved });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update loan application
router.put('/:id', async (req, res) => {
  try {
    const updated = await LoanApplication.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Loan application not found.' });
    res.json({ message: 'Loan application updated.', loan: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete loan application
router.delete('/:id', async (req, res) => {
  try {
    const removed = await LoanApplication.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ message: 'Loan application not found.' });
    res.json({ message: 'Loan application deleted.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;