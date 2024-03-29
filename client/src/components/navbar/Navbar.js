//תפריט עליון של מנהל
import "./navbar.css"
import { MdDensityMedium, MdEmojiPeople, MdFace, MdOutlinePermIdentity, MdOutlineSearch } from "react-icons/md";
const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-title">
      ראשי
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
  )
}

export default Navbar