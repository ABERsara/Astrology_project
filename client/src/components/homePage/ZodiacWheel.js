import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './zodiac-wheel.css';

const zodiacSigns = [
  "Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces", "Aries"
];

const zodiacInfo = {
  Aries: {
    hebrewName: "טלה",
    dates: "21 במרץ – 19 באפריל",
    description: "מזל טלה הוא סימן ההתחלות החדשות, מלא באש ותשוקה. ניחנת באומץ ובחיות, עם רצון להוביל ולהנחות. הנחישות שלך מאפשרת לך לפרוץ גבולות וליצור הזדמנויות חדשות.",
    recommendation: "אל תפחד לקחת סיכונים חדשים, והאמן בכוח שלך להגשים חלומות."
  },
  Taurus: {
    hebrewName: "שור",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."
  },  Gemini:{
    hebrewName: "שור",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."},
  Cancer: {
    hebrewName: "סרטן",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."},
  Leo: {
    hebrewName: "אריה",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."},
  Virgo: {
    hebrewName: "שור",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."},
  Libra: {
    hebrewName: "שור",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."},
  Scorpio:{
    hebrewName: "שור",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."},
  Sagittarius: {
    hebrewName: "שור",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."},
  Capricorn: {
    hebrewName: "שור",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."},
  Aquarius: {
    hebrewName: "שור",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."},
  Pisces: {
    hebrewName: "שור",
    dates: "20 באפריל – 20 במאי",
    description: "מזל שור הוא סימן של יציבות וביטחון, עם אהבה לחיים הטובים. ידוע ביכולת שלך לבנות ולהתמיד.",
    recommendation: "הייה פתוח לשינויים ואל תפחד לנסות דברים חדשים."}
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
          <img src="/xMark.png" alt="חזור אחורה" className="img-back" onClick={closeModal}/>
          
          {selectedSign && (
    <>
      <h2>{zodiacInfo[selectedSign].hebrewName}</h2>
      <h5>{zodiacInfo[selectedSign].dates}</h5>
      <p>{zodiacInfo[selectedSign].description}</p>
      <h5>המלצה:</h5>
      <p>{zodiacInfo[selectedSign].recommendation}</p>
    </>
  )}
        </Modal>
      </div>
      <div className='button-container button-below-wheel'>
      <button className="spin-button" onClick={startSpin}>
          <img
            src={isSpinning ? "/pause.png" : "/play-button.png"}
            alt={isSpinning ? "Pause" : "Play"}
            style={isSpinning?{ width: '30px', height: '30px' }:{width: '25px', height: '25px' }}
          />
        </button>
      </div>
    </div>
  );
};

export default ZodiacWheel;
