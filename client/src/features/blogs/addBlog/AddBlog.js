import "./add-blog.css"

import { useAddBlogMutation } from "../blogsApiSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
const AddBlog = () => {
  const [addBlog, { data, isError, error, isSuccess, isLoading }] = useAddBlogMutation()
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/blogs")
    }

  }, [isSuccess])
  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const blogObject = Object.fromEntries(data.entries());

    // בדיקה אם קובץ נבחר בשדה blogUrl
    // if (!blogObject.file || typeof blogObject.file === 'object') {
    //     blogObject.file = ''; // הגדר כמחרוזת ריקה אם לא נבחר קובץ
    // }

    console.log("Data to be sent:", blogObject); // הדפס את הנתונים כדי לוודא שהם נכונים
    addBlog(blogObject);
  }

  return (
    <div className="add-blog-container">
      <form onSubmit={formSubmit} className="add-blog-form">
        <input type="text" required name="title" placeholder="כותרת" />
        <input type="text" required name="content" placeholder="תוכן" />
        {/* <input type="file" name="file" /> */}

        <button type="submit">שלח</button>
      </form>
    </div>
  )
}

export default AddBlog