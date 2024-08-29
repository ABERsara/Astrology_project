const mongoose = require('mongoose')//יבוא הספרייה

const blogSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        title: {
            type: String,
            required: true,
            unique: true
        }, blogUrl: {
            type: String,
        },
        //הבלוג עצמו
   content: {
            type: String
        }
    },
    { timestamps: true }
)

//ייצוא
module.exports = mongoose.model('Blog', blogSchema)