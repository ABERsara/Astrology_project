const mongoose = require('mongoose')//יבוא הספרייה
const User = require('./User')

const courseSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        coursename: {
            type: String,
            required: true,
            unique: true
        }, details: {
            type: String
        }, recommendations: {
            type: [{
                name: {
                    type: String,
                    required: true
                }, recommendation: 
                { 
                    type: String, 
                    required: true
                 }
            }
            ],
            default: []
        }, numParts: {
            type: Number,
            required: true,
        },
        forImpressions: {
            //link to show...
            type: String,
        }, participants: {
            type:
                [{
                    name:
                        { type: String },
                    user:
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'User',
                        required: true,
                    },
                    numPart: {
                        type: Number,
                        default: 1
                    }
                }], default: []
        }
    },
    { timestamps: true }
)

//ייצוא
module.exports = mongoose.model('Course', courseSchema)