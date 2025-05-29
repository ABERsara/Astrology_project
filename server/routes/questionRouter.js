const express = require("express");
const controller = require("../controllers/questionController");
const router = express.Router();
const verifyJWT = require("../middlware/verifyJWT");

// נתיב לקבלת כל השאלות והתשובות
router.get("/", controller.getQuestionsAnswers);



// נתיב לקבלת שאלה ותשובה בודדת לפי מזהה
router.get("/:id", controller.getQuestionAnswer);

// נתיב להוספת שאלה חדשה
router.post("/addQuestion", controller.addQuestion);


// אבטחת הנתיבים הבאים באמצעות JWT
// router.use(verifyJWT);

// נתיב להוספת תשובה לשאלה קיימת
router.post("/addAnswer", controller.addAnswer);

// נתיב לעדכון שאלה ותשובה
router.put("/", controller.updateQuestionAnswer);

// נתיב למחיקת שאלה ותשובה
router.delete("/", controller.deleteQuestionAnswer);

module.exports = router;

