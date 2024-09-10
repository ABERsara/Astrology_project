import { useLocation } from "react-router-dom";
import MenuLink from "../sidebar/MenuLink";
import { MdAccountTree, MdEdit, MdHandyman, MdOutlineCurrencyExchange } from "react-icons/md";
import "./sidebar.css"
// פונקציה שמחזירה את התפריט המתאים לפי סוג הנתיב
const getMenuForPath = (path) => {
  const menus = {
    "/dash/user": [
      { title: "סקירה כללית על החשבון", path: "/dash/user/accountOverview", icon: <MdAccountTree /> },
      { title: "הסטוריית חיובים", path: "/dash/user/chargeHistory", icon: <MdOutlineCurrencyExchange /> },
      { title: "עריכת פרופיל", path: "/dash/user/editProfile", icon: <MdHandyman /> },
      { title: "שינוי סיסמה", path: "/dash/user/changePassword", icon: <MdEdit /> }
    ],
    "/dash/blogs": [
      { title: "צפייה בבלוגים", path: "/dash/blogs", icon: <MdAccountTree /> },
      { title: "הוספת בלוג", path: "/dash/blogs/add", icon: <MdHandyman /> },
      { title: "עריכת בלוג", path: "/dash/blogs/edit", icon: <MdEdit /> },
      { title: "מחיקת בלוג", path: "/dash/blogs/delete", icon: <MdEdit /> },

    ],
    "/dash/diagnosis": [
      { title: "העלאת אבחון", path: "/dash/diagnosis/upload", icon: <MdHandyman /> },
      { title: "צפייה באבחונים", path: "/dash/diagnosis", icon: <MdAccountTree /> }
    ],
    "/dash/manage/users": [
      { title: "צפייה במשתמשים", path: "/dash/manage/users", icon: <MdHandyman /> },
    ],
  };

  // מחפש את התפריט המתאים לנתיב
  for (const [key, menu] of Object.entries(menus)) {
    if (path.startsWith(key)) {
      return menu;
    }
  }

  return []; // במקרה שאין התאמה לנתיב
};

const Sidebar = () => {
  const location = useLocation();

  // מקבל את התפריט המתאים לנתיב הנוכחי
  const currentMenu = getMenuForPath(location.pathname);

  return (
    <div className="side-bar">
      <ul className="menu-list">
        {currentMenu.map((cat) => (
          <MenuLink item={cat} key={cat.title}  />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
