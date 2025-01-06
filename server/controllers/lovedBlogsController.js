const User = require("../models/User")

const getUserLovedBlogs = async (req, res) => {
    try {
        const userId = req.params.id; // מזהה המשתמש מהבקשה
        const user = await User.findById(userId).populate('lovedBlogs'); // שליפה עם הבלוגים האהובים
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ lovedBlogs: user.lovedBlogs });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching loved blogs', error });
    }
};

const addLovedBlog = async (req, res) => {
    try {
        const { userId, blogId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (!user.lovedBlogs.includes(blogId)) {
            user.lovedBlogs.push(blogId);
            await user.save();
        }

        res.status(200).json({ message: 'Blog added to loved list', lovedBlogs: user.lovedBlogs });
    } catch (error) {
        res.status(500).json({ message: 'Error adding loved blog', error });
    }
};

const removeLovedBlog = async (req, res) => {
    try {
        const { userId, blogId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.lovedBlogs = user.lovedBlogs.filter(id => id.toString() !== blogId);
        await user.save();

        res.status(200).json({ message: 'Blog removed from loved list', lovedBlogs: user.lovedBlogs });
    } catch (error) {
        res.status(500).json({ message: 'Error removing loved blog', error });
    }
};

module.exports = {
    getUserLovedBlogs,
    addLovedBlog,
    removeLovedBlog
};