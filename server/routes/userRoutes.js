const express=require("express")
const userController=require("../controllers/userController")
const router=express.Router();

router.get("/",userController.getUsers);
router.get("/:id",userController.getUser);
router.post("/",userController.addUser);
router.put("/",userController.updateUser);
router.delete("/",userController.deleteUser);



module.exports=router