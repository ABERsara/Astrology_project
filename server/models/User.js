const mongoose = require('mongoose')//יבוא הספרייה

const usersSchema = new mongoose.Schema(//הגדרת הסכמה
    {
       
        firstname: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
        }, phone: {
            type: String,
        }, email: {
            type: String,
            required: true,
            unique: true
        }, password: {
            type: String,
            required: true
        }, image: {
            type: String
        }, permission: {
            type: String,
            enum: ['User', 'Admin', 'Group'],
            required: true,
            default: 'User',
        }, active: {
            type: Boolean,
            default: true,
        }, deleted: {
            type: Boolean,
            default: false,
        },
        diagnosis: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Diagnosis'
        }
    },
    { timestamps: true }
)

//ייצוא
module.exports = mongoose.model('User', usersSchema)