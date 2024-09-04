const User = require("../models/User")
const bcrypt = require("bcrypt")
const getUsers = async (req, res) => {
    const users = await User.find({active:true}, { password: 0 }).populate("diagnosis").lean()
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
    const { username, firstname, lastname, phone, email, password, image, active,diagnosis } = req.body
    //confirm data!
    if (!firstname || !username || !email) {
        return res.status(400).json({
            error: true,
            message: 'firstname,username and email are required',
            data: null
        })
    }
    //validate the adding user is unique
    const existedUser=await User.findOne({username:username}).lean()
    if(existedUser){
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
        const user = await User.create({ username, firstname, lastname, phone, email, password: hashPwd, image, active,diagnosis });
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
    const { id,username, firstname, lastname, phone, email, password, image, active,diagnosis } = req.body
    //confirm data!
    if (!id || !firstname || !username || !email) {
        return res.status(400).json({
            error: true,
            message: 'id,username,firstname and email are required',
            data: null
        })
    }
    //confirm user existed to update 
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({
            error: true,
            message: "User not found",
            data: null
        })
    }
    if (password) {
        //for password encryption:
        const hashPwd = await bcrypt.hash(password, 10)
        user.password = hashPwd
    }
  
    user.firstname = firstname
    user.lastname = lastname
    user.phone = phone
    user.email = email
    user.image = image
    user.active = active
    user.diagnosis=diagnosis
    //save the changes
    const updatedUser = await user.save()
    res.json({
        error: false,
        massage: `${updatedUser.firstname} updated`,
        data: { _id: user._id, firstname: user.firstname, lastname: user.lastname }
    });

}
const deleteUser = async (req, res) => {
    const { id } = req.body;
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
    if (!user.active) {
        const deletedUser = await user.deleteOne()
        res.status(200).json({
            error: false,
            massage: "",
            data: { _id: user._id, firstname: user.firstname, lastname: user.lastname }
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