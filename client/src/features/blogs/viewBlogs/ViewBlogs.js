import "./view-blogs.css"
import Search from "../../../components/search/Search"
import { useGetAllBlogsQuery, useDeleteBlogMutation } from "../blogsApiSlice"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import EditBlogButton from "../editBlog/EditBlogButton";
import {
  MdAddToDrive, MdFileDownload, MdOutlineLibraryAdd
} from "react-icons/md"
const ViewBlogs = () => {
  const { data: blogsObject, isError, error, isLoading } = useGetAllBlogsQuery();
  const navigate = useNavigate();
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [deleteBlog, { isSuccess: isDeleteSuccess }] = useDeleteBlogMutation();

  //לחצן למעבר מהיר לבלוג הרצוי
  const handleBlogClick = (blogId) => {
    console.log(blogId)
    navigate(`/dash/blogs/${blogId}`)
  }
  const deleteClick = (event, blog) => {
    event.stopPropagation(); // מונע את הפעלת ה-`onClick` על הבלוג
    if (!isDeleteClicked && window.confirm("בטוח שברצונך למחוק את הבלוג?")) {
      setIsDeleteClicked(true);
      deleteBlog({ id: blog._id }).then(() => {
        navigate("/dash/blogs");
      });
    }
  }
  //פונקצייה להורדת קובץ
  const handleFileDownload = async (event, fileUrl, fileName) => {
    event.stopPropagation(); // מונע פתיחת הבלוג
    event.preventDefault();

    try {
      const response = await fetch(fileUrl);
      //המרת הקובץ לקובץ מתאים להורדה: Binary Large Object
      const blob = await response.blob();
      //כתובת זמנית עבור הקובץ להורדה
      const url = window.URL.createObjectURL(blob);
      //אלמנט זמני כנ"ל
      const link = document.createElement("a");
      //קישור לקובץ ההורדה
      link.href = url;
      link.setAttribute("download", fileName);
      //הוספת הקישור לדף כדי שנוכל להוריד אותו
      document.body.appendChild(link);
      //מדמה פעולת קליק כדי להוריד את הקובץ
      link.click();
      link.parentNode.removeChild(link); // מנקה את ה-<a> שנוצר
      window.URL.revokeObjectURL(url); // משחרר את ה-URL מהזיכרון
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };
  useEffect(() => {
    if (isDeleteSuccess) {
      navigate("/dash/blogs");
    }
  }, [isDeleteSuccess, navigate]);

  if (isLoading) return <h1>Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>

  return (
    <div className="blogs-list">
      <div className="blogs-list-top">
        <Search placeholder="חיפוש לפי שם חברה" />
        <Link to="/dash/blogs/add" className="blogs-list-add-button">
          הוספת בלוג
        </Link>
      </div>
      <div className="blogs-container">
        {blogsObject.data?.map(blog => (
          <div
            key={blog._id}
            className="blog-item"
            onClick={() => handleBlogClick(blog._id)} /* כאן מבוצע ניתוב בלחיצה */
            style={{ cursor: 'pointer' }}
          >
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{blog.content}</p>
            {blog.file && (
              <div className="blog-file">
                <img src={blog.file ? `http://localhost:2024/uploads/${blog.file}` : "/noavatar.png"}
                  alt=""
                  width={60}
                  height={40}
                  className="blog-list-blog-file" />
                <a
                  href={`http://localhost:2024/uploads/${blog.file}`}
                  onClick={(event) => handleFileDownload(event, `http://localhost:2024/uploads/${blog.file}`, blog.file)}>
                  <MdFileDownload />
                </a>
                <div >
                  <MdAddToDrive />
                </div>
                <div><MdOutlineLibraryAdd />
                </div>
              </div>

            )}
            <div className="blog-actions">
              <Link to={`/dash/blogs/${blog._id}`} className="blogs-list-button blogs-list-view">
                צפייה
              </Link>
              <EditBlogButton blog={blog} /> {/* הכפתור להצגת עמוד העדכון */}
              <button
                onClick={(event) => deleteClick(event, blog)}
                className="blogs-list-button blogs-list-delete"
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

export default ViewBlogs;
