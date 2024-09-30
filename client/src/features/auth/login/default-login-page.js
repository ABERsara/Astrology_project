import "./login-page.css"
import { GoogleLogin } from '@react-oauth/google';
import { useLoginMutation } from "../authApiSlice"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
const LoginPage = ({ closeModal }) => {
  const [login, { isError, error, isLoading, isSuccess, data }] = useLoginMutation()
  const navigate = useNavigate()
  const [rememberMe, setRememberMe] = useState(false) // ניהול מצב "זכור אותי"

  useEffect(() => {
    if (isSuccess) {
      console.log(data)
      // אם המשתמש רוצה לזכור את עצמו, נשמור את המידע ב-localStorage
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(data))
      }
      navigate( "/dash/user");
    }
  }, [isSuccess, rememberMe])

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const userObject = Object.fromEntries(data.entries())
    login(userObject)
  }
  

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe)
  }

  const handleGoogleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // כאן תוכל להמשיך עם ההתחברות, לדוגמה שליחת הטוקן לשרת שלך
  };
  const handleGoogleLoginFailure = (response) => {
    console.error("Google login failed:", response)
  }
  const handlecloseModal=()=>{
    navigate("/")
  }
  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="login-page-form">
        <img src="/xMark.png" alt="" className="img-back" onClick={handlecloseModal} />
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
          <label>סיסמא:</label>
          <input type="password" required name="password" id="password" />
        </div>
        {/* תיבת בחירה "זכור אותי" */}
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
        <button type="submit"> אני רוצה להיכנס!</button>
        {error && error.data?.message}
        {/* התחברות עם Google */}
        <GoogleLogin className="sign-with-google"
          // clientId="YOUR_GOOGLE_CLIENT_ID"
          // buttonText="התחברות עם Google"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
        // cookiePolicy={'single_host_origin'}
        />
      </form>
      
    </div>
  )
}

export default LoginPage