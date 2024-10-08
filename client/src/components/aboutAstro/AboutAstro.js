import React, { useEffect, useRef, useState } from "react";
import "./about-astro.css";

const AboutAstro = () => {
  const [showFirstSentence, setShowFirstSentence] = useState(false);
  const [showSecondSentence, setShowSecondSentence] = useState(false);
  const sentencesRef = useRef(null);

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
      ]פיעכענמלפינ ליעטי יועינ לוועע תמנחנ  לוה חעי חעאב חעאעס ליטבב ליטכ צל
ןןוי י חיטכב חיוט יכ לחןאב לןעע לןיה ל חןי ךח ליעה ךלןיה לח לי צ
לםווע חיע חיט חכככג לה ךלםלםןי חועב ךחועב לחועב חיעט 
םוו יעב כאג יט חי ןונ ועטג עטגג ליוע חע7ו פםםי חעא חעכ יכגי ליו ןוע ךחכ לחיעב ךףל
םווע חייע יכעכ כ ךלממ םח ךחינ ךווה לחםיה  ךלי ךנ לחל ךמ לך
ןיןי חעטר לחלך ליכס חעון לעכצמצ צהע עעה חעכ לינינ יעיע
ךללי עיכע כעגב יחה .

ךחלעי עגעח צמצ ליע תנ תחי יכב תחו ץפה ללח ךח ציה ךנ 
לםחעה יעכ חיוכ לחעלח לחעב חוה ףפפי חטה עאב ך יי ליבב
לםועה חעעכב יכטנ לחך חעטג ליע ליע ךלםןח תיעה ליכ ךיעה חייע חה,
חעעב חעגס ליט י .

לםח לחטכב תחןכב תלןכ חםףם לאג תלםעהצפיה חעא תפב ףל ךיכ  מע לךל
לייכב צחטטגב צלוןוכ לטארדז תןוכ ףן נאס חעאקס ךיעב ךןןוה וגס לחלחב יצ
ואטכ חטאג ךורדג ןטרכ ןוטכ לואכ צחןאנ ףןכבמלפ  ךוה ףכ ךוכה לה  חיוה לטכ .

ןיחמ ליהצ לע ךחוטכבה תחה ממעב תחעכבב  ציעה  חעב  י   חעב ננ  צל.

ליח חעיה ייה ליעה צחעככ לחחי חעעה  ןוע מעעעחח לטורכהמי חטאטכנ צלוןוענ
לןעי חעכ חעב מעב ירג  נכגדס .
ללעהעגגגחךיגנ  העכ מעעה  חי.
        </p>
      </div>
    </div>
  );
};

export default AboutAstro;
