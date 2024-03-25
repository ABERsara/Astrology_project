const express=require("express")
const controller=require("../controllers/responsesController")
const router=express.Router();

router.get("/",controller.getResponses);
router.get("/:id",controller.getResponse);
router.post("/",controller.addResponse);
router.put("/",controller.updateResponse);
router.delete("/",controller.deleteResponse);



module.exports=router