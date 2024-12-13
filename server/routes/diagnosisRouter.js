const express=require("express")
const controller=require("../controllers/diagnosisController")
const verifyAdmin = require("../middlware/verifyAdmin");
const verifyJWT = require("../middlware/verifyJWT");
const router=express.Router();

router.use((req, res, next) => {
    console.log(`Received request on ${req.method} ${req.originalUrl}`);
    next();
  });

router.use(verifyJWT)

router.get("/",controller.getDiagnosiss);
router.get("/:id",controller.getDiagnosis);
router.post("/", (req, res, next) => {
    console.log('Received POST request on /api/diagnosis');
    next(); // אם הבקשה הגיעה נכון, תעבור לפונקציה בקונטולר
}, controller.addDiagnosis);

router.use(verifyAdmin)

router.delete("/",controller.deleteDiagnosis);
router.put("/",controller.updateDiagnosis);

module.exports = router;
