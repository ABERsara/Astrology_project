import "../editBlog/edit-blog.css"
import { useAddBlogMutation } from "../blogsApiSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const AddBlog = ({ closePopup }) => {
  const [addBlog, { data, isError, error, isSuccess, isLoading }] = useAddBlogMutation()
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
  });

  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      closePopup(); // סגור את הפופאפ
      navigate("/dash/blogs"); // נווט לעמוד הבלוגים
    }
  }, [isSuccess, navigate]);


  const formSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBlog({ ...blogData }).unwrap();
    } catch (err) {
      console.error("Failed to update the blog: ", err);
    }
  };

  return (
    <div className="modal-update">
      <div className="modal-content-update">
        <img
          className="xMark-edit-blog"
          src="/xMark.png"
          alt="x"
          onClick={() => {
            closePopup()

            navigate("/dash/blogs")
          }}
        />
        <h1>הוספת בלוג</h1>
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
              setBlogData((prev) => ({
                ...prev,
                content: e.target.value,
              }));
            }}
          ></textarea>
          <p className="blog-content-length">{blogData.content ? blogData.content.length : ""}/2000 תווים</p>
          <button className="button-form-edit-blog">הוסף</button>
        </form>
      </div>
    </div>
  )
}

export default AddBlog