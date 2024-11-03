const mongoose = require('mongoose')//יבוא הספרייה
const User = require('./User')

const courseSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        coursename: {
            type: String,
            required: true,
            unique: true
        }, details: {
            //Link to the course!!
            type: String,
            required:true
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
        }
    },
    { timestamps: true }
)

//ייצוא
module.exports = mongoose.model('Course', courseSchema)