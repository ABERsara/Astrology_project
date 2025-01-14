import "./view-single-blog.css"
import { useGetAllBlogsQuery } from "../blogsApiSlice"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"

const ViewSingleBlog = () => {
  const { data: blogsObject, isError, error, isLoading, isSuccess } = useGetAllBlogsQuery()
  const { blogId } = useParams()
  const navigate = useNavigate()
  // פונקציה לחזרה לדף הראשי
  const handleBackClick = () => {
    navigate('/dash/blogs')
  }
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
  if (isLoading) return <h1> Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>
  const blog = blogsObject.data.find(blog => blog._id === blogId)
  console.log(blogId)
  if (!blog) return <h1>{"Not found"}</h1>
  return (
    <div className="single-blog">
      {/* הצגת הבלוג הנבחר כאן */}
      <div
        className="single-blog-content"
        onClick={handleBackClick} /* לחיצה חוזרת תחזיר לדף הראשי */
        style={{ cursor: 'pointer' }}
      >
        {/* תוכן הבלוג */}
        <h1 className="title">{blog.title}</h1>
        <div className="content">
  {renderBlogContent(blog.content)}
</div>

        <button onClick={handleBackClick} className="button-view-single-blog">חזרה לכל הבלוגים</button>

      </div>

    </div>
  )
}

export default ViewSingleBlog
