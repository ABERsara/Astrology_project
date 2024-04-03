const Diagnosis=require("../models/DiagCoursenosis")
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
const addDiagnosis=async(req,res)=>{
    const {IdentificationNum,registerUser,birthdate,birthTime,utc,diagnosisType,diagnosis}=req.body
 //confirm data!
 if (!IdentificationNum || !registerUser || !birthdate || !utc ||!diagnosisType) {
    return res.status(400).json({
        error:true,
         message: 'IdentificationNum, registerUser,birthdate and utc are required',
        data:null })
}
//validate the adding diagnosis is unique
const existed=await Diagnosis.findOne({IdentificationNum}).lean()
if(existed){
    return res.status(409).json({
        error: true,
        message: 'The diagnosis is already exist!',
        data: null
    })
}
try {
    // Create and store the new diagnosis
    const newdiagnosis = await Diagnosis.create({IdentificationNum,registerUser,birthdate,birthTime,utc,diagnosisType,diagnosis});
    res.status(201).json({ 
        error:false,
        message: 'New diagnosis created',
        data: newdiagnosis });
} catch (error) {
    console.error('Error creating diagnosis:', error);
    res.status(400).json({ 
        error:true,
        message: error,
    data:null});
}
}
const updateDiagnosis=async(req,res)=>{
    //I'm not giving to update the IdentificationNum
    const {id,registerUser,birthdate,birthTime,utc,diagnosisType,diagnosis}=req.body
    //confirm data!
    if (!id || !registerUser || !birthdate || !utc ||!diagnosisType ) {
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
   newdiagnosis.registerUser=registerUser
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