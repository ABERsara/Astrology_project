const mongoose=require('mongoose')//יבוא הספרייה

const usersSchema=new mongoose.Schema(//הגדרת הסכמה
    {username:{
        type:String,
        required:true,
        unique:true
    },
        firstname:{
        type:String,
        required:true
    },
    lastName:{type:String,
    },phone:{
        type:String,
    },email:{
        type:String,
        required:true
    },password:{
        type:String, 
        required:true
    },imageUrl:{
        type:String
    },userType:{
        type: String,
        enum: ['User', 'Manager'],
        default: 'User',
    }
    },
    {timestamps:true}
)

//ייצוא
module.exports=mongoose.model('User',usersSchema)