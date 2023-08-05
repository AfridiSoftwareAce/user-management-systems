// Existing code for user validation
module.exports.validateUser = (req, res, next) => {
  const { fullName, age, city } = req.body;
  if (!fullName && !age && !city) {
    return res.status(400).json({ error: 'At least one field (Full Name, Age, City) must be provided for an update' });
  }
  
  if (fullName && typeof fullName !== 'string') {
    return res.status(400).json({ error: 'Full Name should be a string' });
  }
  
  if (age && (typeof age !== 'number' || age < 18 || age > 99)) {
    return res.status(400).json({ error: 'Age should be a number between 18 and 99' });
  }
  
  if (city && typeof city !== 'string') {
    return res.status(400).json({ error: 'City should be a string' });
  }
  
  next();
};

  
  module.exports.validateRegister = (req, res, next) => {
    const { fullName, age, city, password } = req.body;
  
    // Reusing existing user validation
    exports.validateUser(req, res, () => {
      if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ error: 'Password is required and should be at least 6 characters long' });
      }
      next();
    });
  };
  
  module.exports.validateLogin = (req, res, next) => {
    const { fullName, password } = req.body;
  
    if (!fullName || typeof fullName !== 'string') {
      return res.status(400).json({ error: 'Full Name is required and should be a string' });
    }
  
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password is required and should be a string' });
    }
  
    next();
  };
  