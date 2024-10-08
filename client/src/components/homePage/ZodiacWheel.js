import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './zodiac-wheel.css';

const zodiacSigns = [
  "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces", "Aries"
];

const zodiacInfo = {
  Aries: "טלה – תמיד ראשון בקו הזינוק, לב של לוחם ונפש של הרפתקן",
  Taurus: "שור – עץ יציב בשדה פרחים, יודע לעמוד על שלו וליהנות מהחיים",
  Gemini: "תאומים – פרפר חסר מנוחה עם סקרנות של ילד, תמיד מדלג בין רעיונות",
  Cancer: "סרטן – הצדף המגן על פנינת הרגש, מחבק את הבית ואת הלב",
  Leo: "אריה – המלך שתמיד זורח, עם רעמת זהב ולב רחב כמו השמש",
  Virgo: "בתולה – הפסיפס המדויק של החיים, לא עוזבת פינה בלי לוודא שהיא מושלמת",
  Libra: "מאזניים – אמן של איזון והרמוניה, יודע לתמרן בין יופי לצדק",
  Scorpio: "עקרב – נהר של עומק ומסתורין, נשמה אינטנסיבית עם מבט חודר",
  Sagittarius: "קשת – חץ שנורה לכיוון האופק, תמיד מחפש את האמת שמעבר להרים",
  Capricorn: "גדי – מטפס ההרים שלא עוצר לרגע, יודע בדיוק איך להגיע לפסגה",
  Aquarius: "דלי – רוח חופשית שממציאה את העולם מחדש, אף פעם לא נצמד לשגרה",
  Pisces: "  דגים – אמן של חלומות וצבעים, שוחה בין מציאות לפנטזיה ברכות אינסופית",
};

Modal.setAppElement('#root');

const ZodiacWheel = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [isSpinning, setIsSpinning] = useState(true);
  const [manualControl, setManualControl] = useState(false); // שליטה ידנית אם לחצו על הכפתור

  useEffect(() => {
    if (!manualControl) {
      // אם לא במצב שליטה ידנית, מתחיל את הסיבוב ואז עוצר אחרי 5 שניות
      const timer = setTimeout(() => {
        setIsSpinning(false);
      }, 5000);
      return () => clearTimeout(timer); // מנקה את ה-timer כשהקומפוננטה משתנה
    }
  }, [manualControl]);

  const startSpin = () => {
    if (isSpinning) {
      setIsSpinning(false); // אם הסיבוב פעיל, עוצר אותו
    } else {
      setIsSpinning(true); // אם הסיבוב עצור, מתחיל אותו שוב
      setManualControl(true); // מעביר למצב שליטה ידנית
    }
  };

  const handleSignClick = (index) => {
    const wheel = document.querySelector('.zodiac-wheel');
    if (!wheel) return;

    const style = window.getComputedStyle(wheel);
    const transform = style.getPropertyValue('transform');
    if (!transform || transform === 'none') return;

    const matrixValues = transform.match(/matrix\((.+)\)/)[1].split(', ');
    const a = matrixValues[0];
    const b = matrixValues[1];
    const angleRad = Math.atan2(b, a);
    
    let angleDeg = (angleRad * (180 / Math.PI) + 360) % 360;
    angleDeg = angleDeg < 0 ? 360 + angleDeg : angleDeg;
    const correctedIndex = Math.round((12 - angleDeg / 30 + index) % 12);

    setIsSpinning(false);
    setSelectedSign(zodiacSigns[correctedIndex]);
  };

  const closeModal = () => {
    setSelectedSign(null);
    setIsSpinning(true);
  };

  return (
    <div className="wheel-container">
      <div className='zodiac-container'>
        <div className={`zodiac-wheel ${isSpinning ? 'spinning' : ''}`}>
          {zodiacSigns.map((sign, index) => (
            <div
              key={sign} 
              className={`zodiac-sign sign-${index}`} 
              onClick={() => handleSignClick(index)}
            >
              {/* להוסיף כיתוב מזלות */}
            </div>
          ))}
        </div>
        
        <Modal
          isOpen={selectedSign}
          onRequestClose={closeModal}
          contentLabel="Zodiac Sign Information"
          className="modal"
          overlayClassName="modal-overlay"
        >
          <button className="close" onClick={closeModal}>
            &times;
          </button>
          <h2>{selectedSign}</h2>
          <p>{zodiacInfo[selectedSign]}</p>
        </Modal>
      </div>
      <div className='button-container'>
        <button onClick={startSpin} className="spin-button">
          {isSpinning ? 'עצור סיבוב' : 'התחל סיבוב'}
        </button>
      </div>
    </div>
  );
};

export default ZodiacWheel;
