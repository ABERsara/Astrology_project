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

const LoginPage = () => {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(selectedToken);
  console.log('Token:', token);
  
  // בדיקת הטוקן
  useEffect(() => {
   
    console.log("Token from Redux:", token);
    // כאן אפשר לבדוק אם הטוקן קיים ולטפל בהתאם
  }, [token]); // להריץ כל פעם שהטוקן משתנה

  const handleGoogleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    const token = response.credential; // קבלת הטוקן מ-Google
    console.log('Google Token:', token);  // הדפסה לבדיקה
    // שליחת הטוקן לשרת
    if (token) {
      dispatch(setCredentials({ accessToken: token }));
    }
 
    // כאן ניתן לשלוח את הטוקן לשרת או להמשיך בהתחברות
    Swal.close(); // סגירת ה-Swal לאחר התחברות מוצלחת
    // נווט למקום הרצוי אחרי התחברות מוצלחת עם Google
    if (location.pathname === '/') {
      navigate("/dash/user");
    } else {
      navigate(location.pathname);  // נווט לדף הנוכחי
    }
  };

  const handleGoogleLoginFailure = (response) => {
    console.error("Google login failed:", response);
    Swal.showValidationMessage('ההתחברות דרך Google נכשלה');
  };


  const handleLoginClick = () => {
    Swal.fire({
      customClass: {
        popup: 'custom-swal-modal',
      },
      html: `
        <div class="login-page">
          <form id="loginForm" class="login-page-form">
            <img src="/xMark.png" alt="" class="img-back" id="closeModal" />
            <h1 class="login-h1">איזה כיף שבאת אלינו!</h1>
            <div>
              <label class="login-item name">שם:</label>
              <input type="text" required name="firstname" id="firstname" />
            </div>
            <div>
              <label class="login-item email">אימייל:</label>
              <input type="email" required name="email" id="email" />
            </div>
            <div class="login-item password">
              <label>סיסמא:</label>
              <input type="password" required name="password" id="password" />
            </div>
            <div class="login-item checkbox">
            <label>
              <input type="checkbox" id="rememberMeLogin" /> זכור אותי
            </label>
          </div>
            <button type="submit">אני רוצה להיכנס!</button>
            <div id="error-message" class="error-message"></div> <!-- אזור השגיאות -->
            <div id="googleLoginButton" class="sign-with-google"></div> <!-- מקום להוספת כפתור ההתחברות עם Google -->
          </form>
        </div>
      `,
      didOpen: () => {
        document.getElementById('closeModal').onclick = () => Swal.close();

        const googleLoginButton = document.getElementById('googleLoginButton');
        if (googleLoginButton) {
          const loginElement = document.createElement('div');
          googleLoginButton.appendChild(loginElement);

          ReactDOM.render(
            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
              <GoogleLogin
                onSuccess={handleGoogleLoginSuccess}
                onFailure={handleGoogleLoginFailure}
              />
            </GoogleOAuthProvider>,
            loginElement
          );
        }
        document.getElementById('loginForm').onsubmit = async (e) => {
          e.preventDefault();
          const firstname = document.getElementById('firstname').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const rememberMeLogin = document.getElementById('rememberMeLogin').checked;

          if (!firstname || !email || !password) {
            Swal.showValidationMessage('אנא מלא את כל השדות');
            return false;
          }

          try {
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


            Swal.close()
              .then(() => {
                if (location.pathname === '/') {
                  navigate("/dash/user");
                } else {
                  navigate(location.pathname);  // נווט לדף הנוכחי
                }
              })
          
          } catch (err) {
          const errorMessage = err.data?.message || 'התחברות נכשלה';
          document.getElementById('error-message').textContent = 'אולי אינך רשום עדיין?'  // הצגת השגיאה בטופס
          document.getElementById('error-message').style.color = "red";
        }
      };
    },
      showConfirmButton: false,
    });
};

return (
  <div>
    <button className="login-from-home" onClick={handleLoginClick}>התחברות</button>
  </div>
);
};

export default LoginPage;
