const mongoose = require('mongoose')//יבוא הספרייה
const Users = require('./User')

const responsesSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        registerUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        // responseFor: {
        //     type: String,
        //     required: true
        // },
        //  courseName: {
        //     type: String
        // }, title: {
        //     type: String,
        // },
        appearName: {
            type: Boolean,
            default: true
        }, content: {
            type: String,
            require: true,
        },
        //  enjoyService: {
        //     type: String
        // },
         allowedUser: {
            // הרשאת משתמש
            // האם מורשה לפרסם את התגובה
            type: Boolean,
            default: true
        },
        //הרשאת מנהל לפרסום התגובה
        allowedAdmin:{
            type: Boolean,
            default: false
        },
        position: {
            type: String,
            enum: ['left', 'right'],
            default: 'left' // ברירת מחדל
        }
    },
    { timestamps: true }
)

//ייצוא
module.exports = mongoose.model('Responses', responsesSchema)