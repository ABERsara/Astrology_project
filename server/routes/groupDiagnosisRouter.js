const express=require("express")
const controller=require("../controllers/groupDiagnosissController")
const router=express.Router();

router.get("/",controller.getGroupDiagnosiss);
router.get("/:id",controller.getGroupDiagnosis);
router.post("/",controller.addGroupDiagnosis);
router.put("/",controller.updateGroupDiagnosis);
router.delete("/",controller.deleteGroupDiagnosis);



module.exports=router