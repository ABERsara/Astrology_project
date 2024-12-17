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


router.get("/:id",controller.getDiagnosis);
router.post("/", controller.addDiagnosis);

router.use(verifyAdmin)

router.get("/",controller.getDiagnosiss);
router.delete("/",controller.deleteDiagnosis);
router.put("/",controller.updateDiagnosis);

module.exports = router;
