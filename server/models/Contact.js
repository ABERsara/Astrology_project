const mongoose = require('mongoose'); // יבוא הספרייה

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      validate: {
        validator: function (value) {
          // ולידציה: אם אין טלפון, אימייל צריך להיות קיים
          return this.phone || value;
        },
        message: 'יש להזין אימייל או טלפון אחד לפחות',
      },
    },
    phone: {
      type: Number,
      validate: {
        validator: function (value) {
          // ולידציה: אם אין אימייל, טלפון צריך להיות קיים
          return this.email || value;
        },
        message: 'יש להזין אימייל או טלפון אחד לפחות',
      },
    },
  },
  { timestamps: true }
);

// ייצוא
module.exports = mongoose.model('Contact', contactSchema);
