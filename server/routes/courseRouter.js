const express=require("express")
const controller=require("../controllers/courseController")
const router=express.Router();

router.get("/",controller.getCourses);
router.get("/:id",controller.getCourse);
router.post("/",controller.addCourse);
router.put("/",controller.updateCourse);
router.delete("/",controller.deleteCourse);



module.exports=router