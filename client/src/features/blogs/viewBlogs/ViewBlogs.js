import "./view-blogs.css"
import Search from "../../../components/search/Search"
import { useGetAllBlogsQuery, useDeleteBlogMutation, useAddBlogMutation } from "../blogsApiSlice"
import { Link, useLocation, useNavigate } from "react-router-dom"
import React, { useEffect, useState } from 'react';
import EditBlogButton from "../editBlog/EditBlogButton";
import PopUp from "../../PopUp"; // הייבוא של הפופאפ הקיים
import {
  MdAddToDrive, MdFileDownload, MdOutlineLibraryAdd
} from "react-icons/md"
import useAuth from "../../../hooks/useAuth";
import AddBlog from "../addBlog/AddBlog";
const ViewBlogs = ({ limit = 0 }) => {
  const { data: blogsObject, isLoading, isError, error } = useGetAllBlogsQuery({ limit });
  const navigate = useNavigate();
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [deleteBlog, { isSuccess: isDeleteSuccess }] = useDeleteBlogMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [addBlog, { isSuccess, isError: isAddedError, isLoading: isAddedLoading }] = useAddBlogMutation();
  const { isAdmin, isUser } = useAuth()

  // פונקציה לפתיחה וסגירה של הפופאפ
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  // שליחת הטופס
  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const blogObject = Object.fromEntries(data.entries());
    console.log("Data to be sent:", blogObject);
    addBlog(blogObject);
  };

  // מעקב אחרי הצלחה
  React.useEffect(() => {
    if (isSuccess) {
      closePopup(); // סגור את הפופאפ לאחר שליחה מוצלחת
      navigate("/dash/blogs");
    }
  }, [isSuccess, navigate]);
  console.log(isAdmin);

  const location = useLocation()
  const isAstroPage = location.pathname === "/astro";

  //לחצן למעבר מהיר לבלוג הרצוי
  const handleBlogClick = (blogId) => {
    (isUser || isAdmin) && navigate(`/dash/blogs/${blogId}`)
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
  // מספר התווים הרצוי (לדוגמה 400 תווים)
  const MAX_CONTENT_LENGTH = 800;

  // פונקציה שחותכת את תוכן הפוסט לפי המספר שנקבע
  const getShortContent = (content) => {
    if (!content) {
      return ""; // ערך ברירת מחדל
    }
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

  const splitContentIntoParagraphs = (content) => {
    if (!content) return [];
    return content.split("\n").filter(paragraph => paragraph.trim() !== "");
  };

  const renderBlogContent = (content) => {
    const paragraphs = splitContentIntoParagraphs(content);
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="blog-paragraph">
        {paragraph}
      </p>
    ));
  };

  if (isLoading) return <h1>Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}  (
    <div className="add-blog-container">
      <button onClick={openPopup} className="blogs-list-add-button">
        הוספת פוסט
      </button>
    </div>
    )</h1>

  return (
    <div className="blogs-list">

      {/* פופאפ להוספת פוסט */}
      {isPopupOpen && (
        <PopUp close={closePopup} width="400px">
          <AddBlog closePopup={closePopup} />
        </PopUp>
      )}



      {isAdmin && (
        <div className="add-blog-container">
          <button onClick={openPopup} className="blogs-list-add-button">
            הוספת פוסט
          </button>
        </div>
      )}
      <div className="blogs-list-top">
        {isAstroPage && <Search placeholder="הכנס מילים או מילה שברצונך לחפש" />}

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
            {/* <p className="blog-content">{getShortContent(blog.content)}</p> */}
            <div className="blog-content">
              {renderBlogContent(getShortContent(blog.content))}
            </div>

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
              {isUser && <Link to={`/dash/blogs/${blog._id}`} className="blogs-list-button blogs-list-view">
                להמשיך לקרוא
              </Link>}
              {isAdmin && <EditBlogButton blog={blog} />}{/* הכפתור להצגת עמוד העדכון */}
              {isAdmin && <button
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

export default ViewBlogs;
