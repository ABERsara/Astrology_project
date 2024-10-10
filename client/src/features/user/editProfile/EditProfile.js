import "./edit-Profile.css";
import { useUpdateUserMutation, useGetUserQuery } from "../userApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id } = useAuth()
  const { data: user, isSuccess: isGetUserSuccess } = useGetUserQuery(id, { refetchOnMountOrArgChange: true }); // קריאה עם ה-ID
  const [updateUser, { isSuccess: isUpdateSuccess, isError, error }] = useUpdateUserMutation();
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/user");
    }
  }, [isUpdateSuccess]);



  const formSubmit = (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const data = { ...user,
      firstname:dataForm.get('firstname'),
      lastname: dataForm.get('lastname'),
      phone:dataForm.get('phone'),
      email:dataForm.get('email'),
       id: user._id };
    console.log("זה הנתונים שהתקבלו: ", dataForm, data);
    try {
      updateUser(data);
      console.log("המשתמש עודכן בהצלחה");
    } catch (error) {
      console.log(error);


    };
  }
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
            <input type="text" name="firstname" required  defaultValue={user.firstname} />
            <input type="text" name="lastname"  defaultValue={user.lastname?user.lastname:"עדכן עכשיו שם משפחה"} />
            <input type="phone" name="phone" defaultValue={user.phone? user.phone:"עדכן עכשיו מס' נייד"} />
            <input type="email" name="email" required  defaultValue={user.email} />
            {/* <input type="file" name="image" placeholder="העלה תמונה" /> */}
            <button type="submit">עדכן</button>
            <button type="button" onClick={() => navigate('/dash/user')}>בטל</button>
          </form>
        </div>
        )}
      </>
    );
  };
  
  export default EditProfile;
  
