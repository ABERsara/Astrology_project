import "./register-user.css"
import { useState } from "react";
import { useAddUserMutation } from "../userApiSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterUser = () => {
  const [addUser, { isSuccess }] = useAddUserMutation();
  const [username, setUsername] = useState("");
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const checkUsernameUnique = async (username) => {
    try {
      const response = await fetch(`/api/users/check-username?username=${username}`);
      const isUnique = await response.json();
      setIsUsernameUnique(isUnique);
    } catch (err) {
      console.error("Failed to check username uniqueness:", err);
    }
  };

  const handleUsernameChange = (e) => {
    const username = e.target.value;
    setUsername(username);
    checkUsernameUnique(username);
  };
  const handleEntrance=()=>{
    navigate("/dash/user")
  }
  const formSubmit = async (e) => {
    e.preventDefault();
    if (!isUsernameUnique) {
      setErrorMessage("שם המשתמש כבר קיים, אנא בחר שם משתמש אחר.");
      return;
    }
    const data = new FormData(e.target);
    const userObject = Object.fromEntries(data.entries());
    try {
      await addUser(userObject).unwrap(); // ניסיון לרישום המשתמש
    } catch (err) {
      if (err.status === 409) {
        setErrorMessage("שם המשתמש כבר קיים, אנא בחר שם משתמש אחר.");
      } else {
        console.error("Error during registration:", err);
        setErrorMessage("התרחשה שגיאה במהלך הרישום. נסה שוב מאוחר יותר.");
      }
    }
  };

  return (
    <div className="user-register-body">
    <div className="add-user-container">
      <form onSubmit={formSubmit} className="add-user-form">
        <input
          type="text"
          required
          name="username"
          placeholder="שם משתמש"
          value={username}
          onChange={handleUsernameChange}
        />
        {!isUsernameUnique && <span className="username-unique">שם המשתמש כבר תפוס, אנא בחר שם אחר.</span>}
        {errorMessage && <span className="username-unique">{errorMessage}</span>}
        {/* שאר השדות */}
        <input type="text" name="firstname" required placeholder="הכנס שם פרטי" />
        <input type="text" name="lastname" placeholder="הכנס שם משפחה" />
        <input type="phone" name="phone" placeholder="הכנס מס' נייד" />
        <input type="email" name="email" required placeholder="הכנס כתובת אימייל" />
        <input type="password" name="password" required placeholder="הכנס סיסמה" />
        <button type="submit" disabled={!isUsernameUnique}>שלח</button>
      </form>
      <button className="button-to-login" onClick={handleEntrance}>רוצה להירשם מאוחר יותר?</button>
    </div>
    </div>
  );
};

export default RegisterUser;
