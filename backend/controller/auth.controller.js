const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback URL
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
      // Redirect to the frontend  after successful login
      res.redirect('/dashboard');
    }
  );
  
  // Logout route
  router.get('/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to logout', error: err });
      }
      res.redirect('/');
    });
  });


  module.exports = router;