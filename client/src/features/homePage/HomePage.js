import { Link } from "react-router-dom"
import "./home-page.css"; // קובץ ה-CSS

const HomePage = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">HomePage</h1>
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
