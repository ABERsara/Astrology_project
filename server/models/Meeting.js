const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  meetingType: {
    type: String,
    enum: ["phone", "zoom", "google_meet"], // הגדרת אפשרויות קבועות
    required: true,
  },
  selectedDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"], // סטטוס הפגישה
    default: "pending",
  },
  meetingLink: {
    type: String, // קישור לפגישה (למשל זום או Google Meet)
    validate: {
      validator: function (v) {
        return /^(https?:\/\/)?([^\s]+)$/i.test(v); // בדיקה בסיסית לכתובת URL
      },
      message: (props) => `${props.value} הוא לא URL חוקי!`,
    },
  },
},{timestamps:true});


//ייצוא
module.exports = mongoose.model('Meeting', meetingSchema)