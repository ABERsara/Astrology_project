//תפריט עליון של מנהל/משתמש
import "./navbar.css"
import { MdDensityMedium, MdEmojiPeople, MdFace, MdOutlinePermIdentity, MdOutlineSearch } from "react-icons/md";
const Navbar = () => {
  return (
    <div className="navbarBox">
      <div className="navbar">
        <img className="nav-logo" src="./img/">

        </img>
        <div className="nav-title">
          האזור האישי
        </div>
        <div className="nav-menu">
          <div className="nav-search">
            <MdOutlineSearch />
            <input type="text" placeholder="Search..." className="nav-input" />
          </div>
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