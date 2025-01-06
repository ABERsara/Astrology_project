import "./view-users.css";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from "../../user/userApiSlice";
import Search from "../../../components/search/Search";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Popup from "../../PopUp";

const ViewUsers = () => {
  const { data: usersObject, isError, error, isLoading, isSuccess } = useGetAllUsersQuery();
  const navigate = useNavigate();
  const [isDeleteClicked, setIsDeleteClicked] = useState(false);
  const [deleteUser, { isSuccess: isDeleteSuccess }] = useDeleteUserMutation();
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);

  const openUpdatePopup = (user) => {
    setSelectedUser(user);
    setIsUpdatePopupOpen(true);
  };

  const closePopup = () => {
    setSelectedUser(null);
    setIsUpdatePopupOpen(false);
  };

  const deleteClick = (event, user) => {
    event.stopPropagation();
    if (!isDeleteClicked && window.confirm("בטוח שברצונך למחוק את המשתמש הנוכחי?")) {
      setIsDeleteClicked(true);
      deleteUser({ id: user._id });
    }
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const updatedUser = Object.fromEntries(data.entries());
    updateUser(updatedUser);
  };

  useEffect(() => {
    if (isUpdateSuccess || isDeleteSuccess) {
      closePopup();
      navigate("/dash/manage/users");
    }
  }, [isUpdateSuccess, isDeleteSuccess, navigate]);

  if (isLoading) return <h1>Loading ...</h1>;
  if (!usersObject) return <h1>There isn't found users</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  return (
    <div className="users-list">
      <div className="users-list-search">
        <Search placeholder={"חיפוש לפי שם או מייל"} />
        <table className="users-table">
          <thead>
            <tr>
              <td>שם מלא</td>
              <td>טלפון</td>
              <td>אימייל</td>
              <td>הרשאה</td>
              <td>פעיל?</td>
              <td>נרשם לאתר בתאריך?</td>
              <td>פעולות</td>
            </tr>
          </thead>
          <tbody>
            {usersObject.data?.map((user) => (
              <tr
                key={user._id}
                onClick={(e) => {
                  e.stopPropagation();
                  openUpdatePopup(user);
                }}
                onMouseEnter={(e) => e.currentTarget.classList.add("hovered")}
                onMouseLeave={(e) => e.currentTarget.classList.remove("hovered")}
              >
                <td>
                  <div className="users-details">
                    <img
                      className="users-list-image"
                      src={user.image ?  `http://localhost:2024/uploads/${user.image}` : "/account-white.png"}
                      alt=""
                      width={40}
                      height={40}
                    />
                    {`${user.firstname ? user.firstname : ""}  ${user.lastname ? user.lastname : ""} `}
                  </div>
                </td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>
                  {user.permission === "User" ? "משתמש " : user.permission === "Admin" ? " מנהל" : "מנהל קבוצה"}
                </td>
                <td>{user.active ? "פעיל" : "לא פעיל"}</td>
                <td className="users-list-createdAt">{format(new Date(user.createdAt), "dd-MM-yyyy")}</td>
                <td>
                  <div className="users-list-buttons">
                    <button
                      className="users-list-button users-list-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        openUpdatePopup(user);
                      }}
                    >
                      עדכון
                    </button>
                    <button
                      className="users-list-button users-list-delete"
                      onClick={(event) => deleteClick(event, user)}
                    >
                      מחיקה
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* פופאפ לעדכון */}
      {isUpdatePopupOpen && selectedUser && (
        <Popup close={closePopup} width={"500px"}>
          <img src="/xMark.png" alt="x" className="close-popup-view-users img-back" onClick={closePopup} />
          <div  style={{ cursor: 'pointer' }}>
        <div className="single-user-info">
          <div className="single-user-img-container">
            {/* מידע על המשתמש */}
            <img
                src={selectedUser.image ? `http://localhost:2024/uploads/${selectedUser.image}` : "/account.png"}
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
          <p> {" "}{selectedUser.firstname } {selectedUser.lastname ? selectedUser.lastname : ""}</p>
          <p> {" "}{selectedUser.email}</p>
          <p>{" "}{selectedUser.phone ? selectedUser.phone : ""}</p>
        </div>
            <form onSubmit={formSubmit} className="single-user-form">
              <input name="id" defaultValue={selectedUser._id} type="hidden" />
              <input name="firstname" defaultValue={selectedUser.firstname} type="hidden" />
              <input name="email" defaultValue={selectedUser.email} type="hidden" />
              <label>הרשאה</label>
              <select name="permission" defaultValue={selectedUser.permission}>
                <option value="User">משתמש</option>
                <option value="Admin">מנהל</option>
                <option value="Group">מנהל קבוצה</option>
              </select>
              <label>פעיל</label>
              <select name="active" defaultValue={selectedUser.active}>
                <option value={false}>לא פעיל</option>
                <option value={true}>פעיל</option>
              </select>
              <button type="submit" className="update-button-user">
                עדכן
              </button>
            </form>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default ViewUsers;
