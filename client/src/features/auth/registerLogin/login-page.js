import Swal from 'sweetalert2';
import { useLoginMutation } from "../authApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'; // הוספת ייבוא GoogleLogin
import ReactDOM from 'react-dom'; // ייבוא ReactDOM לרינדור דינמי
import { setCredentials } from '../authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'; // אם את גם משתמשת ב-useSelector
import { selectedToken } from "../authSlice"
import PopUp from '../../PopUp';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectedToken);
  console.log('Token:', token);
  const [selectLogin, setSelectedlogin] = useState(false)

  // const handleGoogleLoginSuccess = (response) => {
  //   console.log('Login Success:', response);
  //   const token = response.credential; // קבלת הטוקן מ-Google
  //   console.log('Google Token:', token);  // הדפסה לבדיקה
  //   // שליחת הטוקן לשרת
  //   if (token) {
  //     dispatch(setCredentials({ accessToken: token }));
  //   }

  //   // כאן ניתן לשלוח את הטוקן לשרת או להמשיך בהתחברות
  //   Swal.close(); // סגירת ה-Swal לאחר התחברות מוצלחת
  //   // נווט למקום הרצוי אחרי התחברות מוצלחת עם Google
  //   if (location.pathname === '/') {
  //     navigate("/dash/user");
  //   } else {
  //     navigate(location.pathname);  // נווט לדף הנוכחי
  //   }
  // };

  // const handleGoogleLoginFailure = (response) => {
  //   console.error("Google login failed:", response);
  //   Swal.showValidationMessage('ההתחברות דרך Google נכשלה');
  // };


  // const handleLoginClick = () => {
  //   // Swal.fire({
  //   //   customClass: {
  //   //     popup: 'custom-swal-modal',
  //   //   },

  //   //   didOpen: () => {

  //       const googleLoginButton = document.getElementById('googleLoginButton');
  //       if (googleLoginButton) {
  //         const loginElement = document.createElement('div');
  //         googleLoginButton.appendChild(loginElement);

  //         // ReactDOM.render(
  //         //   <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
  //         //     <GoogleLogin
  //         //       onSuccess={handleGoogleLoginSuccess}
  //         //       onFailure={handleGoogleLoginFailure}
  //         //     />
  //         //   </GoogleOAuthProvider>,
  //         //   loginElement
  //         // );
  //       }



  //           // Swal.close()
  //           //   .then(() => {
  //           //     if (location.pathname === '/') {
  //           //       navigate("/dash/user");
  //           //     } else {
  //           //       navigate(location.pathname);  // נווט לדף הנוכחי
  //           //     }
  //           //   })

  //         // } catch (err) {
  //         //   const errorMessage = err.data?.message || 'התחברות נכשלה';
  //         //   document.getElementById('error-message').textContent = 'אולי אינך רשום עדיין?'  // הצגת השגיאה בטופס
  //         //   document.getElementById('error-message').style.color = "red";
  //         // }

  // };

  const onsubmit = async (e) => {
    e.preventDefault();
    const firstname = document.getElementById('firstname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMeLogin = document.getElementById('rememberMeLogin').checked;

    if (!firstname || !email || !password) {
      // Swal.showValidationMessage('אנא מלא את כל השדות');
      return false;
    }

    // try {
    const userObject = { firstname, email, password };
    console.log("firstname: " + firstname, "email: " + email, "password: " + password)
    try {
      const res = await login(userObject).unwrap();
      console.log("Response from login:", res);
      if (res && res.accessToken) {
        dispatch(setCredentials({ accessToken: res.accessToken }));
        console.log("Token stored:", res.accessToken);
        if (rememberMeLogin) {
          localStorage.setItem('user', JSON.stringify(res));
          console.log("remember " + firstname)
        }


      }
    } catch (err) {
      console.log('Error during login:', err);
    }
  }
  const closeModal = () => {
    setSelectedlogin(false); // סגירת הפופאפ
  };


  return (
    <div>
      <button className="login-from-home" onClick={() => setSelectedlogin(true)}>התחברות</button>
      {selectLogin ? <PopUp width={'350px'} close={closeModal}>
  <div className="login-page">
    <form id="loginForm" className="login-page-form" onSubmit={onsubmit}>
      <img 
        src="/xMark.png" 
        alt="close" 
        className="img-back" 
        onClick={closeModal} 
      />
      <h1 className="login-h1">איזה כיף שבאת אלינו!</h1>
      <div>
        <label className="login-item name">שם:</label>
        <input type="text" required name="firstname" id="firstname" />
      </div>
      <div>
        <label className="login-item email">אימייל:</label>
        <input type="email" required name="email" id="email" />
      </div>
      <div className="login-item password">
        <label className="login-item password">סיסמא:</label>
        <input type="password" required name="password" id="password" />
      </div>
      <div className="login-item checkbox">
        <label>
          <input type="checkbox" id="rememberMeLogin" /> זכור אותי
        </label>
      </div>
      <button type="submit">אני רוצה להיכנס!</button>
      <div id="error-message" className="error-message"></div>
      <div id="googleLoginButton" className="sign-with-google"></div>
    </form>
  </div>
</PopUp>
 : null}
    </div>
  );
};

export default LoginPage;




// showAlert({ msgTitle: 'הכתובת עודכנה', msgText: '', msgType: 'success' })

// const showAlert = ({ msgTitle, msgText, msgType, msgTimer }) => {
//   SweetAlert.fire({
//     icon: msgType ? msgType : 'error',
//     title: msgTitle ? msgTitle : 'שגיאה בחיבור לרשת',
//     text: msgText !== null ? msgText : 'בבקשה נסה שוב מאוחר יותר',
//     timer: msgTimer ? msgTimer : 5000,
//     showConfirmButton: false,
//     didOpen: () => {
//       const iconElement = document.querySelector('.swal2-icon');
//       if (iconElement) {
//         iconElement.style.cursor = 'pointer';
//         iconElement.addEventListener('click', () => {
//           SweetAlert.close();
//         });
//       }
//     }
//   });
// };



