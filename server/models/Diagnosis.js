const mongoose = require('mongoose')//יבוא הספרייה
const User = require('./User')

const diagnosisSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        IdentificationNum: {
            type: Number,
            required: true,
            unique: true
        },
        birthdate: {
            type: Date,
            required: true
        }, birthTime: {
            hour: {
                type: Number,
                required: true,
                default: 0
            }, minutes: {
                type: Number,
                required: true,
                default: 0
            }
        }, utc: {
            city: {
                type: String,
                required: true,
                default: "unknown",
            },
            country: {
                type: String,
                required: true,
            }
        }, //האם האבחון מדויק או לא
        diagnosisType: {
            type: Boolean,
            required: true,
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