import React, { useEffect, useState } from 'react';
import './change-password.css';
import { useUpdateUserMutation, useGetUserQuery } from "../userApiSlice";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { id } = useAuth();
  const [updateUser, { isSuccess: isUpdateSuccess, isError, error }] = useUpdateUserMutation();
  const { data: user, isSuccess: isGetUserSuccess } = useGetUserQuery(id, { refetchOnMountOrArgChange: true });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/user");
    }
  }, [isUpdateSuccess]);

  const formSubmit = (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.target);

    const updatedUser = {
      ...user,
      password: dataForm.get('password'),
      id: user?._id
    };

    console.log("נתונים שהתקבלו:", updatedUser);

    try {
      updateUser(updatedUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isError && <h1>{JSON.stringify(error)}</h1>}
      {!user ? (
        <div>
          <h1>משתמש {id} לא נמצא</h1>
        </div>
      ) : (
        <div className="edit-profile">
          <form className="edit-profile-form" onSubmit={formSubmit}>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="הכנס סיסמה חדשה"
                defaultValue={user?.password} // בדקי האם הסיסמה קיימת
              />
              <span
                className="toggle-password-visibility"
                onMouseEnter={() => setShowPassword(true)}
                onMouseLeave={() => setShowPassword(false)}
              >
                👁️
              </span>
            </div>
            <button type="submit">עדכן</button>
            <button type="button" onClick={() => navigate('/dash/user')}>בטל</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
