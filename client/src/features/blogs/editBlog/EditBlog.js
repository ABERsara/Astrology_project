import "./edit-blog.css"
import { useSelector } from 'react-redux';
import { useUpdateBlogMutation } from "../blogsApiSlice";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ViewBlogs from '../viewBlogs/ViewBlogs';

// const EditBlog = () => {
//   const selectedBlog = useSelector((state) => state.selectedBlog);
//   const [updateBlog, { isSuccess: isUpdateSuccess }] = useUpdateBlogMutation();
//   const navigate = useNavigate();
//   const [isPopupOpen, setIsPopupOpen] = useState(false);
//   const [blogData, setBlogData] = useState({
//     title:"",
//     content: "", 
//   });
//   useEffect(() => {
//     if (isUpdateSuccess) {
//       navigate("/dash/blogs");
//     }
//   }, [isUpdateSuccess]);

//   console.log("Selected blog in EditBlog:", selectedBlog); // בדוק את הבלוג המתקבל מהסטור

//   const formSubmit = async (e) => {
//     e.preventDefault();
//     const data = new FormData(e.target);
//     const blogObject = Object.fromEntries(data.entries());
//     // console.log("Blog object:", data);
//     try {
//       await updateBlog(blogObject).unwrap();
//       // console.log("Blog updated successfully");
//     } catch (err) {
//       console.error("Failed to update the blog: ", err);
//     }
//   };

//   if (!selectedBlog) {
//     return <div>לא נבחר בלוג לעדכון</div>;
//   }

//   return (
//     <div>
//       <div className="modal-update">
//         <div className="modal-content-update">
//         <  img
//         className="xMark-edit-blog"
//               src="/xMark.png"
//               alt="x"
//               style={{
//                 cursor: "pointer",
//                 width: "3em",
//                 height: "3em",
//                 borderRadius: "50%",
//                 objectFit: "cover",
//                 // border: "2px solid #ddd",
//               }}
//               onClick={() => setIsPopupOpen(false)} />
//           <h1>עריכת בלוג</h1>
//           <form onSubmit={formSubmit} className="single-blog-form-update">
            
//             <input name="id" defaultValue={selectedBlog._id} type="hidden" />
//             <label>כותרת</label>
//             <input
//               defaultValue={selectedBlog.title}
//               type="text"
//               name="title"
//               placeholder="הכנס כותרת"
//             />
//             <label>תוכן</label>
//             <input
//               defaultValue={selectedBlog.content}
//               type="text"
//               name="content"
//               placeholder="הכנס תוכן"
//             /> <textarea
//             placeholder="כתוב את התוכן כאן..."
//             value={selectedBlog.content}
//             onChange={(e) => {
//               if (e.target.value.length <= 200) {
//                 setBlogData({ ...blogData, content: e.target.value });
//               }
//             }}
//           ></textarea>
//                         <p>{selectedBlog.content.length}/200 תווים</p>

//             {/* <label>בחר קובץ (אם תרצה לעדכן):</label>
// <input type="file" name="file" />
// {selectedBlog.file && (
//   <div>
//     <p>קובץ נוכחי: {selectedBlog.file}</p>
//      הצגת תצוגה מקדימה אם מדובר בתמונה 
//     {selectedBlog.file.endsWith(".jpg") || selectedBlog.file.endsWith(".png") ? (
//       <img
//         src={`/uploads/${selectedBlog.file}`}
//         alt="תצוגה מקדימה"
//         style={{ maxWidth: "200px", maxHeight: "200px" }}
//       />
//     ) : (
//      קישור להורדה אם זה לא תמונה
//       <a href={`/uploads/${selectedBlog.file}`} target="_blank" rel="noopener noreferrer">
//         הורד קובץ קיים
//       </a>
      
//     )}
//       שמירת שם הקובץ הישן בשדה נסתר 
//   <input type="hidden" name="existingFile" value={selectedBlog.file} />
//   </div>
// )} */}


//             <button className="button-form-edit-blog">עדכן</button>
//           </form>
//         </div>
//       </div>
//       <ViewBlogs />
//     </div>
//   );
// };
const EditBlog = () => {
  const selectedBlog = useSelector((state) => state.selectedBlog);
  const [updateBlog, { isSuccess: isUpdateSuccess }] = useUpdateBlogMutation();
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (selectedBlog) {
      setBlogData({
        title: selectedBlog.title,
        content: selectedBlog.content,
      });
    }
  }, [selectedBlog]);

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/blogs");
    }
  }, [isUpdateSuccess]);

  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBlog({ ...blogData, id: selectedBlog._id }).unwrap();
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
          <img
            className="xMark-edit-blog"
            src="/xMark.png"
            alt="x"
            onClick={() => navigate("/dash/blogs")}
          />
          <h1>עריכת בלוג</h1>
          <form onSubmit={formSubmit} className="single-blog-form-update">
            <label>כותרת</label>
            <input
              type="text"
              name="title"
              placeholder="הכנס כותרת"
              value={blogData.title}
              onChange={(e) =>
                setBlogData({ ...blogData, title: e.target.value })
              }
            />
            <label>תוכן</label>
            <textarea
              placeholder="כתוב את התוכן כאן..."
              value={blogData.content}
              onChange={(e) => {
                if (e.target.value.length <= 2000) {
                  setBlogData({ ...blogData, content: e.target.value });
                }
              }}
            ></textarea>
            <p className="blog-content-length">{blogData.content?blogData.content.length:""}/2000 תווים</p>
            <button className="button-form-edit-blog">עדכן</button>
          </form>
        </div>
      </div>
      <ViewBlogs />
    </div>
  );
};

export default EditBlog;
