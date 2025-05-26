import { useParams } from "react-router-dom";
import {useSetNewPasswordMutation} from "../authApiSlice"
import { useState } from "react";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams()
  const [setNewPassword] = useSetNewPasswordMutation();
console.log(password,token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await setNewPassword({ token, password }).unwrap();
      alert("סיסמה עודכנה בהצלחה!");
    } catch (err) {
      alert("הקישור לא תקף או פג תוקף");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>עדכון סיסמה</h2>
      <input
        type="password"
        placeholder="סיסמה חדשה"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">עדכן סיסמה</button>
    </form>
  );
};
export default ResetPasswordForm;
