import Swal from 'sweetalert2';
import { useRegisterMutation } from "../authApiSlice";
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin,GoogleOAuthProvider } from '@react-oauth/google'; // הוספת ייבוא GoogleLogin
import ReactDOM from 'react-dom'; // ייבוא ReactDOM לרינדור דינמי

const RegisterPage = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const location=useLocation();

  
  const handleGoogleLoginSuccess = (response) => {
    console.log('Login Success:', response);
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

  const handleRegisterClick = () => {
    Swal.fire({
      customClass: {
        popup: 'custom-swal-modal',
      },
      html: `
      <div class="login-page">
        <form id="registerForm" class="login-page-form">
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
              <input type="checkbox" id="rememberMeRegister" /> זכור אותי
            </label>
          </div>
          <button type="submit"> אני רוצה להירשם!</button>
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

        document.getElementById('registerForm').onsubmit = async (e) => {
          e.preventDefault();
          const firstname = document.getElementById('firstname').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;
          const rememberMeRegister = document.getElementById('rememberMeRegister').checked;

          if (!firstname || !email || !password) {
            Swal.showValidationMessage('אנא מלא את כל השדות');
            return false;
          }

          const userObject = { firstname, email, password };

          try {
            const res = await register(userObject).unwrap();
            if (res) {
              if (rememberMeRegister) {
                localStorage.setItem('user', JSON.stringify(res));
              }
              Swal.fire({
                icon: 'success',
                title: '<div class="custom-success-text">נרשמת בהצלחה</div>',
                iconColor: '#E49928',
                showConfirmButton: false,
                customClass: {
                  popup: 'custom-success-swal',
                },
                timer: 3000
              }).then(() => {
                if (location.pathname === '/') {
                navigate("/dash/user");
              } else {
                navigate(location.pathname);  // נווט לדף הנוכחי
              }
              });
            }
          } catch (err) {
              const errorMessage = err.data?.message || 'רישום נכשל';
              document.getElementById('error-message').textContent =errorMessage  // הצגת השגיאה בטופס
              document.getElementById('error-message').style.color = "red";
            }
          
        };
      },
      showConfirmButton: false,
    });
  };

  return (
    <button className="login-from-home" onClick={handleRegisterClick}>
      הרשמה
    </button>
  );
};

export default RegisterPage;
