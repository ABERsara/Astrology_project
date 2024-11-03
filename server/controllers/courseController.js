const Course=require("../models/Course")
//לא גמור
const getCourses=async(req,res)=>{
const courses=await Course.find({}).lean()
if(!courses.length){
    return res.status(400).json({
       error:true,
       message:"There is'nt courses",
       data:null
    })
}
res.json({
    error:false,
    message:'',
    data:courses
})
}
const getCourse=async(req,res)=>{
    /////copied...
    const {id}=req.params
    //Get a single course from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
    try{
    const course=await Course.findById(id).lean()
    res.json(course)
    //if no course
    if(!course){
        return res.status(400).json({message:'No course found'})
    }
}catch(err){
    return res.status(500).json({message:err})
}
}
const addCourse=async(req,res)=>{
    const {coursename,details,recommendations,numParts,forImprssions}=req.body
 //confirm data!
 if (!coursename || !details||!numParts ) {
    return res.status(400).json({
        error:true,
         message: 'coursename ,details and numParts are required',
        data:null })
}
try {
    // Create and store the new course
    const course = await Course.create({coursename,details,recommendations,numParts,forImprssions});
    res.status(201).json({ 
        error:false,
        message: 'New course created',
        data: course });
} catch (error) {
    console.error('Error creating course:', error);
    res.status(400).json({ 
        error:true,
        message: error,
    data:null});
}
}
const updateCourse=async(req,res)=>{
    const {id,coursename,details,recommendations,numParts,forImprssions}=req.body
    //confirm data!
    if (!id||! !coursename ||!details|| !numParts ) {
       return res.status(400).json({
           error:true,
            message: 'id,coursename,details and numParts are required',
           data:null })
   }
   //confirm course existed to update 
   const course=await Course.findById(id).exec()
   if(!course){
       return res.status(400).json({
        error:true,
        message:"Course not found",
    data:null})
   }
   course.coursename=coursename
   course.details=details
   course.recommendations=recommendations
   course.numParts=numParts
   course.forImpressions=forImprssions
   
   //save the changes
   const updatedCourse=await course.save()
   res.json({
    error:false,
    massage:`${updatedCourse.coursename} updated`,
data:updateCourse})
}
const deleteCourse=async(req,res)=>{
    const { id } = req.body;
    if(!id){
        return res.status(400).json({
            error:true,
            massage:"Id is required",
            data:null
        })
    }
    const course=await Course.findById(id).exec()
    if(!course){
        return res.status(400).json({
         error:true,
         message:"Course not found",
     data:null})
    }
    const deletedCourse=await course.deleteOne()
    res.status(200).json({
        error:false,
        massage:"",
        data:deletedCourse
    })
}
module.exports={
    getCourse,
    getCourses,
    updateCourse,
    addCourse,
    deleteCourse
}