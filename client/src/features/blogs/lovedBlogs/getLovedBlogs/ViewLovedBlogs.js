import "./view-blogs.css"
import Search from "../../../components/search/Search"
import { useAddLovedBlogMutation,useGetUserLovedBlogsQuery,useRemoveLovedBlogMutation } from "../lovedBlogsApiSlice"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import {
  MdAddToDrive, MdFileDownload, MdOutlineLibraryAdd
} from "react-icons/md"
import useAuth from "../../../hooks/useAuth";
const ViewLovedBlogs = () => {
  const { data: blogsObject, isLoading, isError, error } = useGetUserLovedBlogsQuery();
  const navigate = useNavigate();
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [deleteBlog, { isSuccess: isDeleteSuccess }] = useRemoveLovedBlogMutation();
  const { id ,isAdmin,isUser} = useAuth()

  
  //לחצן למעבר מהיר לבלוג הרצוי
  const handleBlogClick = (blogId) => {
    (isUser||isAdmin)&&navigate(`/dash/blogs/${blogId}`)
  }
  const deleteClick = (event, blog) => {
    event.stopPropagation(); // מונע את הפעלת ה-`onClick` על הבלוג
    if (!isDeleteClicked && window.confirm("בטוח שברצונך למחוק את הבלוג?")) {
      setIsDeleteClicked(true);
      deleteBlog({userId:id ,blogId: blog._id }).then(() => {
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
  // מספר התווים הרצוי (לדוגמה 400 תווים)
  const MAX_CONTENT_LENGTH = 800;

  // פונקציה שחותכת את תוכן הפוסט לפי המספר שנקבע
  const getShortContent = (content) => {
    if (content.length > MAX_CONTENT_LENGTH) {
      return content.slice(0, MAX_CONTENT_LENGTH) + "…";
    }
    return content;
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      navigate("/dash/blogs");
    }
  }, [isDeleteSuccess, navigate]);

  if (isLoading) return <h1>Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}{isAdmin && <Link to="/dash/blogs/add" className="blogs-list-add-button">
    הוספת בלוג
  </Link>}</h1>

  return (
    <div className="blogs-list">
      <div className="blogs-list-top">
        <Search placeholder="חיפוש לפי שם חברה" />
        
      </div>
      {isAdmin && <Link to="/dash/blogs/add" className="blogs-list-add-button">
          הוספת בלוג
        </Link>}
      <div className="blogs-container">
     
        {blogsObject.data?.map(blog => (
          <div
            key={blog._id}
            className="blog-item"
            onClick={() => handleBlogClick(blog._id)} /* כאן מבוצע ניתוב בלחיצה */
            style={{ cursor: 'pointer' }}
          >
            <h2 className="blog-title">{blog.title}</h2>
            <p className="blog-content">{getShortContent(blog.content)}</p>
            {/* {blog.file && (
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

            )} */}
            <div className="blog-actions">
             {isUser&&<Link to={`/dash/blogs/${blog._id}`} className="blogs-list-button blogs-list-view">
               להמשיך לקרוא
              </Link>}
              {isAdmin && <EditBlogButton blog={blog} />}{/* הכפתור להצגת עמוד העדכון */}
              {isAdmin  && <button
                onClick={(event) => deleteClick(event, blog)}
                className="blogs-list-button blogs-list-delete"
              >
                מחיקה
              </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewLovedBlogs;
