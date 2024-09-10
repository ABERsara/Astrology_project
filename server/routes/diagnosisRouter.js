const express=require("express")
const controller=require("../controllers/diagnosisController")
const verifyAdmin = require("../middlware/verifyAdmin");
const verifyJWT = require("../middlware/verifyJWT");
const router=express.Router();

router.use(verifyJWT)

router.get("/",controller.getDiagnosiss);
router.get("/:id",controller.getDiagnosis);

router.use(verifyAdmin)

router.delete("/",controller.deleteDiagnosis);
router.post("/",controller.addDiagnosis);
router.put("/",controller.updateDiagnosis);

module.exports=router