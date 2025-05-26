const rateLimit = require("express-rate-limit");

exports.emailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 3, 
  message: "Too many email requests, please try again later",
});
