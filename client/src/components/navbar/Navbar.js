//תפריט עליון של מנהל/משתמש
import Search from "../search/Search";
import "./navbar.css"
import { MdLogout, MdDensityMedium, MdEmojiPeople, MdFace, MdOutlinePermIdentity, MdOutlineSearch } from "react-icons/md";
import { useGetAllUsersQuery } from "../../features/user/userApiSlice"
import { useSendLogoutMutation } from "../../features/auth/authApiSlice"
import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
  const { firstname, lastname } = useAuth()
  const navigate = useNavigate()
  const [logout, { isSuccess: isLogoutSuccess }] = useSendLogoutMutation()
  const logoutClick = () => {
    console.log("logout")
    logout()
  }
  useEffect(() => {
    if (isLogoutSuccess) {
      navigate("/")
    }

  }, [isLogoutSuccess])
  const text = {
    "/dash/user": "נהל את החשבון שלך, ערוך את הפרטים האישיים, שנה סיסמה וצפה בהסטורית הרכישה שלך"

  }
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="navbarBox">
      <div className="navbar">
          <div className="navbar-top-homepage">
            <button className="login-from-home">
              התחברות /
            </button>
            <button className="login-from-home">
              הרשמה
            </button>
            <img alt="" src="/shopping-cart.png" className="shopping-cart-home" />
            <img alt="" src="/heart.png" className="heart-home" />
            <button className="logout-button" onClick={logoutClick} >
              <MdLogout />
              יציאה
            </button>
            <Search placeholder="...Search" />
            <div className="nav-icons">
              <MdDensityMedium />
              <MdOutlinePermIdentity />
            </div>
            <div className="nav-hello">
              ברוכים הבאים {firstname}{ } {lastname}  </div>      </div>

        </div>
        <div className="navbar-under-homepage">
          <img className="logo-homepage" src="/logor.png" />
          <NavLink to={"/dash/about"}>אודות</NavLink>
          <NavLink to={"/dash/astro"}>אסטרולוגיה</NavLink>
          <NavLink to={"/dash/blogs"}>בלוג</NavLink>
          <NavLink to={"/dash/diagnosiss"}>אבחונים</NavLink>
          <NavLink to={"/dash/diagnosiss"}>מה אומרים עלינו?</NavLink>
          <button onClick={() => scrollToSection("contact-section")}>יצירת קשר</button>
        </div>
      <div className="nav-menu">


        <div className="nav-text">
          <h1>האזור האישי</h1>
          נהל את החשבון שלך, ערוך את הפרטים האישיים, שנה סיסמה וצפה בהסטורית הרכישה שלך"      </div>
      </div>
    </div>
  )
}

export default Navbar