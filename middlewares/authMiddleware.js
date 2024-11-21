const jwt = require('jsonwebtoken');

const protect = (role) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            if (decoded.role !== role) {
                return res.status(403).json({ message: 'Access denied. Insufficient privileges.' });
            }

            req.user = decoded; // Attach the decoded token to the request
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

module.exports = protect;
