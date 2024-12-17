const mongoose = require('mongoose')//יבוא הספרייה

const diagnosisSchema = new mongoose.Schema(
    {
        IdentificationNum: {
            type: String,
            unique: true, // מבטיח ייחודיות
        },
        birthdate: {
            type: Date,
            required: true,
        },
        birthTime: {
            hour: {
                type: Number,
                default: 0,
            },
            minutes: {
                type: Number,
                default: 0,
            },
        },
        utc: {
            city: {
                type: String,
                default: "unknown",
            },
            country: {
                type: String,
                default: "unknown",
            },
        },
        diagnosisType: {
            type: Boolean,
            default: false,
        },
        diagnosis: {
            type: String,
        },
        meeting: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Meeting', unique: true
         } // שדה אחד לפגישה
    },
    { timestamps: true }
);
// יצירת מספר אבחוני ייחודי אוטומטית
diagnosisSchema.pre('save', async function (next) {
    if (!this.isNew) return next();

    const lastDiagnosis = await this.constructor.findOne().sort({ IdentificationNum: -1 });
    const lastId = lastDiagnosis ? parseInt(lastDiagnosis.IdentificationNum, 10) : 0;
    this.IdentificationNum = String(lastId + 1).padStart(6, '0'); // מוסיף אפסים להשלמת 6 ספרות
    next();
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);
module.exports = Diagnosis;
