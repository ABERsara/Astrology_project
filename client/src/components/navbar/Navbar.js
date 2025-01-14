import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import '../../features/auth/registerLogin/login-page.css';
import useAuth from "../../hooks/useAuth";
import { useSendLogoutMutation } from "../../features/auth/authApiSlice";
import { MdLogout, MdDensityMedium, MdEmojiPeople, MdFace, MdOutlinePermIdentity, MdOutlineSearch } from "react-icons/md";
import "./navbar.css"
import LoginPage from '../../features/auth/registerLogin/login-page';
import RegisterPage from '../../features/auth/registerLogin/RegisterUser';
import useGetFilePath from "../../hooks/useGetFilePath";

const Navbar = () => {
  const { getFilePath } = useGetFilePath()

  const [logout, { isSuccess: isLogoutSuccess }] = useSendLogoutMutation()
  const navigate = useNavigate();
  const location = useLocation();
  const { firstname, lastname, image, isUser, isAdmin } = useAuth();
  const [currentFirstname, setCurrentFirstname] = useState(firstname);
  const [currentLastname, setCurrentLastname] = useState(lastname);
  const [currentImage, setCurrentImage] = useState(image ? `http://localhost:2024/public/uploads${image}` : "/noavatar.png")

  useEffect(() => {
    setCurrentFirstname(firstname);
    setCurrentLastname(lastname);
    setCurrentImage(image);
  }, [firstname, lastname, image]);

  const [isPersonalZoneOpen, setIsPersonalZoneOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("האזור האישי");
  const logoutClick = () => {
    console.log("logout")
    logout()
  }
  const handleLovedBlogs = () => {

  }
  const handleSelectOption = (option) => {
    setSelectedOption(option);
    setIsPersonalZoneOpen(false);
  };

  useEffect(() => {
    if (isLogoutSuccess) {
      navigate("/")
    }

  }, [isLogoutSuccess])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };



  // פונקציה שמחזירה className בהתאם לסטטוס של isActive
  const getNavLinkClass = (isActive) => isActive ? "active-navlink-nav" : "";
  const isHomePage = location.pathname === "/";

  return (
    <div className="navbarBox">
      <div className="navbar-top-homepage">
        {firstname ?
          <div className="nav-hello">
            <img
              className="account-profile"
              alt=""
              src={getFilePath(currentImage ? currentImage : image)}
              onClick={() => navigate("/dash/user/editProfile")} // מעבר לדף עריכת פרופיל 
            />
            היי {currentFirstname}{ } {currentLastname}! </div>
          : <><LoginPage />
            <RegisterPage /></>}
        <img alt="" src="/shopping-cart.png" className="shopping-cart-home" />
        <img alt="" src="/heart.png" className="heart-home" onClick={handleLovedBlogs} />
        {/* הצגת כפתור היציאה רק אם המשתמש לא נמצא בדף הבית */}
        {!isHomePage && (
          <button className="logout-button" onClick={logoutClick}>
            <MdLogout />
            יציאה
          </button>
        )}

      </div>
      <div className="navbar-under-homepage">
        <img className="logo-homepage" src="/logor.png" />
        <NavLink to="/dash/about" className={({ isActive }) => getNavLinkClass(isActive)}>אודות</NavLink>
        <NavLink to="/dash/astro" className={({ isActive }) => getNavLinkClass(isActive)}>אסטרולוגיה</NavLink>
        <NavLink to="/dash/diagnosis" className={({ isActive }) => getNavLinkClass(isActive)}>אבחונים</NavLink>
        <NavLink to="/dash/reviews" className={({ isActive }) => getNavLinkClass(isActive)}>מה אומרים עלינו?</NavLink>
        <NavLink to="/dash/courses" className={({ isActive }) => getNavLinkClass(isActive)}>קורסים</NavLink>
        <button onClick={() => scrollToSection("contact-section")}>יצירת קשר</button>
        {(isUser || isAdmin) && (
  <div className="personal-zone">
    <button
      onClick={() => setIsPersonalZoneOpen(!isPersonalZoneOpen)}
      className="dropdown-toggle"
    >
      {selectedOption} ▼
    </button>
    {isPersonalZoneOpen && (
      <div
        className="dropdown-menu"
        onMouseLeave={() => setIsPersonalZoneOpen(false)}
      >
        <NavLink
          to="/dash/user"
          className="dropdown-item"
          onClick={() => handleSelectOption("אזור אישי")}
        >
          אזור אישי
        </NavLink>
        <NavLink
          to="/dash/user/changePassword"
          className="dropdown-item"
          onClick={() => handleSelectOption("שנה סיסמה")}
        >
          שנה סיסמה
        </NavLink>
        {isAdmin && (
          <NavLink
            to="/dash/manage/users"
            className="dropdown-item"
            onClick={() => handleSelectOption("משתמשים רשומים")}
          >
            משתמשים רשומים
          </NavLink>
        )}
      </div>
    )}
  </div>
)}

      </div>


      {/* <div className="nav-menu">
        <div className="nav-text"></div>
        <h1>האזור האישי</h1>
        נהל את החשבון שלך, ערוך את הפרטים האישיים, שנה סיסמה וצפה בהסטורית הרכישה שלך"      </div> */}
    </div>

  );
};

export default Navbar;
