import "./footer.css"
//תפריט תחתון
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

    // בדיקה אם המשתמש נמצא בדף about
    const isAboutPage = location.pathname === '/dash/about';

  return (
    <div className={`footer ${isAboutPage ? 'about-footer' : ''}`}>
      <img className="foot-img" src="" alt="">

      </img>
      <div className="inSite">
        <h3>מה באתר?</h3>
        <ul>
          <li>אודות</li>
          <li>אבחון אישי</li>
          <li>אבחון קבוצתי</li>
        </ul>
      </div>
      <div className="support">
        <h3>תמיכה</h3>
        <ul>
          <li>מצב אבחון</li>
          <li>תוצאות אבחון</li>
          <li>אבחון קבוצתי</li>
        </ul>
      </div>
      <div className="connect">
        <h3>יצירת קשר</h3>
        <ul>
          <li>0534102755</li>
          <li>rachely0584851652@gmail.com </li>
        </ul>
      </div>
      <div className="foot-rights">@all rights reserved</div>
    </div>

  )
}

export default Footer