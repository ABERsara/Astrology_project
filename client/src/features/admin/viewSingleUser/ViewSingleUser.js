import "./view-single-user.css"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useGetAllUsersQuery, useUpdateUserMutation } from "../../user/userApiSlice";

const ViewSingleUser = () => {
  const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery();
  const { userId } = useParams();
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();

  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("הגעתי לנוויגציה")

    if (isUpdateSuccess) {
      navigate("/dash/manage/users");
    }
  }, [isUpdateSuccess, navigate]);

  // פונקציה לחזרה לדף הראשי
  const handleBackClick = () => {
    navigate('/dash/manage/users');
  }

  // פונקציה לטיפול בעידכון
  const formSubmit = (e) => {
    console.log("הגעתי לעדכון הטופס")

    e.preventDefault();
    const data = new FormData(e.target);
    const usersObject = Object.fromEntries(data.entries());
    updateUser(usersObject);
  }

  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  const user = usersObject.data.find(user => user._id === userId);
  if (!user) return <h1>{"Not found"}</h1>;

  return (
    <div className="single-user">
      <div className="single-user-content" style={{ cursor: 'pointer' }}>
        <div className="single-user-info">
          <div className="single-user-img-container">
            {/* מידע על המשתמש */}
            {user.image}
          </div>
          <p>שם : {" "}{user.firstname } {user.lastname ? user.lastname : ""}</p>
          <p>אימייל: {" "}{user.email}</p>
          <p>טלפון:{" "}{user.phone ? user.phone : ""}</p>
        </div>

        <form onSubmit={formSubmit} className="single-user-form">
          <input name="id" defaultValue={user._id} type="hidden" />
          <input name="firstname" defaultValue={user.firstname} type="hidden" />
          <input name="email" defaultValue={user.email} type="hidden" />
          <label>הרשאה</label>
          <select name="permission" id="permission">
            <option selected={user.permission === "User"} value="User">משתמש</option>
            <option selected={user.permission === "Admin"} value="Admin">מנהל</option>
            <option selected={user.permission === "Group"} value="Group">מנהל קבוצה</option>
          </select>

          <label>פעיל</label>
          <select name="active" id="active">
            <option selected={!user.active} value={false}>לא פעיל</option>
            <option selected={user.active} value={true}>פעיל</option>
          </select>

          {/* כפתור לעדכון */}
          <button type="submit" className="update-button-user">עדכן</button>
        </form>
      </div>
      <button onClick={handleBackClick} className="back-button-user">חזרה לכל המשתמשים</button>
    </div>
  );
}

export default ViewSingleUser;
