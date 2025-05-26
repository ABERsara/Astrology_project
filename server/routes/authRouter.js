const express =require("express")
const authController=require("../controllers/authController")
const { emailLimiter } = require("../middleware/rateLimiter");
const router=express.Router()
router.post("/register",authController.register)
router.post("/login",authController.login)
router.get("/refresh" , authController.refresh )
router.post("/logout" , authController.logout )
router.post("/forgot-password", emailLimiter, authController.forgotPassword);
router.post("/reset-password/:token", authController.resetPassword);


module.exports = router;
