const bcrypt = require('bcrypt');
const User = require('../models/user');


// Fetch all users with optional filters, pagination, and sorting
exports.getAllUsers = async (req, res, next) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 10;
    const page = parseInt(req.query.page) || 1;
    const sortBy = req.query.sortBy || 'fullName';
    const order = req.query.order === 'desc' ? -1 : 1;
    const filterByCity = req.query.city;

    const query = filterByCity ? { city: filterByCity } : {};

    const users = await User.find(query)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort([[sortBy, order]]);
    const totalUsers = await User.countDocuments(query);

    res.json({ users, totalPages: Math.ceil(totalUsers / pageSize), currentPage: page });
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'User created successfully', user });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const { fullName, age, city, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ fullName });
    if (user) {
      return res.status(400).json({ error: 'User already exists' });
    }

    user = new User({
      fullName,
      age,
      city,
      password,
    });

    await user.save();

    res.status(201).json({ message: 'Registration successful. Welcome!', user });
  } catch (err) {
    next(err);
  }
};


// Login a user
exports.loginUser = async (req, res, next) => {
  try {
    const { fullName, password } = req.body;

    // Verify credentials
    const user = await User.findOne({ fullName });
    if (!user) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid Credentials' });
    }

    // Respond with success
    res.json({ message: 'Login successful. Welcome back!' });
  } catch (err) {
    next(err);
  }
};
