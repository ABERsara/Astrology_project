const mongoose = require('mongoose')//יבוא הספרייה
const Users = require('./User')

const responsesSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        registerUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        responseFor: {
            type: String,
            required: true
        }, courseName: {
            type: String
        }, title: {
            type: String,
        },
        apearName: {
            type: Boolean,
            require: true,
            default:true
        }, content: {
            type: String,
            require: true,
        }, enjoyService: {
            type: String
        },allowed:{
            //האם מורשה לפרסם את התגובה
            type:Boolean,
            default:false
        }
    },
    { timestamps: true }
)

//ייצוא
module.exports = mongoose.model('Responses', responsesSchema)