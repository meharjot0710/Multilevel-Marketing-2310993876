const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Middleware to check authentication
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

// Dashboard
router.get('/dashboard', isAuthenticated, (req, res) => {
  const member = Member.getProfile(req.session.user.memberCode);
  res.render('dashboard', { member });
});

// Profile
router.get('/profile', isAuthenticated, (req, res) => {
  const member = Member.getProfile(req.session.user.memberCode);
  res.render('profile', { member });
});

// Downline view
router.get('/downline', isAuthenticated, (req, res) => {
  const downlineData = Member.getDownline(req.session.user.memberCode);
  res.render('downline', downlineData);
});

module.exports = router;
