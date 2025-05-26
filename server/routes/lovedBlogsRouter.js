const express = require('express');
const { getUserLovedBlogs, addLovedBlog, removeLovedBlog } = require('../controllers/lovedBlogsController');
const verifyJWT = require("../middleware/verifyJWT");

const router = express.Router();

router.use(verifyJWT);

router.get('/:id/loved-blogs', getUserLovedBlogs);
router.post('/loved-blogs', addLovedBlog);
router.delete('/loved-blogs', removeLovedBlog);

module.exports = router;
