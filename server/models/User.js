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
    },permission:{
        type: String,
        enum: ['User', 'Manager','Group'],
        required:true,
        default: 'User',
    },active:{
        type:Boolean,
        required:true,
        default:true,
    }
    },
    {timestamps:true}
)

//ייצוא
module.exports=mongoose.model('User',usersSchema)