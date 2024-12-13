const Responses=require("../models/Responses")

const getResponses=async(req,res)=>{
const responses=await Responses.find({}).lean()
if(!responses.length){
    return res.status(400).json({
       error:true,
       message:"There is'nt responses",
       data:null
    })
}
res.json({
    error:false,
    message:'',
    data:responses
})
}
const getResponse=async(req,res)=>{
    /////copied...
    const {id}=req.params
    //Get a single response from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
    try{
    const response=await Responses.findById(id).lean()
    res.json(response)
    //if no response
    if(!response){
        return res.status(400).json({message:'No response found'})
    }
}catch(err){
    return res.status(500).json({message:err})
}
}
//change the case if a user is responses about a course- he needs to give the course name
const addResponse=async(req,res)=>{
    const { registerUser,apearName,content,allowed}=req.body
 //confirm data!
 if ( !registerUser  || !content  ) {
    return res.status(400).json({
        error:true,
         message: 'fields are required',
        data:null })
}
try {
    // Create and store the new response
    const response = await Responses.create({registerUser,apearName,content,allowed});
    res.status(201).json({ 
        error:false,
        message: 'New response created',
        data: response });
} catch (error) {
    console.error('Error creating response:', error);
    res.status(400).json({ 
        error:true,
        message: error,
    data:null});
}
}
const updateResponse=async(req,res)=>{
    const {id,registerUser,apearName,content,allowed}=req.body
    //confirm data!
    if ( !id||!registerUser || !content  ) {
        return res.status(400).json({
            error:true,
             message: 'fields are required',
            data:null })
    }
   //confirm response existed to update 
   const response=await Responses.findById(id).exec()
   if(!response){
       return res.status(400).json({
        error:true,
        message:"Responses not found",
    data:null})
   }
   response.registerUser=registerUser
//    response.courseName=courseName
//    response.title=title
   response.apearName=apearName
   response.content=content
   response.enjoyService=enjoyService
   
   //save the changes
   const updatedResponses=await response.save()
   res.json({
    error:false,
    massage:`${updatedResponses.firstname} updated`,
data:updatedResponses})
}
const deleteResponse=async(req,res)=>{
    const { id } = req.body;
    if(!id){
        return res.status(400).json({
            error:true,
            massage:"Id is required",
            data:null
        })
    }
    const response=await Responses.findById(id).exec()
    if(!response){
        return res.status(400).json({
         error:true,
         message:"Responses not found",
     data:null})
    }
    const deletedResponses=await response.deleteOne()
    res.status(200).json({
        error:false,
        massage:"",
        data:deletedResponses
    })
}
module.exports={
    getResponses,
    getResponse,
    updateResponse,
    addResponse,
    deleteResponse
}