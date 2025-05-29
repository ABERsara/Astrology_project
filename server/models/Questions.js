const mongoose = require('mongoose'); // יבוא הספרייה

// הגדרת הסכמה עבור שאלות ותשובות
const questionAnswerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true // שם פרטי הוא שדה חובה
    },
    phone: {
        type: String,
        required: true // טלפון הוא שדה חובה
    },
    question: {
        type: String,
        required: true // שאלה היא שדה חובה
    },
    answer: {
        type: String,
        required: false // תשובה אינה חובה
    }
}, { timestamps: true }); // יוצר שדות זמנים אוטומטיים עבור יצירה ועדכון

// ייצוא המודל
module.exports = mongoose.model('QuestionAnswer', questionAnswerSchema);

