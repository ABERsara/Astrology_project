import useAuth from "../../../hooks/useAuth";
import "./upload-diagnosis.css"
import { useState, useEffect } from 'react';
import { useAddDiagnosisMutation } from "../uploadDiagnosis/diagnosisApiSlice";
import Meeting from "./Meeting";
// import axios from "axios";

const UploadDiagnosis = () => {
  const { firstname, lastname, email, phone } = useAuth();
  const [addDiagnosis, { isSuccess, isLoading }] = useAddDiagnosisMutation();
  const [stage, setStage] = useState("diagnosis"); // 'diagnosis' או 'appointment'
  const [cities, setCities] = useState([]);
  // const [selectedCity, setSelectedCity] = useState("");

  // 
  const formSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    const diagnosisObject = Object.fromEntries(data.entries());
    const [hour, minutes] = diagnosisObject.birthTime.split(':');
    diagnosisObject.birthTime = {
      hour: parseInt(hour, 10),
      minutes: parseInt(minutes, 10),
    };

    diagnosisObject.utc = {
      city: diagnosisObject.utcCity,
      country: diagnosisObject.utcCountry,
    };
    delete diagnosisObject.utcCity;
    delete diagnosisObject.utcCountry;
    try {
      await addDiagnosis(diagnosisObject).unwrap(); // קריאה ל-API להוספת האבחון
      setStage("appointment"); // מעבר לשלב הפגישה
    } catch (error) {
      console.error("Failed to add diagnosis:", error);
    }
  };



  return (
    <div className="diagnosis-container">
      {stage === "diagnosis" ? (
        <>
          <h1 className="diagnosis-h1">אז מה כולל האבחון?</h1>
          <div className="diagnosis-contains">
            <div className="general_character_diagnosis">
              <div className="gcd1">
                <img src="/0.png" alt="" />
                <h4>אבחון אופי כללי</h4>
              </div> <div className="gcd2">
                <img src="/6.png" alt="" />
                <h4>אבחון סגנון תקשורת</h4>
              </div> <div className="gcd1">
                <img src="/2.png" alt="" />
                <h4>הכוונה תעסוקתית</h4>
              </div> <div className="gcd2">
                <img src="/3.png" alt="" />
                <h4>הכוונה לזוגות נשואים</h4>
              </div> <div className="gcd1">
                <img src="/4.png" alt="" />
                <h4>שיחת יעוץ מדייקת ומכוונת</h4>
              </div>
              <div className="gcd2">
                <img src="/7.png" alt="" />
                <h4>שחרור מתקיעויות</h4>
              </div>
            </div>
            <div>
              <h3 className="diagnosis-h3">קדימה, נתחיל:</h3>
              <h5 className="diagnosis-h5">כמה פרטים לצורך אבחון מדויק</h5>
              <div className="formDiagnosis">
                <form onSubmit={formSubmit} className="add-form-diagnosis">
                  <input
                    type="text"
                    name="firstname"
                    className="diagnosis-item nameI"
                    required
                    placeholder="השם שלך"
                    defaultValue={firstname && firstname}
                  />
                  <input
                    type="email"
                    name="email"
                    className="diagnosis-item email"
                    placeholder="אימייל (לא נטריד אותך סתם)"
                    defaultValue={email || ""}
                  // onBlur={handleEmailBlur} // בדוק אם האימייל קיים

                  />
                  {/* {isUserNew && (
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="סיסמה (משתמש חדש)"
                />
              )} */}
                  {/* תאריך לידה */}
                  <input
                    type="date"
                    name="birthdate"
                    className="diagnosis-item dob"
                    required
                    placeholder="תאריך לידה"
                  />
                  {/* מיקום לידה */}
                  <select
                name="utcCity"
                className="diagnosis-item location"
                
              >
                <option value="">בחר מיקום לידה (עיר)</option>
                <option value="Baker Island">אי בייקר</option>
                <option value="American Samoa">סמואה האמריקנית</option>
                <option value="London">לונדון</option>
                <option value="Israel">ישראל</option>
                <option value="Moscow">מוסקבה</option>
                <option value="India">הודו</option>
                <option value="China">סין</option>
                <option value="New York">ניו יורק</option>
                <option value="California">קליפורניה</option>
              </select>
              <select
                name="utcCountry"
                className="diagnosis-item location"
                
              >
                <option value="">בחר מיקום לידה (מדינה)</option>
                <option value="USA">ארה"ב</option>
                <option value="UK">בריטניה</option>
                <option value="Israel">ישראל</option>
                <option value="Russia">רוסיה</option>
                <option value="India">הודו</option>
                <option value="China">סין</option>
              </select>
                  {/* <div>
                    <label htmlFor="utcCity">בחר מיקום לידה (מדינה):</label>
                    <select
                      id="utcCity"
                      value={selectedCity}
                      name="utcCountry"
                      className="diagnosis-item location"
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="">בחר עיר</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}, {city.country}
                        </option>
                      ))}
                    </select>
                  </div> */}
                  {/* שעת לידה */}
                  <input
                    type="time"
                    name="birthTime"
                    className="diagnosis-item time"

                    placeholder="שעת לידה"
                  />
                  <div class="submit-container">
                    <button type="submit" class="submit-diagnosis">לשלוח</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="appointment-container">
          <Meeting />
        </div>
      )}
    </div>
  );
};

export default UploadDiagnosis;