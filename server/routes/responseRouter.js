const express=require("express")
const controller=require("../controllers/responsesController")
const router=express.Router();
const verifyJWT = require("../middleware/verifyJWT");

router.get("/",controller.getResponses);

router.use(verifyJWT);

router.get("/:id",controller.getResponse);
router.post("/",controller.addResponse);
router.put("/",controller.updateResponse);
router.delete("/",controller.deleteResponse);



module.exports=router