const Blog=require("../models/Blog")
//לא גמור
const getBlogs=async(req,res)=>{
const blogs=await Blog.find({}).lean()
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
    console.log("Request received:", req.body); // הדפס את הנתונים המתקבלים בשרת
    const file=(req.file?.filename? req.file.filename:"")
    const { title,content} = req.body;
    if (!title ) {
        return res.status(400).json({
            error: true,
            message: 'title and file are required',
            data: null
        });
    }

    try {
        const blog = await Blog.create({ title,content, file});
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
    const { id, title, content, existingFile } = req.body;
    const file = req.file ? req.file.filename : existingFile; // אם לא נבחר קובץ חדש, נשתמש בקובץ הקיים
    
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
    blog.file = file; // שמירת הקובץ החדש או הקיים
    
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
