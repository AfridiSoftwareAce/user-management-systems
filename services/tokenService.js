const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const generateToken = (userId) => {
    return jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: '1d' });
};

module.exports = {
    generateToken,
};