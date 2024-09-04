// EditBlog.js
import React from 'react';
import { useSelector } from 'react-redux';
import {useUpdateBlogMutation} from "../blogsApiSlice"
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const EditBlog = () => {
  const selectedBlog = useSelector((state) => state.selectedBlog);
  const [updateBlog, {isSuccess: isUpdateSuccess}] = useUpdateBlogMutation()
 const navigate = useNavigate()

 useEffect(()=>{
  if(isUpdateSuccess){
    navigate("/dash/api/blogs/view")
  }
}, [isUpdateSuccess])
  console.log("Selected blog in EditBlog:", selectedBlog); // בדוק את הבלוג המתקבל מהסטור
  const formSubmit =async (e) =>{
    e.preventDefault()
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
  if (!selectedBlog) {
    return <div>לא נבחר בלוג לעדכון</div>;
  }

  return (
    <div>
      <h1>עריכת בלוג</h1>
      <form onSubmit={formSubmit} className="single-blog-form">
        <input name="id" defaultValue={selectedBlog._id} type="hidden" />
        <label>כותרת</label>
          <input
            defaultValue={selectedBlog.title}
            type="text"
            name="title"
            placeholder="הכנס כותרת"
          />
          <label>תוכן</label>
          <input
            defaultValue={selectedBlog.content}
            type="text"
            name="content"
            placeholder="הכנס תוכן"
          />
          <button>עדכן</button>
        </form>
    </div>
  );
};

export default EditBlog;
