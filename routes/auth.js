const router = require('express').Router();
const passport = require('passport');

// Start Google login
router.get('/google',
  passport.authenticate('google', {
    scope: ['openid','profile', 'email']
  })
);

// Callback URL
router.get('/google/callback',
  (req, res, next) => {
    console.log("Google returned to callback");
    next();
  },
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    console.log("User:", req.user);
    res.json(req.user);
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

router.get('/google',
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email']
  })
);

module.exports = router;