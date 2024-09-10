import "./view-users.css"
import { useDeleteUserMutation, useGetAllUsersQuery } from "../../user/userApiSlice"
import Search from "../../../components/search/Search"
import { Link, useNavigate } from "react-router-dom"
import { format } from 'date-fns';
import { useDeleteBlogMutation } from "../../blogs/blogsApiSlice";
import { useEffect, useState } from "react";

const ViewUsers = () => {

  const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery()
  const navigate = useNavigate();
  const [isDeleteClicked, setIsDeleteClicked] = useState(false)
  const [deleteBlog, { isSuccess: isDeleteSuccess }] = useDeleteBlogMutation();

  //לחצן למעבר מהיר למשתמש הרצוי
  const handleUserClick = (userId) => {
    console.log(userId)
    navigate(`/dash/manage/users/${userId}`)
  }
  const deleteClick = (event, user) => {
    event.stopPropagation(); // מונע את הפעלת ה-`onClick` על הבלוג
    if (!isDeleteClicked && window.confirm("בטוח שברצונך למחוק את המשתמש הנוכחי?")) {
      setIsDeleteClicked(true);
      deleteBlog({ id: user._id }).then(() => {
        navigate("/dash/manage/users");
      });
    }
  }
  useEffect(() => {
    if (isDeleteSuccess) {
      navigate("/dash/manage/users");
    }
  }, [isDeleteSuccess, navigate]);

  if (isLoading) return <h1>Loading ...</h1>
  if (!usersObject) return <h1>There isn't found users</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>

  return (

    <div className="users-list">
      <div className="users-list-search">
        <Search placeholder={"חיפוש לפי שם משתמש"} />
        <table className="users-table" >
          <thead>
            <tr>
              <td>שם מלא</td>
              <td>שם משתמש</td>
              <td>טלפון</td>
              <td>אימייל</td>
              <td>הרשאה</td>
              <td>פעיל?</td>
              <td >נרשם לאתר בתאריך?</td>
              <td>פעולות</td>
            </tr>
          </thead>
          <tbody >
            {usersObject.data?.map(user => (
              <tr key={user._id} onClick={() => handleUserClick(user._id)}>
                <td>
                  <div className="users-details">
                    <img className="users-list-image" src={user.image ? `http://localhost:2024/uploads/${user.image}` : '/noavatar.png'} alt="" width={40} height={40} />
                    {`${user.firstname ? user.firstname : ""}  ${user.lastname ? user.lastname : ""} `}
                  </div>
                </td>
                <td>{user.username}</td>
                <td>
                  {user.phone}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.permission === "User" ? "משתמש " : user.permission === "Admin" ? " מנהל" : "מנהל קבוצה"}
                </td>
                <td>
                  {user.active ? "פעיל" : "לא פעיל"}
                </td>
                <td className="users-list-createdAt">{format(user.createdAt.slice(0, 10), 'dd-MM-yyyy')}</td>
                <td>
                  <div className="users-list-buttons">
                    <Link className="users-list-button users-list-view" to={`dash/manage/users/${user._id}`}>
                      צפיה
                    </Link>
                    <button className="users-list-button users-list-delete"
                      onClick={(event) => deleteClick(event, user)}
                    >מחיקה</button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewUsers

