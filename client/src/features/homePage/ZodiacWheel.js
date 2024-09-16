import React, { useState } from 'react';
import Modal from 'react-modal';
import './zodiac-wheel.css';

const zodiacSigns = [
"Taurus", "Gemini", "Cancer", "Leo", "Virgo", 
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius" , "Pisces","Aries"
];

const zodiacInfo = {
  Aries: "Information about Aries...",
  Taurus: "Information about Taurus...",
  Gemini: "Information about Gemini...",
  Cancer: "Information about Cancer...",
  Leo: "Information about Leo...",
  Virgo: "Information about Virgo...",
  Libra: "Information about Libra...",
  Scorpio: "Information about Scorpio...",
  Sagittarius: "Information about Sagittarius...",
  Capricorn: "Information about Capricorn...",
  Aquarius: "Information about Aquarius...",
  Pisces: "Information about Pisces...",
};

Modal.setAppElement('#root');

const ZodiacWheel = () => {
  const [selectedSign, setSelectedSign] = useState(null);
  const [isSpinning, setIsSpinning] = useState(true);

  const handleSignClick = (index) => {
    const wheel = document.querySelector('.zodiac-wheel');
  
    if (!wheel) {
      console.error('Error: Wheel element not found.');
      return;
    }
  
    const style = window.getComputedStyle(wheel);
    const transform = style.getPropertyValue('transform');
  
    if (!transform || transform === 'none') {
      console.error('Error: Transform property not found.');
      return;
    }
  
    // Extract the angle of rotation from the transform matrix values
    const matrixValues = transform.match(/matrix\((.+)\)/)[1].split(', ');
    console.log("matrixValues: "+matrixValues)
    const a = matrixValues[0];
    const b = matrixValues[1];
  console.log("a: "+a + "b: "+b);
  
    // Calculate the angle in degrees
    const angleRad = Math.atan2(b, a);
    console.log("radian: "+angleRad);
    
    let angleDeg = (angleRad * (180 / Math.PI) + 360) % 360; // Convert to degrees and round
    angleDeg = (angleDeg < 0) ? 360 + angleDeg : angleDeg;
    console.log("degrees: "+angleDeg);
    
    // Calculate the corrected index based on the rotation angle
    const correctedIndex = Math.round((12 - angleDeg / 30 + index) % 12);
  console.log("index: "+correctedIndex);
  
    setIsSpinning(false);
    setSelectedSign(zodiacSigns[correctedIndex]);
  };
  const closeModal = () => {
    setSelectedSign(null);
    setIsSpinning(true);
  };

  return (
    <div className="wheel-container">
      <div className={`zodiac-wheel ${isSpinning ? 'spinning' : ''}`}>
        {zodiacSigns.map((sign, index) => (
          <div טא
            key={sign} 
            className={`zodiac-sign sign-${index}`} 
            onClick={() => handleSignClick(index)}
          >
            {/* {sign} להוספת כיתוב מזלות אם נדרש */}
          </div>
        ))}
      </div>
      
      <Modal
        isOpen={!!selectedSign}
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
  );
};

export default ZodiacWheel;
