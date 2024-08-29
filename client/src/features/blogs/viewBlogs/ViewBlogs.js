import "./view-blogs.css"
import Search from "../../../components/search/Search"
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../blogsApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { useState } from 'react';

const ViewBlogs = () => {
  const { data: blogsObject, isError, error, isLoading, isSuccess } = useGetAllBlogsQuery()
  const navigate = useNavigate()
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [deleteBlog, { isSuccess: isDeleteSuccess }] = useDeleteBlogMutation()

  const deleteClick = (blog) => {
    if (!isDeleteClicked && window.confirm("בטוח שברצונך למחוק את הבלוג ?")) {
      setIsDeleteClicked(true);
      deleteBlog({ id: blog._id }).then(() => {
        navigate("/dash/api/blogs/view");
      });
    }
  }
  useEffect(() => {
    if (isDeleteSuccess) {
      navigate("/dash/api/blogs/view");
    }
  }, [isDeleteSuccess, navigate]);

  const handleBlogClick = (blogId) => {
    console.log(blogId)
    navigate(`/dash/api/blogs/${blogId}`)
  }
  
  if (isLoading) return <h1>Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>

  return (
    <div className="blogs-list">
      <div className="blogs-list-top">
        <Search placeholder="חיפוש לפי שם חברה" />
        <Link to="/dash/api/blogs/add" className="blogs-list-add-button">
          הוספת בלוג
        </Link>
      </div>
      <div className="blogs-container">
        {blogsObject.data?.map(blog => (
          <div
            key={blog._id}
            className="blog-item"
            onClick={() => handleBlogClick(blog._id)} /* כאן מבוצע ניתוב בלחיצה */
            style={{ cursor: 'pointer' }} /* להפוך את הבלוג לקליקבילי */
          >
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
            {blog.file && (
              <div className="blog-file">
                <a href={blog.file.url} download>הורדת קובץ</a>
              </div>
            )}
            <div className="blog-actions">
              <Link to={`/dash/api/blogs/${blog._id}`} className="blogs-list-button blogs-list-view">
                צפייה
              </Link>
              <Link to={'/dash/api/blogs/edit'} >
              עדכון
              </Link>
              <button
                onClick={() => deleteClick(blog)}
                className="blogs-list-button blogs-list-delete"
                disabled={isDeleteClicked}
              >
                מחיקה
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewBlogs
