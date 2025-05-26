
import { useState } from "react";
import {useResetPasswordRequestMutation} from "../authApiSlice"
const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [resetPasswordRequest] = useResetPasswordRequestMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await resetPasswordRequest(email).unwrap();
      alert("נשלח קישור לשחזור סיסמה למייל");
    } catch (err) {
      alert("שגיאה בשליחה. ייתכן שהאימייל לא רשום.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>שכחתי סיסמה</h2>
      <input
        type="email"
        placeholder="הכנס/י אימייל"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">שלח קישור לשחזור</button>
    </form>
  );
};
export default ForgotPasswordForm
