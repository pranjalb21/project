const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    const jwtToken = req.header('Authorization');
    if (!jwtToken) {
        res.status(401).send(`Unauthorized. Token is empty`);
    }
    const token = jwtToken.split(' ')[1];
    try {
        const isTokenValid = jwt.verify(token, process.env.JWT_SIGN)
        const userData = await User.findOne({email: isTokenValid.email}).select({password: 0});
        req.user = userData;
        req.userId = userData._id;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send(`Unauthorized. Invalid token`);
    }
}

module.exports = authMiddleware