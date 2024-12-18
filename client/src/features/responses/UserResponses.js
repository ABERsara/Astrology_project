import { useNavigate } from "react-router-dom";
import { useAddResponseMutation, useDeleteResponseMutation, useGetAllResponsesQuery } from "./responseApiSlice";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./user-responses.css"
const UserResponses = () => {
  const { firstname, lastname,id } = useAuth();
  const { data: responsesObject, isError, error, isLoading } = useGetAllResponsesQuery();
  const [addResponse] = useAddResponseMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // מצב הפופאפ
  const [responseData, setResponseData] = useState({
    content: "",
    allowed: true,
    apearName: true,
  });

  const handleAddResponse = async () => {
    try {
      await addResponse({ ...responseData, registerUser: id }); // הכניסי את מזהה המשתמש האמיתי
      setIsPopupOpen(false); // סגירת הפופאפ לאחר שליחה
    } catch (error) {
      console.error("Error adding response:", error);
    }
  };

  return (
    <div className="user-responses-class">
      {isLoading && <p>Loading responses...</p>}
      {isError && <p>Error loading responses!</p>}
      {responsesObject?.data?.length === 0 && <p>אין עדיין תגובות.</p>}

      {responsesObject?.data?.map((response) => (
        <div key={response._id} className={`response-container ${response.position}`}>
        <div
          className={`response-content ${response.position}`}
          style={{
            backgroundImage: response.position === 'left'
              ? 'url(/Frame1.png)'
              : 'url(/Frame2.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              color: '#fff',  // צבע טקסט על התמונה
            }}
          >
            <p>{response.content}</p>
          </div>
        </div>
      ))}

      {firstname && (
        <div className="add-response-button">
          <button onClick={() => setIsPopupOpen(true)}>הוספת תגובה</button>
        </div>
      )}

      {/* פופאפ הוספת תגובה */}
      {isPopupOpen && (
        <div className="popup-overlay-response">
          <div className="popup-content-response">
            <h2>הוספת תגובה</h2>
            <textarea
              placeholder="כתוב את התגובה שלך כאן..."
              value={responseData.content}
              onChange={(e) => {
                if (e.target.value.length <= 200) { // הגבלת ל-200 תווים
                  setResponseData({ ...responseData, content: e.target.value });
                }
              }}
            ></textarea>
            <p>{responseData.content.length}/200 תווים</p>

            <div className="popup-actions-response">
              <button onClick={handleAddResponse}>שלח</button>
              <button onClick={() => setIsPopupOpen(false)}>ביטול</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserResponses;
