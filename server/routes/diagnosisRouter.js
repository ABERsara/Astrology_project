const express=require("express")
const controller=require("../controllers/diagnosisController")
const router=express.Router();

router.get("/",controller.getDiagnosiss);
router.get("/:id",controller.getDiagnosis);
router.post("/",controller.addDiagnosis);
router.put("/",controller.updateDiagnosis);
router.delete("/",controller.deleteDiagnosis);



module.exports=router