import React, { useEffect, useState } from 'react';
import './change-password.css';
import { useUpdateUserMutation, useGetUserQuery } from "../userApiSlice";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { id } = useAuth();
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();
  const { data: user, isSuccess: isGetUserSuccess} = useGetUserQuery(id,{refetchOnMountOrArgChange:true}); // קריאה עם ה-ID
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/user");
    }
  }, [isUpdateSuccess, navigate]);

  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    updateUser(data);
  };

  
  if (!user) {
    return (
      <div>
        <h1>User {id} not found</h1>
      </div>
    );
  }

  return (
    <div className="edit-profile">
      <form className="edit-profile-form" onSubmit={formSubmit}>
        <input name="id" defaultValue={user.id} type="hidden" />
        <input type="hidden" name="image" placeholder="העלה תמונה" />
        <input type="hidden" name="firstName" placeholder="הכנס שם פרטי" defaultValue={user.firstname} />
        <input type="hidden" name="lastName" placeholder="הכנס שם משפחה" defaultValue={user.lastname} />
        <input type="hidden" name="phone" placeholder="הכנס מס' טלפון" defaultValue={user.phone} />
        <input type="hidden" name="email" placeholder="הכנס כתובת מייל" defaultValue={user.email} />

        <div className="password-input">
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            name="password"
            placeholder="הכנס סיסמה"
            defaultValue={user.password}
          />
          <span
            className="toggle-password-visibility"
            onMouseEnter={() => setShowPassword(true)} // Show password when mouse is over the icon
            onMouseLeave={() => setShowPassword(false)} // Hide password when mouse leaves the icon
          >
            👁️
          </span>
        </div>
        <button type="submit">עדכן</button>
        <button type="button" onClick={() => navigate('/dash/user')}>בטל</button>
      </form>
    </div>
  );
};

export default ChangePassword;
