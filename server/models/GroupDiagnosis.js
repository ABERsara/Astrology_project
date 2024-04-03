const mongoose = require('mongoose')//יבוא הספרייה
const Users = require('./User')

const groupDiagnosisSchema = new mongoose.Schema(//הגדרת הסכמה
    {
        orderer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        }, numParticipants: {
            type: Number,
            //min:10,?? איך כותבים את זה
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
module.exports = mongoose.model('GroupDiagnosis', groupDiagnosisSchema)