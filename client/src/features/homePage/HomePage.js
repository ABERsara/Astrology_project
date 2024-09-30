import { Link, NavLink,Navigate, useNavigate } from "react-router-dom";
import ZodiacWheel from "./ZodiacWheel";
import "./home-page.css";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import LoginPage from "../auth/login/LoginPage";
import RegisterUser from "../auth/registration/RegisterUser";
import Navbar from "../../components/navbar/Navbar"

const HomePage = () => {
    const navigate=useNavigate()
    const [showWheel, setShowWheel] = useState(true);
   
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY < 130) {
                setShowWheel(true);
            } else {
                setShowWheel(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };
   
    return (
        <div className="home-page-casing">
                            <Navbar/>
            <div className="home-container">
                <div className="zwheel">
                    {showWheel ? <ZodiacWheel /> : null}
                </div>
                <div className="sentence-on-astro">
                    <div className="sentence1">משפט חזק על</div>
                    <div className="sentence2">האסטרולוגיה</div>
                    <div className="info-homepage">
                    היא כלי עזר בחיינו. שמה מראה ומשקפת את המציאות, משפרת תודעה ע"י ניתוח האישיות שלנו ושל הזולת, וחוזה מגמות עתידיות ומאפשרת להתכונן
                    </div>
                </div>
                <div className="home-links">
                    <Link to={"/dash/blogs"} className="home-link">
                        לקרוא עוד
                    </Link>
                </div>
            </div>

            <div className="home-about-section">
                <div id="about-section" className="about-section">
                    <img alt="דלי" src="/9.png" className="horoscopes Aquarius"/>
                    <h2>אודות</h2>
                    <p>הרעיון של אסטרולוגיה הוא זיהוי כלים ויכולות של האדם.
                        רוחי  לוקחת את זה צעד קדימה- באופן שמהכלי הזה היא מנסה לסייע לאדם,
                        בגישור ע"פ  קונפליקטים (למה בעלי קם מאוחר כל יום?- יש לזה סיבה. בואי נמצא אותה,
                        ועל  הדרך גם נחזק שתשימי לב לכוחות המיוחדים שלו והיכולות הייחודיים לו.
                        ואז  נראה כיצד אפשר להתקדם עם זה? איך הכוח שלו (נגיד - הוא דווקא בכלל לא  עצלן.
                        אז אולי יושב כאן משהו אחר? אולי התזונה שלו לא טובה וגורמת לו  לכבדות?
                        איך הוא בשאר היום? גם עייף? בואי נבדוק תזונה...) ? מה יכול לשפר  את זה?
                        באותו האופן- בואי נזהה מה הכוחות שלך, ואז איך אפשר מזה למצוא את המניע שלך להתקדמות ולהצלחה.

                        לכן , זהו אינו אבחון רגיל כמו הרעיון של אבחון הצבעים... כי מהתוצאות אנו מתקדמים הלאה- לעבר מטרות האבחון.
                        והאמת  היא,
                        שהיא קיבלה אישור מהרה"ג ר' שמאי גרוס להתעסק עם זה
                        (למרות שיש הרבה  שמתנגדים וטוענים שזה התעסקות בכוחות מיסטיים- גרמי השמיים...)
                        להתעסק עם  זה להבנת נפש האדם.
                        ואז זה בעצם רק כלי...</p>
                    <img alt="גדי" src="/0.png" className="horoscopes Capricorn"/>
                    <img alt="סרטן" src="/1.png" className="horoscopes Cancer"/>
                    <img alt="תאומים" src="/5.png" className="horoscopes Gemini"/>
                    <img alt="שור" src="/6.png" className="horoscopes Taurus"/>
                </div>

                <div id="contact-section" className="contact-section">
                    <Footer />
                </div>
            </div>
           
        </div>
    );
};

export default HomePage;
