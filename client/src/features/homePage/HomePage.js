import { Link } from "react-router-dom"
import ZodiacWheel from "./ZodiacWheel"
import "./home-page.css"; // קובץ ה-CSS

const HomePage = () => {
    return (

        <div className="home-container">

            <div className="navbar-top-homepage"><div>התחברות/</div>
                <div>הרשמה</div>
                <img alt="" src="/shopping-cart.png" />
                <img alt="" src="/heart.png" /></div>
            <div className="navbar-under-homepage">
                <img className="logo-homepage" src="/logo.png" />
            </div>
            <div className="zwheel">
                <ZodiacWheel />
            </div>
            <div className="sentence-on-astro">
                <div className="sentence1" > משפט חזק על</div>
                <div className="sentence2">האסטרולוגיה</div>
                <div className="info-homepage">היא כלי עזר בחיינו. שמה מראה ומשקפת את המציאות, משפרת תודעה ע"י ניתוח האישיות שלנו ושל הזולת, וחוזה מגמות עתידיות ומאפשרת להתכונן</div>
            </div>
            <div className="home-links">
                <Link to={`/login`} className="home-link">
                    כניסה לאזור האישי
                </Link>
                <Link to={"/dash/"} className="home-link">
                    המשך ללא רישום
                </Link>
            </div>
        </div>
    )
}

export default HomePage
