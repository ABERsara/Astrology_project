import { useNavigate } from "react-router-dom";
import { useAddResponseMutation, useDeleteResponseMutation, useGetAllResponsesQuery } from "./responseApiSlice";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./user-responses.css";

const UserResponses = () => {
  const { id } = useAuth();
  const { data: responsesObject, isError, error, isLoading } = useGetAllResponsesQuery();
  const [addResponse] = useAddResponseMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [responseData, setResponseData] = useState({
    content: "",
    allowed: true,
    appearName: true,
  });

  const handleAddResponse = async () => {
    try {
      await addResponse({
        ...responseData,
        registerUser: id,
      });
      setResponseData({
        content: "",
        allowed: true,
        appearName: true,
      }); // איפוס השדות לאחר הוספה
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding response:", error);
    }
  };

  return (
    <div className="user-responses-class">
      {isLoading && <p>Loading responses...</p>}
      {isError && <p>Error loading responses!</p>}
      {responsesObject?.data?.length === 0 && <p>אין עדיין תגובות.</p>}
{console.log(responsesObject)}
      {responsesObject?.data
        ?.filter((response) => response.allowed)
        .map((response) => (
          <div key={response._id} className={`response-container ${response.position}`}>
            <div
              className={`response-content ${response.position}`}
              style={{
                backgroundImage:
                  response.position === 'left'
                    ? 'url(/Frame1.png)'
                    : 'url(/Frame2.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: '#fff',
              }}
            >
              <p>{response.content}</p>
              {response.appearName && response.registerUser?.firstname && response.registerUser?.lastname ? (
  <p className="response-name">
    {response.registerUser.firstname} {response.registerUser.lastname}
  </p>

) : null}

            </div>
          </div>
        ))}

      <div className="add-response-button">
        <button onClick={() => setIsPopupOpen(true)}>הוספת תגובה</button>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay-response">
          <div className="popup-content-response">
            <h2>הוספת תגובה</h2>
            <textarea
              placeholder="כתוב את התגובה שלך כאן..."
              value={responseData.content}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setResponseData({ ...responseData, content: e.target.value });
                }
              }}
            ></textarea>
            <p>{responseData.content.length}/200 תווים</p>

            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={responseData.allowed}
                  onChange={(e) =>
                    setResponseData({ ...responseData, allowed: e.target.checked })
                  }
                />
                האם לאשר לפרסום
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={responseData.appearName}
                  onChange={(e) =>
                    setResponseData({ ...responseData, appearName: e.target.checked })
                  }
                />
                האם להציג את השם
              </label>
            </div>

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
