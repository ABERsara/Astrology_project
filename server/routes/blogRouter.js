const express = require("express")
const controller = require("../controllers/blogController")
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //אם התיקייה uploads
        // לא קיימת, ניצור אותה:
        const fs = require('fs');
        const path = './public/uploads';

        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        cb(null, './public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
})

const upload = multer({ storage: storage })
router.get("/", controller.getBlogs);
router.get("/:id", controller.getBlog);
router.post("/", upload.single('file'), controller.addBlog);
router.put("/", upload.single('file'), controller.updateBlog);
router.delete("/:id", controller.deleteBlog);



module.exports = router

