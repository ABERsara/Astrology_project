const mongoose = require('mongoose')//יבוא הספרייה
const User = require('./User')

const diagnosisSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        IdentificationNum: {
            type: Number,
            required: true,
            unique: true
        }, registerUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        birthdate: {
            type: Date,
            required: true
        }, birthTime: {
            type: String,
            default: "00:00"
        }, utc: {
            city: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        }, diagnosisType: {
            type: Boolean, 
            required:true,
        }, 
        //האבחון עצמו
     diagnosis: {
            type: String
        }
    },
    { timestamps: true }
)

//ייצוא
module.exports = mongoose.model('Diagnosis', diagnosisSchema)