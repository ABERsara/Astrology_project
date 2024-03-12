const mongoose=require('mongoose')//יבוא הספרייה

const usersSchema=new mongoose.Schema(//הגדרת הסכמה
    {firstname:{
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
    },
    },//פרמטר ראשון אוביקט של שדות 
    {timestamps:true}//פרמטר שני מאפיינים נוספים
)

//ייצוא
module.exports=mongoose.model('Users',usersSchema)