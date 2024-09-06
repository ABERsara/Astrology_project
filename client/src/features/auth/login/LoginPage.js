import "./login-page.css"
import {useLoginMutation} from "../authApiSlice"
import { useEffect } from "react"
import {useNavigate} from "react-router-dom"
const LoginPage = () => {
  const [login, {isError, error, isLoading, isSuccess, data}] = useLoginMutation()
  const navigate = useNavigate()

useEffect(()=>{
  if(isSuccess){
    navigate("/dash/user")
  }

},[isSuccess])

  const handleSubmit = async(e) =>{
    e.preventDefault()
    const data = new FormData(e.target)
    const userObject =Object.fromEntries(data.entries())
    login(userObject)
  }

  return (
    <div className="login-page">
        <form onSubmit={handleSubmit} className="login-page-form">
            <h1>כניסת משתמשים</h1>
            <input type="text" required name="username" id="username" placeholder="שם משתמש" />
            <input type="password" required name="password" id="password" placeholder="סיסמא  " />
            <button type="submit"> כניסה</button>
            {error && error.data?.message}
        </form>
    </div>
  )
}

export default LoginPage