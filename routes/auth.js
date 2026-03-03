const router = require('express').Router();
const passport = require('passport');

// Start Google login
router.get('/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

// Callback URL
router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/'
  }),
  (req, res) => {
    res.json({
      message: 'Authentication successful',
      user: req.user
    });
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

// Test route
router.get('/me', (req, res) => {
  res.json(req.user);
});

module.exports = router;