const express=require("express")
const controller=require("../controllers/blogController")
const router=express.Router();

router.get("/",controller.getBlogs);
router.get("/:id",controller.getBlog);
router.post("/",controller.addBlog);
router.put("/",controller.updateBlog);
router.delete("/:id",controller.deleteBlog);



module.exports=router

