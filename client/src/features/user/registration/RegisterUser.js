import "./register-user.css"

import {useAddUserMutation} from "../userApiSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const RegisterUser = () => {
  const [addUser, {data, isError, error, isSuccess, isLoading}] = useAddUserMutation()
  const navigate = useNavigate()
  useEffect(()=>{
    if(isSuccess){
      navigate("/dash/user/privateZone")
    }
  }, [isSuccess])

  const formSubmit = (e) => {
    e.preventDefault();
    console.log("trying to register")
    const data = new FormData(e.target);
    console.log(data)
    const userObject = Object.fromEntries(data.entries());
    console.log("Data to be sent:", userObject); // הדפס את הנתונים כדי לוודא שהם נכונים
    addUser(userObject);
}

  return (
    <div className="add-user-container">
        <form onSubmit={formSubmit} className="add-user-form">
        <input type="text" required name="username" placeholder="שם משתמש" />
        {/* <input type="file" name="imageUrl" placeholder="העלה תמונה" /> */}
        <input type="text" name="firstname" required placeholder="הכנס שם פרטי" />
        <input type="text" name="lastname" placeholder="הכנס שם משפחה" />
        <input type="phone" name="phone" placeholder="הכנס מס' נייד" />
        <input type="email" name="email" required placeholder="הכנס כתובת אימייל" />
        <input type="password" name="password" required placeholder="הכנס סיסמה" />
            <button  type="submit">שלח</button>
        </form>
    </div>
  )
}

export default RegisterUser