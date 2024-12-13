const Diagnosis=require("../models/Diagnosis")
const User=require("../models/User")
const fetch = require('node-fetch');
const moment = require('moment');

//לא גמור
const getDiagnosiss=async(req,res)=>{
const diagnosiss=await Diagnosis.find({}).lean()
if(!diagnosiss.length){
    return res.status(400).json({
       error:true,
       message:"There is'nt diagnosiss",
       data:null
    })
}
res.json({
    error:false,
    message:'',
    data:diagnosiss
})
}
const getDiagnosis=async(req,res)=>{
    /////copied...
    const {id}=req.params
    //Get a single diagnosis from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
    try{
    const diagnosis=await Diagnosis.findById(id).lean()
    res.json(diagnosis)
    //if no diagnosis
    if(!diagnosis){
        return res.status(400).json({message:'No diagnosis found'})
    }
}catch(err){
    return res.status(500).json({message:err})
}
}
const addDiagnosis = async (req, res) => {
    
    const isValidDate = (date) => moment(date, 'YYYY-MM-DD', true).isValid();

    const { IdentificationNum, birthdate, birthTime, utc, diagnosis } = req.body;

    const { firstname, email } = req.body; // מקבלים את firstname ו-email מה-body

    if(!firstname||!email){
        return res.status(404).json({
            error: true,
            message: 'firstname and email are required',
            data: null
        });
    }
    // חיפוש המשתמש לפי שם ו-אימייל
    const existingUser = await User.findOne({ firstname, email }).populate('diagnosis').lean();
    
    if (!existingUser) {
        return res.status(404).json({
            error: true,
            message: 'User not found',
            data: null
        });
    }

    // בדיקה אם למשתמש יש אבחון קודם
    if (existingUser.diagnosis) {
        return res.status(400).json({
            error: true,
            message: 'User already has a diagnosis',
            data: null
        });
    }

    // Confirm required data
    if (!birthdate) {
        return res.status(400).json({
            error: true,
            message: ' birthdate are required',
            data: null
        });
    }

    // Validate birthdate format
    if (!isValidDate(birthdate)) {
        return res.status(400).json({
            error: true,
            message: 'Invalid birthdate format. Must be YYYY-MM-DD.',
            data: null
        });
    }

    // Validate birthTime (hour between 0 and 23, minutes between 0 and 59)
    if (birthTime) {
        const { hour, minutes } = birthTime;
        if (hour < 0 || hour > 23 || minutes < 0 || minutes > 59) {
            return res.status(400).json({
                error: true,
                message: 'Invalid birth time',
                data: null
            });
        }
    }

    // Validate UTC (if provided)
    if (utc) {
        const { city, country } = utc;
        if (city && typeof city != 'string') {
            return res.status(400).json({
                error: true,
                message: 'Invalid city name',
                data: null
            });
        }
        if (country && typeof country !== 'string') {
            return res.status(400).json({
                error: true,
                message: 'Invalid country name',
                data: null
            });
        }
    }

    // Initialize diagnosisType with a default value
    let diagnosisType = false;

    // Update diagnosisType only if both utc and birthTime are present
    if (utc && birthTime) {
        diagnosisType = true;
    }

    // Validate the adding diagnosis is unique
    const existed = await Diagnosis.findOne({ IdentificationNum }).lean();
    if (existed) {
        return res.status(409).json({
            error: true,
            message: 'The diagnosis already exists!',
            data: null
        });
    }

    try {
        // Create and store the new diagnosis
        const newDiagnosis = await Diagnosis.create({
            IdentificationNum,
            birthdate,
            birthTime,
            utc,
            diagnosisType,
            diagnosis
        });

        res.status(201).json({
            error: false,
            message: 'New diagnosis created',
            data: newDiagnosis
        });
        // / עדכון המודל של המשתמש כדי לשייך את האבחון למשתמש
        await User.findOneAndUpdate({ firstname, email }, { diagnosis: newDiagnosis._id });

    } catch (error) {
        console.error('Error creating diagnosis:', error);
        res.status(400).json({
            error: true,
            message: 'Failed to create diagnosis',
            data: null
        });
    }
};

const updateDiagnosis=async(req,res)=>{
    //I'm not giving to update the IdentificationNum
    const {id,birthdate,birthTime,utc,diagnosisType,diagnosis}=req.body
    //confirm data!
    if (!id ) {
       return res.status(400).json({
           error:true,
            message: 'details are required',
           data:null })
   }
  
   //confirm diagnosis existed to update 
   const newdiagnosis=await Diagnosis.findById(id).exec()
   if(!newdiagnosis){
       return res.status(400).json({
        error:true,
        message:"Diagnosis not found",
    data:null})
   }
   newdiagnosis.birthdate=birthdate
   newdiagnosis.birthTime=birthTime
   newdiagnosis.utc=utc
   newdiagnosis.diagnosisType=diagnosisType
   newdiagnosis.diagnosis=diagnosis
   //save the changes
   const updatedDiagnosis=await newdiagnosis.save()
   res.json({
    error:false,
    massage:`${updatedDiagnosis.IdentificationNum} updated`,
data:updateDiagnosis})
}
const deleteDiagnosis=async(req,res)=>{
    const { id } = req.body;
    if(!id){
        return res.status(400).json({
            error:true,
            massage:"Id is required",
            data:null
        })
    }
    const diagnosis=await Diagnosis.findById(id).exec()
    if(!diagnosis){
        return res.status(400).json({
         error:true,
         message:"Diagnosis not found",
     data:null})
    }
    const deletedDiagnosis=await diagnosis.deleteOne()
    res.status(200).json({
        error:false,
        massage:"",
        data:deletedDiagnosis
    })
}
module.exports={
    getDiagnosis,
    getDiagnosiss,
    updateDiagnosis,
    addDiagnosis,
    deleteDiagnosis
}