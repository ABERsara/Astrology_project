
import { useUpdateUserMutation, useGetUserQuery } from "../userApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

const RequestDiagnosis = () => {
  const navigate = useNavigate(); 
  const {id}= useAuth()
  const { data: user, isSuccess: isGetUserSuccess} = useGetUserQuery(id,{refetchOnMountOrArgChange:true}); // קריאה עם ה-ID
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();
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
  
  return (<div className="edit-profile">
    <form className="edit-profile-form" onSubmit={formSubmit}>
      <input name="id" defaultValue={user.id} type="hidden" />
      <input type="text" name="firstname" required placeholder="הכנס שם פרטי" defaultValue={user.firstname} />
      <input type="text" name="lastname" placeholder="הכנס שם משפחה" defaultValue={user.lastname} />
      <input type="phone" name="phone" placeholder="הכנס מס' טלפון" defaultValue={user.phone} />
      <input type="email" name="email" required placeholder="הכנס כתובת מייל" defaultValue={user.email} />
      <input name="password" defaultValue={user.password} type="hidden" />
      {/* <input type="file" name="image" placeholder="העלה תמונה" /> */}
      <input name="permission" defaultValue={user.permission} type="hidden" />
      <button type="submit">עדכן</button>
      <button type="button" onClick={() => navigate('/dash/user')}>בטל</button>
    </form>
  </div>)
}
export default RequestDiagnosis