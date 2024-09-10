const User = require("../models/User")
const bcrypt = require("bcrypt")
const getUsers = async (req, res) => {
    const users = await User.find({ active: true, deleted: false }, { password: 0 }).populate("diagnosis").lean()
    if (!users.length) {
        return res.status(400).json({
            error: true,
            message: "There is'nt users",
            data: null
        })
    }
    res.json({
        error: false,
        message: '',
        data: users
    })
}
const getUser = async (req, res) => {
    /////copied...
    const { id } = req.params
    //Get a single user from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
    try {
        const user = await User.findById(id).lean()
        res.json(user)
        //if no user
        if (!user) {
            return res.status(400).json({ message: 'No user found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err })
    }
}
const addUser = async (req, res) => {
    const { username, firstname, lastname, phone, email, password, image, active, diagnosis } = req.body
    //confirm data!
    if (!firstname || !username || !email) {
        return res.status(400).json({
            error: true,
            message: 'firstname,username and email are required',
            data: null
        })
    }
    //validate the adding user is unique
    const existedUser = await User.findOne({ username: username }).lean()
    if (existedUser) {
        return res.status(409).json({
            error: true,
            message: 'The user is already exist!',
            data: null
        })
    }
    //for password encryption:
    const hashPwd = await bcrypt.hash(password, 10)
    try {
        // Create and store the new user
        const user = await User.create({ username, firstname, lastname, phone, email, password: hashPwd, image, active, diagnosis });
        res.status(201).json({
            error: false,
            message: 'New user created',
            data: { _id: user._id, firstname: user.firstname, lastname: user.lastname }
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(400).json({
            error: true,
            message: error,
            data: null
        });
    }
}
const updateUser = async (req, res) => {
    try {
        const userId = req.body.id;  // מקבלת מזהה מה-body
        const userData = req.body;

        // בדיקה אם המשתמש הוא מנהל
        const isAdmin = req.user.permission === "Admin";

        // בדיקה אם יש תמונה להעלאה
        let updatedImage;
        if (req.file) {
            updatedImage = `/uploads/${req.file.filename}`; // שמירת הנתיב של התמונה שהועלתה
        }

        if (isAdmin) {
            // מנהל יכול לעדכן רק את ההרשאות ואת הסטטוס הפעיל
            const adminUpdateFields = {
                permission: userData.permission,
                active: userData.active
            };

            await User.findByIdAndUpdate(userId, adminUpdateFields);
            return res.status(200).json({
                error: false,
                message: "User permission or active status updated successfully",
                data: userData
            });
        } else {
            // משתמש רגיל יכול לעדכן את המידע האישי בלבד, כולל תמונה
            const userUpdateFields = {
                firstname: userData.firstname,
                lastname: userData.lastname,
                email: userData.email,
                phone: userData.phone,
                username: userData.username,
                password: userData.password, // רק אם יש צורך
                ...(updatedImage && { image: updatedImage }) // אם יש תמונה מעודכנת
            };

            await User.findByIdAndUpdate(userId, userUpdateFields);
            return res.status(200).json({
                error: false,
                message: "User personal information updated successfully",
                data: userData
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            message: "An error occurred",
            data: error.message
        });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({
            error: true,
            massage: "Id is required",
            data: null
        })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "User not found",
            data: null
        })
    }
    //Deleting a user is only authorized if he is inactive
    //The deletion is to Declare he is deleted
    if (!user.active) {
        user.deleted = true
        const updateUser = await user.save()
        res.json({
            error: false,
            message: "",
            data: { username: updateUser.username, _id: updateUser._id }
        })
    }
    else {
        res.status(201).json({
            error: false,
            massage: "The user is still active",
            data: ''
        })

    }
}
module.exports = {
    getUser,
    getUsers,
    updateUser,
    addUser,
    deleteUser
}