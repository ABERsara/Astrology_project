import Swal from 'sweetalert2';
import { useLoginMutation } from "../authApiSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const LoginPage = () => {
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

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
            <button type="submit">אני רוצה להיכנס!</button>
          </form>
        </div>
      `,
      didOpen: () => {
        document.getElementById('loginForm').onsubmit = async (e) => {
          e.preventDefault();
          const firstname = document.getElementById('firstname').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          if (!firstname || !email || !password) {
            Swal.showValidationMessage('אנא מלא את כל השדות');
            return false;
          }

          try {
            const userObject = { firstname, email, password };
            const res = await login(userObject).unwrap();

            if (res) {
              localStorage.setItem('user', JSON.stringify(res));
              Swal.close();
              navigate("/dash/user");
            }
          } catch (err) {
            setError(err.data?.message || 'התחברות נכשלה');
          }
        };
      },
      showConfirmButton: false,
    });
  };

  return (
    <div>
      <button className="login-from-home" onClick={handleLoginClick}>התחברות</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
