import { useDispatch } from 'react-redux';
import { setSelectedBlog } from "../selectedBlogSlice"
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

const EditBlogButton = ({ blog }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isUpdateClicked, setIsUpdateClicked] = useState(true);

  const updateClick = (event) => {
    event.stopPropagation();//מונע את הניווט לפני העברה לצפייה
    console.log("Updating blog:", blog); // בדוק את הבלוג לפני השמירה בסטור
    dispatch(setSelectedBlog(blog));
    navigate(`/dash/api/blogs/edit`);
  };

  return (
    <button 
      onClick={updateClick} 
      className="blogs-list-button blogs-list-edit"
    >
      עדכון
    </button>
  );
};

export default EditBlogButton;
