const express = require("express");
const userController = require("../controllers/userController");
// const verifyAdmin = require("../middlware/verifyAdmin");
// const verifyJWT = require("../middlware/verifyJWT");
// const useMulterStorage = require("../hooks/useMulterStorage"); // ייבוא ה-hook
const router = express.Router();


// כל הפעולות מצריכות אימות משתמש
// router.use(verifyJWT);

// const upload = useMulterStorage();

// פעולות פתוחות למשתמשים מאומתים
router.get("/:id", userController.getUser);
router.post("/", userController.addUser);

// עדכון חלקי למשתמשים רגילים ועדכון מיוחד למנהלים
router.put("/", userController.updateUser);
//רק מנהלים יכולים למחוק משתמש ולצפות בכל המשתמשים
// router.use(verifyAdmin)
router.get("/", userController.getUsers);
router.put("/:id",  userController.deleteUser);


module.exports = router;
