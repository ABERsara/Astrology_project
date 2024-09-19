import "./edit-Profile.css";
import { useUpdateUserMutation, useGetAllUsersQuery } from "../userApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Fix: Use named import
import Cookies from "js-cookie"; // Import js-cookie
import useAuth from "../../../hooks/useAuth";

const EditProfile = () => {
  const navigate = useNavigate(); 
  const {_id}= useAuth()
  const { data: usersObject, isError, error, isLoading } = useGetAllUsersQuery();
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation();
  useEffect(() => {
    if (isUpdateSuccess) {
      navigate("/dash/user");
    }
  }, [isUpdateSuccess, navigate]);
  
  // Get the token from cookies using js-cookie
  // const token = Cookies.get("jwt"); // assuming the token is stored under the name "token"
  // console.log(token)
  // Check if the token exists
  // if (!token) {
  //   console.error("No token found, redirecting to login.");
  //   navigate("/login"); // Redirect to login if no token is found
  //   return null; // Prevent further rendering
  // }
  
  // let decodedToken;
  // try {
  //   decodedToken = jwtDecode(token); // Decode the token
  // } catch (error) {
  //   console.error("Invalid token:", error.message);
  //   navigate("/login"); // Redirect to login if the token is invalid
  //   return null;
  // }

  // const userId = decodedToken._Id; // Assume the user ID is stored in the token
  
  
  
  const formSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = {};
    
    // Convert FormData to a regular object
    formData.forEach((value, key) => {
      data[key] = value;
    });
    try{
    await updateUser(data)
      .unwrap()
      .then(response => {
        console.log("Update success:", response);
        navigate("/dash/user");
      })
     
  } catch(error ) {
    console.error("Update failed:", error);
  }
}
  

  if (isLoading) return <h1>Loading ...</h1>;
  if (isError) return <h1>{JSON.stringify(error)}</h1>;

  const user = usersObject?.data.find((user) => user._id === _id);
  if (!user) return <h1>{"Not found"}</h1>;

  return (
    <div className="edit-profile">
      <form className="edit-profile-form" onSubmit={formSubmit}>
        <input name="id" defaultValue={user._id} type="hidden" />
        <input type="text" name="firstname" required placeholder="הכנס שם פרטי" defaultValue={user.firstname} />
        <input type="text" name="lastname" placeholder="הכנס שם משפחה" defaultValue={user.lastname} />
        <input type="phone" name="phone" placeholder="הכנס מס' טלפון" defaultValue={user.phone} />
        <input type="email" name="email" required placeholder="הכנס כתובת מייל" defaultValue={user.email} />
        <input name="password" defaultValue={user.password} type="hidden" />
        {/* <input type="file" name="image" placeholder="העלה תמונה" /> */}
        <input name="permission" defaultValue={user.permission} type="hidden" />
        <button type="submit">עדכן</button>
        <button type="cancel" >בטל</button>
      </form>
    </div>
  );
};

export default EditProfile;
