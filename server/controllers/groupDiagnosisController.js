const GroupDiagnosiss=require("../models/GroupDiagnosiss")

const getGroupDiagnosiss=async(req,res)=>{
const groupDiagnosiss=await GroupDiagnosiss.find({}).lean()
if(!groupDiagnosiss.length){
    return res.status(400).json({
       error:true,
       message:"There is'nt groupDiagnosiss",
       data:null
    })
}
res.json({
    error:false,
    message:'',
    data:groupDiagnosiss
})
}
const getGroupDiagnosis=async(req,res)=>{
    /////copied...
    const {id}=req.params
    //Get a single groupDiagnosis from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
    try{
    const groupDiagnosis=await GroupDiagnosiss.findById(id).lean()
    res.json(groupDiagnosis)
    //if no groupDiagnosis
    if(!groupDiagnosis){
        return res.status(400).json({message:'No groupDiagnosis found'})
    }
}catch(err){
    return res.status(500).json({message:err})
}
}
//change the case if a user is groupDiagnosiss about a course- he needs to give the course name
const addGroupDiagnosis=async(req,res)=>{
    const { orderer,numParticipants,adress, participants}=req.body
 //confirm data!
 if ( !orderer ||!numParticipants || !adress  ) {
    return res.status(400).json({
        error:true,
         message: 'fields are required',
        data:null })
}
try {
    // Create and store the new groupDiagnosis
    const groupDiagnosis = await GroupDiagnosiss.create({ orderer,numParticipants,adress, participants});
    res.status(201).json({ 
        error:false,
        message: 'New groupDiagnosis created',
        data: groupDiagnosis });
} catch (error) {
    console.error('Error creating groupDiagnosis:', error);
    res.status(400).json({ 
        error:true,
        message: error,
    data:null});
}
}
const updateGroupDiagnosis=async(req,res)=>{
    const {id, orderer,numParticipants,adress, participants}=req.body
    //confirm data!
    if ( !id||!orderer ||!numParticipants || !adress  ) {
        return res.status(400).json({
            error:true,
             message: 'fields are required',
            data:null })
    }
   //confirm groupDiagnosis existed to update 
   const groupDiagnosis=await GroupDiagnosiss.findById(id).exec()
   if(!groupDiagnosis){
       return res.status(400).json({
        error:true,
        message:"GroupDiagnosiss not found",
    data:null})
   }
   groupDiagnosis.orderer=orderer
   groupDiagnosis.numParticipants=numParticipants
   groupDiagnosis.adress=adress
   groupDiagnosis.participants=participants

   //save the changes
   const updatedGroupDiagnosiss=await groupDiagnosis.save()
   res.json({
    error:false,
    massage:`${updatedGroupDiagnosiss.orderer} updated`,
data:updatedGroupDiagnosiss})
}
const deleteGroupDiagnosis=async(req,res)=>{
    const { id } = req.body;
    if(!id){
        return res.status(400).json({
            error:true,
            massage:"Id is required",
            data:null
        })
    }
    const groupDiagnosis=await GroupDiagnosiss.findById(id).exec()
    if(!groupDiagnosis){
        return res.status(400).json({
         error:true,
         message:"GroupDiagnosiss not found",
     data:null})
    }
    const deletedGroupDiagnosiss=await groupDiagnosis.deleteOne()
    res.status(200).json({
        error:false,
        massage:"",
        data:deletedGroupDiagnosiss
    })
}
module.exports={
    getGroupDiagnosiss,
    getGroupDiagnosis,
    updateGroupDiagnosis,
    addGroupDiagnosis,
    deleteGroupDiagnosis
}