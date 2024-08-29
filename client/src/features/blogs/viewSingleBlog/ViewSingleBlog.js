import "./view-single-blog.css"
import {useGetAllBlogsQuery,useUpdateBlogMutation} from "../blogsApiSlice"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

const ViewSingleBlog = () => {
  const  {data: blogsObject, isError, error, isLoading, isSuccess} = useGetAllBlogsQuery()
 const { blogId } = useParams()
 const [updateBlog, {isSuccess: isUpdateSuccess}] = useUpdateBlogMutation()
 const navigate = useNavigate()

 useEffect(()=>{
  if(isUpdateSuccess){
    navigate("/dash/api/blogs/view")
  }
}, [isUpdateSuccess])
  // פונקציה לחזרה לדף הראשי
  const handleBackClick = () => {
      navigate('/dash/api/blogs/view')
  }
  const formSubmit =async (e) =>{
    e.preventDefault()
    console.log("Form submitted"); 
    const data = new FormData(e.target)
    const blogObject =Object.fromEntries(data.entries())
    console.log("Blog object:", blogObject);
        try {
      await updateBlog(blogObject).unwrap();
      console.log("Blog updated successfully");
  } catch (err) {
      console.error("Failed to update the blog: ", err);
  }
};

  if(isLoading) return <h1> Loading ...</h1>
  if(isError) return <h1>{ JSON.stringify( error)}</h1>
  const blog = blogsObject.data.find(blog => blog._id === blogId)
  console.log(blogId)
  if(!blog) return <h1>{ "Not found"}</h1>
  return (
    <div className="single-blog">
        {/* הצגת הבלוג הנבחר כאן */}
        <div 
            className="single-blog-content"
            onClick={handleBackClick} /* לחיצה חוזרת תחזיר לדף הראשי */
            style={{ cursor: 'pointer' }}
        >
            {/* תוכן הבלוג */}
            <h1 className="title">{blog.title}</h1>
            <p className="content">{blog.content}</p>
        </div>
        <div className="single-comapny-form-container">
        <form onSubmit={formSubmit} className="single-blog-form">
        <input name="id" defaultValue={blog._id} type="hidden" />
        <label>כותרת</label>
          <input
            defaultValue={blog.title}
            type="text"
            name="title"
            placeholder="הכנס כותרת"
          />
          <label>תוכן</label>
          <input
            defaultValue={blog.content}
            type="text"
            name="content"
            placeholder="הכנס תוכן"
          />
          <button>עדכן</button>
        </form>
      </div>
        <button onClick={handleBackClick}>חזרה לכל הבלוגים</button>
    </div>
  )
}

export default ViewSingleBlog
