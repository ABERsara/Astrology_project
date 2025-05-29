import { useState } from "react";
import {
  useGetAllQuestionsAnswersQuery,
  useAddQuestionMutation,
  useUpdateQuestionAnswerMutation,
  useDeleteQuestionAnswerMutation,
} from "./questionApiSlice";
import "./user-question.css";
import useAuth from "../../hooks/useAuth";

const UserQuestions = () => {
  const { data: response, isLoading, isError } = useGetAllQuestionsAnswersQuery();
  const questions = response?.data || []; // גישה למפתח data בתוך האובייקט response

  const [addQuestion] = useAddQuestionMutation();
  const [updateQuestion] = useUpdateQuestionAnswerMutation();
  const [deleteQuestion] = useDeleteQuestionAnswerMutation();

  const { isAdmin } = useAuth(); // השתמש בלוגיקה של ההרשאות

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [questionData, setQuestionData] = useState({
    firstName: "",
    phone: "",
    question: "",
    answer: "",
  });

  const handleAddQuestion = async () => {
    try {
      await addQuestion(questionData);
      setQuestionData({ firstName: "", phone: "", question: "", answer: "" });
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  const handleUpdateQuestionAnswer = async () => {
    if (!selectedQuestion?._id) {
      console.error("ID is missing!");
      return;
    }

    try {
      // אם יש תשובה, עדכן את השאלה והתשובה
      if (selectedQuestion.answer) {
        await updateQuestion({
          id: selectedQuestion._id,
          firstName: selectedQuestion.firstName,
          phone: selectedQuestion.phone,
          question: selectedQuestion.question,
          answer: selectedQuestion.answer,
        });
      } else {
        // אם אין תשובה, עדכן רק את השאלה
        await updateQuestion({
          id: selectedQuestion._id,
          firstName: selectedQuestion.firstName,
          phone: selectedQuestion.phone,
          question: selectedQuestion.question,
        });
      }
      setSelectedQuestion(null);
    } catch (error) {
      console.error("Error updating question or answer:", error);
    }
  };

  const handleDeleteQuestion = async (id) => {
    try {
      await deleteQuestion({ id });
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  console.log(questions); // לבדוק את הנתונים בקונסול

  return (
    <div className="questions-container">
      {isLoading && <p>Loading questions...</p>}
      {isError && <p>Error loading questions!</p>}
      {questions.length === 0 && <p>אין שאלות במערכת.</p>}

      {questions.map((question) => (
        <div key={question._id} className="question-card">
          <p>
            <strong>שאלה:</strong> {question.question}
          </p>
          {question.answer && (
            <p>
              <strong>תשובה:</strong> {question.answer}
            </p>
          )}
          {isAdmin && (
            <>
              <button onClick={() => setSelectedQuestion(question)}>עדכן</button>
              <button onClick={() => handleDeleteQuestion(question._id)}>מחק</button>
            </>
          )}
        </div>
      ))}

      <button onClick={() => setIsPopupOpen(true)}>הוסף שאלה</button>

      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>הוסף שאלה</h2>
            <input
              type="text"
              placeholder="שם פרטי"
              value={questionData.firstName}
              onChange={(e) => setQuestionData({ ...questionData, firstName: e.target.value })}
            />
            <input
              type="text"
              placeholder="מספר טלפון"
              value={questionData.phone}
              onChange={(e) => setQuestionData({ ...questionData, phone: e.target.value })}
            />
            <textarea
              placeholder="כתוב את השאלה שלך..."
              value={questionData.question}
              onChange={(e) => setQuestionData({ ...questionData, question: e.target.value })}
            />
            <button onClick={handleAddQuestion}>שלח</button>
            <button onClick={() => setIsPopupOpen(false)}>בטל</button>
          </div>
        </div>
      )}

      {selectedQuestion && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>עדכן שאלה או תשובה</h2>
            <textarea
              placeholder="עדכן שאלה"
              value={selectedQuestion.question}
              onChange={(e) =>
                setSelectedQuestion({ ...selectedQuestion, question: e.target.value })
              }
            />
            {isAdmin && (
              <textarea
                placeholder="עדכן תשובה"
                value={selectedQuestion.answer || ""}
                onChange={(e) =>
                  setSelectedQuestion({ ...selectedQuestion, answer: e.target.value })
                }
              />
            )}
            <button onClick={handleUpdateQuestionAnswer}>עדכן</button>
            <button onClick={() => setSelectedQuestion(null)}>בטל</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserQuestions;

