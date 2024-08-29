import "./view-blogs.css"
import Search from "../../../components/search/Search"
import {useGetAllBlogsQuery, useDeleteBlogMutation} from "../blogsApiSlice"
import {Link, useNavigate} from "react-router-dom"

const ViewBlogs = () => {
  const  {data: blogsObject, isError, error, isLoading, isSuccess} = useGetAllBlogsQuery()
  const [deleteBlog, {isSuccess: isDeleteSuccess}] = useDeleteBlogMutation()
  const navigate = useNavigate()

  const deleteClick = (blog) => {
      if (window.confirm("בטוח שברצונך למחוק את הבלוג ?")) {
          deleteBlog({_id: blog._id})
      }
  }

  const handleBlogClick = (blogId) => {
      navigate(`/dash/api/blogs/${blogId}`)
  }

  if(isLoading) return <h1>Loading ...</h1>
  if(isError) return <h1>{JSON.stringify(error)}</h1>

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
                        <button onClick={() => deleteClick(blog)} className="blogs-list-button blogs-list-delete">
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
