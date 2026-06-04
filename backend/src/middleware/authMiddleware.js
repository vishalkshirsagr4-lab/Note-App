const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        
        if(!token) {
          return  res.status(401).json({
                message:'unauthorised',
            })
        }
        const decoded = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_KEY
        );

        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid Token'
        });
    }
};

module.exports = authMiddleware;