import "./edit-blog.css"
import { useSelector } from 'react-redux';
import { useUpdateBlogMutation } from "../blogsApiSlice";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ViewBlogs from '../viewBlogs/ViewBlogs';

const EditBlog = () => {
  const selectedBlog = useSelector((state) => state.selectedBlog);
  const [updateBlog, { isSuccess: isUpdateSuccess }] = useUpdateBlogMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/blogs");
    }
  }, [isUpdateSuccess]);

  console.log("Selected blog in EditBlog:", selectedBlog); // בדוק את הבלוג המתקבל מהסטור

  const formSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const blogObject = Object.fromEntries(data.entries());
    // console.log("Blog object:", data);
    try {
      await updateBlog(blogObject).unwrap();
      // console.log("Blog updated successfully");
    } catch (err) {
      console.error("Failed to update the blog: ", err);
    }
  };

  if (!selectedBlog) {
    return <div>לא נבחר בלוג לעדכון</div>;
  }

  return (
    <div>
    <div className="modal-update">
      <div className="modal-content-update">
        <h1>עריכת בלוג</h1>
        <form onSubmit={formSubmit} className="single-blog-form-update">
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
         {/* <label>בחר קובץ (אם תרצה לעדכן):</label>
<input type="file" name="file" />
{selectedBlog.file && (
  <div>
    <p>קובץ נוכחי: {selectedBlog.file}</p>
     הצגת תצוגה מקדימה אם מדובר בתמונה 
    {selectedBlog.file.endsWith(".jpg") || selectedBlog.file.endsWith(".png") ? (
      <img
        src={`/uploads/${selectedBlog.file}`}
        alt="תצוגה מקדימה"
        style={{ maxWidth: "200px", maxHeight: "200px" }}
      />
    ) : (
     קישור להורדה אם זה לא תמונה
      <a href={`/uploads/${selectedBlog.file}`} target="_blank" rel="noopener noreferrer">
        הורד קובץ קיים
      </a>
      
    )}
      שמירת שם הקובץ הישן בשדה נסתר 
  <input type="hidden" name="existingFile" value={selectedBlog.file} />
  </div>
)} */}


          <button className="button-form-edit-blog">עדכן</button>
        </form>
      </div>
    </div>
    <ViewBlogs/>
    </div>
  );
};

export default EditBlog;
