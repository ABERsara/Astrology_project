const express = require("express");
const controller = require("../controllers/blogController");
const verifyAdmin = require("../middlware/verifyAdmin");
const verifyJWT = require("../middlware/verifyJWT");
const useMulterStorage = require("../hooks/useMulterStorage"); // ייבוא ה-hook
const router = express.Router();

router.use(verifyJWT)
// יצירת ה-upload באמצעות ה-hook
const upload = useMulterStorage();

router.get("/", controller.getBlogs);
router.get("/:id", controller.getBlog);

router.use(verifyAdmin)

router.post("/", upload.single('file'), controller.addBlog);
router.put("/", upload.single('file'), controller.updateBlog);
router.delete("/:id", controller.deleteBlog);

module.exports = router;
