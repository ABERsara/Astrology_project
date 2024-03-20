const User=require("../models/User")
const getUsers=async(req,res)=>{
const users=await User.find({}).lean()
if(!users.length){
    return res.status(400).json({
       error:true,
       message:"There is'nt users",
       data:null
    })
}
res.json({
    error:false,
    message:'',
    data:users
})
}
const getUser=async(req,res)=>{
    
}
const addUser=async(req,res)=>{
    const {username,firstname,lastname,phone,email,password,imageUrl}=req.body
}
const updateUser=async(req,res)=>{
    
}
const deleteUser=async(req,res)=>{
    
}
module.exports={
    getUser,getUsers,updateUser,addUser,deleteUser
}