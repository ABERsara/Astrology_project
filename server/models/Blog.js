const mongoose = require('mongoose')//יבוא הספרייה

const blogSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        title: {
            type: String,
            required: true,
            unique: true
        },//הבלוג עצמו
        content: {
            type: String
        },
        lovely:{
            user: {
                type:mongoose.Schema.Types.ObjectId ,
                ref:"User",
                required:true
            },
            love: {
                type: Boolean,
                default: false,
            },
        },
        file: {
            type: String,
        },

    },
    { timestamps: true }
)

//ייצוא
module.exports = mongoose.model('Blog', blogSchema)