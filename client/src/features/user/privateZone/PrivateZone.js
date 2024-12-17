import "./private-zone.css";
import { useState } from "react";

const PrivateZone = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="pz">
      <div className="pz-item pz-posts" 
        style={{
          backgroundImage: "url('/posts.jpg')",
        }}
      >
        <h3>הפוסטים שלי</h3>
      </div>
      <div className="pz-item pz-bills"
        style={{
          backgroundImage: "url('/bills.jpg')",
        }}
      >
        <h3>תשלום והורדת סיכום הפגישה</h3>
      </div>
      <div 
        className="pz-item pz-office-equipment"
        style={{
          backgroundImage: "url('/office-equipment.jpg')",
        }}
        onClick={handlePopupToggle} // הצגת הפופאפ בלחיצה
      >
        <h3>פרטים על הפגישה</h3>
      </div>
      <div className="pz-item pz-calculator"
        style={{
          backgroundImage: "url('/calculator.jpg')",
        }}
      >
        <h3>הורדת הקבלה</h3>
      </div>

      {showPopup && (
        <div className="popup-overlay-private-zone" onClick={handlePopupToggle}>
          <div className="popup-private-zone">
            <h2>פרטי הפגישה</h2>
            <p>כאן יופיעו כל הפרטים על הפגישה שלך.</p>
            <button onClick={handlePopupToggle}>סגור</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivateZone;
