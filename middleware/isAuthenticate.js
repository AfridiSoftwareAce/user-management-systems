// Import the jsonwebtoken library
const jwt = require('jsonwebtoken');

// Get the JWT secret key from environment variables or use a default one
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware function to verify the JWT
const verifyToken = (req, res, next) => {
    // Get the 'authorization' header from the request
    const authHeader = req.headers.authorization;

    // If there's no 'authorization' header, return an error
    if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided.' });

    // Split the 'authorization' header into parts
    const tokenParts = authHeader.split(' ');

    // If the 'authorization' header does not contain exactly two parts, return an error
    if (tokenParts.length !== 2) {
        return res.status(401).json({ error: 'Token error. Token must follow Bearer schema.' });
    }

    // Destructure the two parts of the 'authorization' header into 'scheme' and 'token'
    const [scheme, token] = tokenParts;

    // If the 'scheme' part is not 'Bearer' (ignoring case), return an error
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ error: 'Token malformatted. Token must follow Bearer schema.' });
    }

    try {
        // Try to decode the token with the JWT secret key
        const decoded = jwt.verify(token, JWT_SECRET);

        // If the token is valid, set the decoded payload to the 'user' property of the request object
        req.user = decoded;

        // Call the next middleware function
        next();
    } catch (err) {
        // If the token is invalid, return an error
        res.status(400).json({ error: 'Invalid token.' });
    }
};

// Export the middleware function
module.exports = {
    verifyToken,
};