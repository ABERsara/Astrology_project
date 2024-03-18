const mongoose = require('mongoose')//יבוא הספרייה
const Users = require('./User')

const GroupDiagnosisSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        orderer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, numParticipants: {
            type: Number,
            required: true,
        },
        adress: {
            city: {
                type: String,
                required: true
            }, street: {
                type: String,
                required: true
            }, number: {
                type: Number,
                required: true
            }
        }, participants:
        {
            type:
                [{
                    name:
                        { type: String },
                    diagnosis:
                    {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Diagnosis',
                        required: true,
                    }
                }]
        }
    }, { timestamps: true }
)

//ייצוא
module.exports = mongoose.model('GroupDiagnosis', GroupDiagnosisSchema)