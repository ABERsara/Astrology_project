const express=require("express")
const userController=require("../controllers/userController")
const verifyAdmin = require("../middlware/verifyAdmin");
const verifyJWT = require("../middlware/verifyJWT");
const router=express.Router();

//הרשמה מהווה הוספת משתמש וזה לא מצריך אימות
router.post("/",userController.addUser);

// כל הפעולות מצריכות אימות משתמש
router.use(verifyJWT);

router.get("/:id",userController.getUser);
// עדכון חלקי למשתמשים רגילים ועדכון מיוחד למנהלים
router.put("/",userController.updateUser);

//רק מנהלים יכולים למחוק משתמש ולצפות בכל המשתמשים
router.use(verifyAdmin)

router.put("/:id",userController.deleteUser);
router.get("/",userController.getUsers);



module.exports=router