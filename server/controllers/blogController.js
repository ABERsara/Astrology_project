const Blog=require("../models/Blog")
//לא גמור
const getBlogs=async(req,res)=>{
const limit = parseInt(req.query.limit) || 0;
const blogs=await Blog.find({}).limit(limit).lean()
if(!blogs.length){
    return res.status(400).json({
       error:true,
       message:"There is'nt blogs",
       data:null
    })
}
res.json({
    error:false,
    message:'',
    data:blogs
})
}
const getBlog=async(req,res)=>{
    /////copied...
    const {id}=req.params
    //Get a single blog from mongoDB by its id
    //We don't need to make changes then we can receives the object lean
    try{
    const blog=await Blog.findById(id).lean()
    res.json(blog)
    //if no blog
    if(!blog){
        return res.status(400).json({message:'No blog found'})
    }
}catch(err){
    return res.status(500).json({message:err})
}
}
// const addBlog=async(req,res)=>{
//     const {title,blogUrl,content}=req.body
//  //confirm data!
//  if (!title || !blogUrl ) {
//     return res.status(400).json({
//         error:true,
//          message: 'title and blogUrl are required',
//         data:null })
// }
// try {
//     // Create and store the new blog
//     const blog = await Blog.create({title,blogUrl,content});
//     res.status(201).json({ 
//         error:false,
//         message: 'New blog created',
//         data: blog });
// } catch (error) {
//     console.error('Error creating blog:', error);
//     res.status(400).json({ 
//         error:true,
//         message: error,
//     data:null});
// }
// }
const addBlog = async (req, res) => {
    const { title,content} = req.body;
    if (!title ) {
        return res.status(400).json({
            error: true,
            message: 'title is required',
            data: null
        });
    }

    try {
        const blog = await Blog.create({ title,content });
        res.status(201).json({
            error: false,
            message: 'New blog created',
            data: blog
        });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(400).json({
            error: true,
            message: error.message,
            data: null
        });
    }
}

const updateBlog = async (req, res) => {
    const { id, title, content } = req.body;
    
    if (!id || !title) {
       return res.status(400).json({
           error: true,
           message: 'id וכותרת נדרשים',
           data: null
       });
    }
    
    const blog = await Blog.findById(id).exec();
    if (!blog) {
        return res.status(400).json({
            error: true,
            message: "בלוג לא נמצא",
            data: null
        });
    }
    
    blog.title = title;
    blog.content = content;
    
    const updatedBlog = await blog.save();
    res.json({
        error: false,
        message: `${updatedBlog.title} עודכן בהצלחה`,
        data: updatedBlog
    });
};

const deleteBlog = async (req, res) => {
    const { id } = req.params; // Retrieve id from params instead of body
    if(!id) {
        return res.status(400).json({
            error: true,
            message: "Id is required",
            data: null
        });
    }
    const blog = await Blog.findById(id).exec();
    if (!blog) {
        return res.status(400).json({
            error: true,
            message: "Blog not found",
            data: null
        });
    }
    const deletedBlog = await blog.deleteOne();
    res.status(200).json({
        error: false,
        message: "",
        data: deletedBlog
    });
}
module.exports={
    getBlog,
    getBlogs,
    updateBlog,
    addBlog,
    deleteBlog
}
