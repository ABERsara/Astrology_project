import React, { useState } from "react";
import "./Meeting.css";
import DatePicker from "react-datepicker"; // ספרייה לבחירת תאריכים
import "react-datepicker/dist/react-datepicker.css";

const Meeting = () => {
  const [meetingType, setMeetingType] = useState(null); // סוג הפגישה
  const [selectedDate, setSelectedDate] = useState(null); // תאריך נבחר

  // רשימת תאריכים ושעות זמינים
  const availableDates = [
    new Date("2024-12-15T10:00:00"),
    new Date("2024-12-16T14:00:00"),
    new Date("2024-12-17T09:00:00"),
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!meetingType || !selectedDate) {
      alert("נא לבחור אופן פגישה ותאריך.");
      return;
    }
    console.log("Meeting Details:", { meetingType, selectedDate });
    alert("הפגישה נקבעה בהצלחה!");
  };

  return (
    <div className="appointment-container">
      <h1 className="appointment-title">עכשיו נסכם דברים אחרונים:</h1>
      <form onSubmit={handleSubmit} className="appointment-form">
        {/* כפתורים לבחירת סוג הפגישה */}
        <div className="meeting-type-buttons">
        <p className="heading-text">איך את רוצה להפגש?</p>
                  <button
            type="button"
            className={`meeting-button ${meetingType === "phone" ? "selected" : ""}`}
            onClick={() => setMeetingType("phone")}
          >
            טלפונית
          </button>
          <button
            type="button"
            className={`meeting-button ${meetingType === "zoom" ? "selected" : ""}`}
            onClick={() => setMeetingType("zoom")}
          >
            זום
          </button>
          <button
            type="button"
            className={`meeting-button ${meetingType === "google_meet" ? "selected" : ""}`}
            onClick={() => setMeetingType("google_meet")}
          >
            Google Meet
          </button>
        </div>

        {/* לוח שנה לבחירת תאריך */}
        <div className="calendar-container">
        <p className="heading-text">מתי נח לך?</p>
          <DatePicker
          className="calendar-button"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            includeDates={availableDates} // תאריכים זמינים בלבד
            showTimeSelect // הצגת שעות
            dateFormat="Pp" // פורמט של תאריך ושעה
            placeholderText="בחר תאריך ושעה"
          />
        </div>

        {/* כפתור לשליחה */}
        <div className="submit-container">
          <button type="submit" className="submit-meeting">
            קבע פגישה
          </button>
        </div>
      </form>
    </div>
  );
};

export default Meeting;
