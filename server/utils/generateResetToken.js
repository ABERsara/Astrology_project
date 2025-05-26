const jwt = require("jsonwebtoken");

const generateResetToken = (userId) => {
    return jwt.sign(
        { _id: userId },
        process.env.RESET_PASSWORD_SECRET,
        { expiresIn: "15m" }
    );
};

module.exports = generateResetToken;
