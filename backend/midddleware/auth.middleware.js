module.exports = (req, res, next) => {
    console.log(req)
    if (req.isAuthenticated()) {
      return next(); // Proceed if the user is authenticated
    }
    res.status(401).json({ message: 'Unauthorized: You must log in first' });
  };