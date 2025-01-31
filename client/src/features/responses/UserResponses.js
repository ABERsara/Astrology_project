import { useNavigate } from "react-router-dom";
import { useAddResponseMutation, useDeleteResponseMutation, useGetAllResponsesQuery, useUpdateResponseMutation } from "./responseApiSlice";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import "./user-responses.css";
import PopUp from "../PopUp";

const UserResponses = () => {
  const { id, isAdmin, isUser } = useAuth();
  const { data: responsesObject, isError, error, isLoading } = useGetAllResponsesQuery();
  const [addResponse] = useAddResponseMutation();
  const [updateResponse] = useUpdateResponseMutation();
  const [deleteResponse] = useDeleteResponseMutation();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isApprovalPopupOpen, setIsApprovalPopupOpen] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState(null); // כדי לשמור איזו תגובה נבחרה
  const [isDeletedConfirm, setIsDeletedConfirm] = useState(false);
  const [selectedResponseDelete, setSelectedResponseDelete] = useState(null); // כדי לשמור איזו תגובה נבחרה

  const handelDeleteResponse = (responseId) => {
    setSelectedResponseDelete(responseId);
    setIsDeletedConfirm(true);
  }
  const handleConfirmDelete = async (responseId) => {
    try {
      await deleteResponse(responseId)
      setIsDeletedConfirm(false)
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  }
  const handleUpdateResponse = (response) => {
    setSelectedResponse(response); // שומרים איזו תגובה נבחרה
    setIsApprovalPopupOpen(true); // פותחים את הפופאפ
  };

  const handleApproveResponse = async (response) => {
    try {
      await updateResponse({
        ...response,
        id: response._id,
        allowedAdmin: !response.allowedAdmin, // אם התגובה מאושרת כבר, נבטל את האישור ולהפך
      });
      setIsApprovalPopupOpen(false); // סוגרים את הפופאפ
    } catch (error) {
      console.error("Error updating response:", error);
    }
  };

  const handleCancelApproval = () => {
    setIsApprovalPopupOpen(false); // סוגרים את הפופאפ אם המנהל בחר לא לאשר
  };

  const [responseData, setResponseData] = useState({
    content: "",
    allowedUser: true,
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
        allowedUser: true,
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

      {responsesObject?.data
        ?.filter((response) => isAdmin || (response.allowedAdmin && response.allowedUser))
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
              {response.appearName && response.registerUser?.firstname ? (
                <p className={`response-name ${response.position}`}>
                  {response.registerUser.firstname}
                  {response.registerUser.lastname || ""}
                </p>

              ) : null}
              {isAdmin && (
                <div className="permission-response-button">

                  {response.allowedAdmin ? (
                    // אם התגובה כבר אושרה, הצג כפתור לשנות את האישור
                    <button
                      className="button-approval-response"
                      onClick={() => handleUpdateResponse(response)}>
                      התגובה כבר אושרה, רוצה לשנות?
                    </button>
                  ) : (
                    // אם התגובה לא אושרה, הצג כפתור לאישור
                    <button
                      className="button-approval-response"
                      onClick={() => handleUpdateResponse(response)}>
                      אשר תגובה לפרסום
                    </button>
                  )}
                </div>
              )}

            </div>
          </div>
        ))}

      {isUser && <div className="add-response-button">
        <button onClick={() => setIsPopupOpen(true)}>הוספת תגובה</button>
      </div>}


      {isPopupOpen && (
        <PopUp width={'350px'} close={handleAddResponse}>
          <div className="popup-content-response">
            <  img
              className="img-back"
              src="/xMark.png"
              alt="x"

              onClick={() => setIsPopupOpen(false)} />
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
                  className="checkbox-allowedUser"
                  type="checkbox"
                  checked={responseData.allowedUser}
                  onChange={(e) =>
                    setResponseData({ ...responseData, allowedUser: e.target.checked })
                  }
                />
                האם לאשר לפרסום
              </label>
              <label>
                <input
                  className="checkbox-appearName"
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

            </div>
          </div>
        </PopUp>
      )}
      {isApprovalPopupOpen && selectedResponse && (

        <PopUp width={'350px'} close={handleCancelApproval}>
          <div
            className="popup-content-response"
          >
            <img
              src="/xMark.png"
              alt="x"
              className="img-back"
              onClick={handleCancelApproval} />
            <h2>האם לאשר את התגובה לפרסום?</h2>
            <p>{selectedResponse.content}</p>
            <div className="popup-actions-response">
              <button onClick={() => handleApproveResponse(selectedResponse)}>
                {selectedResponse.allowedAdmin ? "התגובה כבר אושרה" : "אשר תגובה לפרסום"}
              </button>

            </div>

          </div>
        </PopUp>
      )}

    </div>
  );
};

export default UserResponses;
