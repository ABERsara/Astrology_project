import React, { useEffect, useRef, useState } from "react";
import "./about-astro.css";
import ViewBlogs from "../../features/blogs/viewBlogs/ViewBlogs";
import { useLocation } from "react-router-dom";

const AboutAstro = () => {
  const [showFirstSentence, setShowFirstSentence] = useState(false);
  const [showSecondSentence, setShowSecondSentence] = useState(false);
  const sentencesRef = useRef(null);
  const location = useLocation();
  // useEffect(() => {
  //   // הצגת המשפט הראשון לאחר 1 שנייה
  //   const firstTimeout = setTimeout(() => {
  //     setShowFirstSentence(true);
  //   }, 500);

  //   // הצגת המשפט השני לאחר 2 שניות
  //   const secondTimeout = setTimeout(() => {
  //     setShowSecondSentence(true);
  //   }, 1500);

  //   // ניקוי טיימרים אם הקומפוננטה יוצאת מהעמוד
  //   return () => {
  //     clearTimeout(firstTimeout);
  //     clearTimeout(secondTimeout);
  //   };
  // }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          // הצגת המשפט הראשון והשני עם השהייה
          setTimeout(() => {
            setShowFirstSentence(true);
          }, 500);

          setTimeout(() => {
            setShowSecondSentence(true);
          }, 1500);
        } else {
          // הסתרת המשפטים אם יוצאים מטווח הראייה
          setShowFirstSentence(false);
          setShowSecondSentence(false);
        }
      },
      { threshold: 0.5 } // יופעל כש-50% מהקומפוננטה גלוים
    );

    if (sentencesRef.current) {
      observer.observe(sentencesRef.current);
    }

    return () => {
      if (sentencesRef.current) {
        observer.unobserve(sentencesRef.current);
      }
    };
  }, []);
  // const handleViewMoreClick = () => {
  //   const isAuthenticated = /* בדוק אם המשתמש מחובר */;
  //   if (isAuthenticated) {
  //     navigate("/blogs");
  //   } else {
  //     alert("עליך להירשם כדי לראות את כל הבלוגים.");
  //     navigate("/register");
  //   }
  // };
  return (
    <div className="astro-about">
      <div className="astro-container">
        <div ref={sentencesRef} className="astro-sentences">
          <div className={`sentence1-astro ${showFirstSentence ? "show" : ""}`}>
            תמיד רצית לדעת מה זה אסטרולוגיה?
          </div>
          <div className={`sentence2-astro ${showSecondSentence ? "show" : ""}`}>
            כל המידע החסוי לפניך!
          </div>
          <img alt="מאזניים" src="/3.png" className="horoscope Libra" />
          <img alt="דלי" src="/9.png" className="horoscope Aquarius astro-Aquarius" />
          <img alt="עקרב" src="/11.png" className="horoscope Scorpio" />
        </div>
      </div>
      <div className="astro-txt">
        <p>
          אסטרולוגיה היא אמנות עתיקה, המציעה כלי ייחודי להבנת האישיות שלנו והשפעת הכוכבים וגרמי השמיים על אופי האדם. באמצעות ניתוח המפה האסטרולוגית, שהיא תעודת לידה אסטרולוגית שנבנית לפי זמן ומקום לידתנו, ניתן לחשוף את התכונות, החוזקות והאתגרים שבאים לידי ביטוי בכל אחד מאיתנו.<br /><br />

          המפה האסטרולוגית מציגה את מיקום השמש, הירח והכוכבים ברגע הלידה, ובכך היא מספקת מפתח להבנת הדינמיקה הפנימית של כל אדם. כל מזל אסטרולוגי נושא עמו תכונות ואופי ייחודיים, והבנת המזל שלנו ושל אחרים יכולה לעזור לנו להבין טוב יותר את עצמנו ואת הקשרים שלנו עם הסובבים אותנו.<br /><br />

          {/* <br/>הבנת עצמנו והסביבה שלנו */}
          באמצעות האסטרולוגיה, מתאפשר לנו לזהות את הצדדים החזקים והחלשים שלנו, ללמוד כיצד אנו מגיבים למצבים שונים, ואילו מערכות יחסים עשויות לזרום בצורה טובה יותר עבורנו. ככל שנכיר את המאפיינים האסטרולוגיים שלנו ושל אחרים, נוכל ליצור חיבורים מעמיקים ומבוססים יותר, ולבנות מערכות יחסים בריאות ומספקות.<br /><br />

          מסע של צמיחה אישית<br />
          האסטרולוגיה לא רק מספקת תובנות לגבי האישיות שלנו, אלא גם משמשת כלי לצמיחה אישית. כשאנו מבינים את המאפיינים הייחודיים שלנו, אנחנו יכולים לפעול ממקום של מודעות, לבחור בפיתוח החוזקות שלנו ולעבוד על האתגרים שלנו. זהו מסע של גילוי עצמי שבו אנו לומדים לקבל את עצמנו כפי שאנחנו, ולגלות את הפוטנציאל הגלום בנו.<br /><br />

          אסטרולוגיה היא כלי רב עוצמה המציע הבנה מעמיקה של האישיות שלנו ושל השפעת הכוכבים על חיינו. היא מאפשרת לנו לחקור את עצמנו בצורה ייחודית, לגלות את הטוב שבנו ולהתפתח כאנשים. בעידן שבו רבים מחפשים חיבור פנימי ומשמעות, האסטרולוגיה מספקת מפה חשובה לחקירה עצמית ולהבנה מעמיקה של עצמנו.<br /><br />
        </p>

      </div><div className="posts-about">
        <h2 className="title-posts">מאמרים מומלצים:</h2>
        <ViewBlogs limit={3} />
        <button  className="view-more-btn">
          לראות עוד
        </button>
      </div>
    </div>
  );
};

export default AboutAstro;
