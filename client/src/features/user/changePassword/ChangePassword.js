import "./change-password.css"
import { useUpdateUserMutation, useGetAllUsersQuery } from "../userApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Fix: Use named import
import Cookies from "js-cookie"; // Import js-cookie
import useAuth from "../../../hooks/useAuth";
const ChangePassword = () => {
  const navigate = useNavigate(); 
  const {_id}=useAuth()
  const { data: usersObject, isError, error, isLoading } = useGetAllUsersQuery();
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/user");
    }
  }, [isUpdateSuccess, navigate]);
  
  
  
  
  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    updateUser(data); // Use FormData to send form data
  };

  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  const user = usersObject?.data.find((user) => user._id === _id);
  if (!user) return <h1>{"Not found"}</h1>;

  return (
    <div className="edit-profile">
      <form className="edit-profile-form" onSubmit={formSubmit}>
        <input name="id" defaultValue={user._id} type="hidden" />
        <input type="hidden" name="image" placeholder="העלה תמונה" />
        <input type="hidden" name="firstName"  placeholder="הכנס שם פרטי" defaultValue={user.firstname} />
        <input type="hidden" name="lastName" placeholder="הכנס שם משפחה" defaultValue={user.lastname} />
        <input type="username" name="username"placeholder="הכנס שם משתמש" defaultValue={user.username} />
        <input type="hidden" name="phone" placeholder="הכנס מס' טלפון" defaultValue={user.phone} />
        <input type="hidden" name="email"  placeholder="הכנס כתובת מייל" defaultValue={user.email} />
        <input type="hidden" name="password"  placeholder="הכנס סיסמה" defaultValue={user.email} />
        <button type="submit">עדכן</button>
        <button type="cancel">בטל</button>
      </form>
    </div>
  );
};

export default ChangePassword;
