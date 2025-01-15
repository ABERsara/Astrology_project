import "./view-single-user.css"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { useGetAllUsersQuery, useUpdateUserMutation } from "../../user/userApiSlice";

const ViewSingleUser = ({userId}) => {
  const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery();
  // const { userId } = useParams();
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {

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
      <div className="single-user-content" style={{ cursor: 'pointer' }}>
      <img src="/xMark.png" alt="x" className="close-popup-view-users img-back" onClick={handleBackClick} />
          <div  style={{ cursor: 'pointer' }}>
        <div className="single-user-info">
          <div className="single-user-img-container">
            <img
                src={user.image ? `http://localhost:2024/uploads/${user.image}` : "/account.png"}
                alt="profile"
                className="edit-profile-item image"
                style={{
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
           
          </div>
          <div className="single-user-personal-details">
          <p>שם: {user.firstname} {user.lastname || ""}</p>
            <p>אימייל: {user.email}</p>
            <p>טלפון: {user.phone || ""}</p>
          </div>
          {/* <p> {" "}{user.firstname } {user.lastname ? user.lastname : ""}</p>
          <p> {" "}{user.email}</p>
          <p>{" "}{user.phone ? user.phone : ""}</p> */}
        </div>
            <form onSubmit={formSubmit} className="single-user-form">
              <input name="id" defaultValue={user._id} type="hidden" />
              <input name="firstname" defaultValue={user.firstname} type="hidden" />
              <input name="email" defaultValue={user.email} type="hidden" />
              <label>הרשאה</label>
              <select name="permission" defaultValue={user.permission}>
                <option value="User">משתמש</option>
                <option value="Admin">מנהל</option>
                <option value="Group">מנהל קבוצה</option>
              </select>
              <label>פעיל</label>
              <select name="active" defaultValue={user.active}>
                <option value={false}>לא פעיל</option>
                <option value={true}>פעיל</option>
              </select>
              <button type="submit" className="update-button-user">
                עדכן
              </button>
            </form>
          </div>
         
    </div>
  );
}

export default ViewSingleUser;
