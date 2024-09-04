//תפריט עליון של מנהל/משתמש
import Search from "../search/Search";
import "./navbar.css"
import { MdLogout,MdDensityMedium, MdEmojiPeople, MdFace, MdOutlinePermIdentity, MdOutlineSearch } from "react-icons/md";
import {useGetAllUsersQuery}from "../../features/user/userApiSlice"
const Navbar = () => {
  return (
    <div className="navbarBox">
      <div className="navbar">
        <img className="nav-logo" src= "/starpoint.png"/>
                <div className="nav-title">
          <a>אודות | אסטרולוגיה בתנ"ך | אבחון קבוצתי | קורסים | בלוג |יצירת קשר </a>
        </div>
        <div className="nav-menu">
         
          <button className="logout-button">
            <MdLogout />
            יציאה
          </button>
          <Search placeholder="...Search" />
          <div className="nav-icons">
            <MdDensityMedium />
            <MdOutlinePermIdentity />
          </div>
          <div className="nav-hello">
            שלום ירון
          </div>
        </div>
      </div>
      <div className="nav-text">
        <h1>האזור האישי</h1>
        נהל את החשבון שלך, ערוך את הפרטים האישיים, שנה סיסמה וצפה בהסטורית הרכישה שלך
      </div>
    </div>
  )
}

export default Navbar