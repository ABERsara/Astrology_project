import "./register-user.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../authApiSlice";
import useModal from "../../../hooks/useModal"; // חיבור ה-hook

const RegisterUser = ({closeModal}) => {
  const [register, { isError, error, isLoading, isSuccess, data }] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const successModal = useModal(); // שימוש ב-hook לניהול מודל ההצלחה

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(data));
      }
      
      closeModal(); // סגירת מודל ההרשמה המקורי
      successModal.openModal(); // פתיחת מודל ההצלחה
      
      setTimeout(() => {
        successModal.closeModal(); // סגירת מודל ההצלחה אחרי 3 שניות
        navigate("/dash/user"); // הפניה לנתיב לאחר סיום
      }, 3000); // המתנה של 3 שניות
    }
  }, [isSuccess, navigate, rememberMe, closeModal, successModal]);

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const checkUsernameUnique = async (email) => {
    try {
      const response = await fetch(`/api/users/check-username?username=${email}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const isUnique = await response.json();
      setIsUsernameUnique(isUnique);
    } catch (err) {
      console.error("Failed to check email uniqueness:", err);
    }
  };

  const handleUsernameChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    checkUsernameUnique(email);
  };

  const formSubmit = async (e) => {
    e.preventDefault();
    if (!isUsernameUnique) {
      setErrorMessage("כתובת המייל כבר קיימת, אנא הכנס כתובת מייל תקינה");
      return;
    }
    const data = new FormData(e.target);
    const userObject = Object.fromEntries(data.entries());
    try {
      await register(userObject).unwrap();
    } catch (err) {
      if (err.status === 409) {
        setErrorMessage("כתובת המייל כבר קיימת, אנא הכנס כתובת מייל תקינה");
      } else {
        console.error("Error during registration:", err);
        setErrorMessage("התרחשה שגיאה במהלך הרישום. נסה שוב מאוחר יותר.");
      }
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={formSubmit} className="login-page-form">
        <img src="/xMark.png" alt="" className="img-back" onClick={closeModal} />
        <h1 className="login-h1">איזה כיף שבאת אלינו!</h1>
        <div>
          <label className="login-item name">שם:</label>
          <input type="text" required name="firstname" id="firstname" />
        </div>
        <div>
          <label className="login-item email">אימייל:</label>
          <input
            type="email"
            required
            name="email"
            placeholder="אימייל"
            value={email}
            onChange={handleUsernameChange}
            id="email"
          />
        </div>
        <div className="login-item password">
          <label>סיסמא:</label>
          <input type="password" required name="password" id="password" />
        </div>
        <div className="login-item checkbox">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            זכור אותי
          </label>
        </div>
        <button type="submit" disabled={!isUsernameUnique}>אני רוצה להיכנס!</button>
        {!isUsernameUnique && <span className="username-unique">האימייל קיים כבר במערכת. אנא בחר כתובת אימייל אחרת.</span>}
        {errorMessage && <span className="username-unique">{errorMessage}</span>}
      </form>

      {/* מודל ההצלחה */}
      {successModal.isOpen && (
        <div className="modal-success">
          <img src="/registeredSuccess.png" alt="נרשמת בהצלחה , מייד תועבר " />
        </div>
      )}
    </div>
  );
};

export default RegisterUser;
