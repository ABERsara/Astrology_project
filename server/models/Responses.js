const mongoose=require('mongoose')//יבוא הספרייה
const Users = require('./User')

const responsesSchema=new mongoose.Schema(//הגדרת הסכמה
    {IdentificationNum:{
        type:Number,
        required:true,
        unique:true
 },registerUser:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
    responseFor:{type:String,
        required:true
    },workshopName:{
        type:String
    },title:{
                type: String,
                },
apearName:{
        type:Boolean,
        require:true
    },userType:{
        type: String,
        enum: ['User', 'Manager'],
        default: 'User',
    },diagnosis:{
type:String
    }
    },
    {timestamps:true}
)

//ייצוא
module.exports=mongoose.model('Responses',responsesSchema)