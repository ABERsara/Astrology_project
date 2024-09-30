import Swal from 'sweetalert2';
import { useRegisterMutation } from "../authApiSlice";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);

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
        </form>
      </div>
    `,
      didOpen: () => {
        document.getElementById('closeModal').onclick = () => Swal.close();

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
                // ניווט לאזור האישי לאחר הצגת ההודעה
                navigate("/dash/user");
              });
            }
          } catch (err) {
            if (err.status === 409) {
              Swal.fire('שגיאה', 'האימייל כבר קיים במערכת', 'error');
            } else {
              Swal.fire('שגיאה', 'התרחשה שגיאה במהלך הרישום, נסה שוב', 'error');
            }
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
