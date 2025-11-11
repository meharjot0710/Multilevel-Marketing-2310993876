const express = require('express');
const router = express.Router();
const Member = require('../models/Member');

// Home page - redirect to login
router.get('/', (req, res) => {
  if (req.session.user) {
    return res.redirect('/member/dashboard');
  }
  res.redirect('/login');
});

// Login page
router.get('/login', (req, res) => {
  if (req.session.user) {
    return res.redirect('/member/dashboard');
  }
  res.render('login', { error: null });
});

// Login post
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const member = await Member.authenticate(email, password);
    
    // Set session
    req.session.user = {
      memberCode: member.memberCode,
      name: member.name,
      email: member.email
    };
    
    res.redirect('/member/dashboard');
  } catch (error) {
    res.render('login', { error: error.message });
  }
});

// Register page
router.get('/register', (req, res) => {
  if (req.session.user) {
    return res.redirect('/member/dashboard');
  }
  res.render('register', { error: null, success: null });
});

// Register post
router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, sponsorCode, position, password, confirmPassword } = req.body;
    
    // Validate password match
    if (password !== confirmPassword) {
      return res.render('register', { 
        error: 'Passwords do not match', 
        success: null 
      });
    }

    // Create member
    const newMember = await Member.create({
      name,
      email,
      mobile,
      sponsorCode,
      position,
      password
    });

    res.render('register', { 
      error: null, 
      success: `Registration successful! Your Member Code is: ${newMember.memberCode}` 
    });
  } catch (error) {
    res.render('register', { 
      error: error.message, 
      success: null 
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;
