import { useAddContactMutation, useUpdateContactMutation } from "../contactApiSlice";
import useAuth from "../../hooks/useAuth";
import "./footer.css";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Footer = () => {
  const location = useLocation();
  const { firstname, lastname, email, phone } = useAuth();
  console.log(firstname, lastname);
  const [addContact, { isSuccess, isLoading }] = useAddContactMutation();
  // const [updateContact] = useUpdateContactMutation();
  const [message, setMessage] = useState("תיצרו איתי קשר!");

  const isAboutPage = location.pathname === '/dash/about';

  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const contactObject = Object.fromEntries(data.entries());
    addContact(contactObject);
  };

  useEffect(() => {
    if (isSuccess) {
      setMessage("נרשמת בהצלחה, ניצור איתך קשר בהקדם");
    }
  }, [isSuccess]);

  return (
    <div id="contact-section" className={`footer ${isAboutPage ? 'about-footer' : ''}`}>
      <div className="contactSection">יצירת קשר</div>
      <div className="formContact">
        <form onSubmit={formSubmit} className="add-form-contact">
          <input
            type="text"
            name="name"
            className="contact-item nameI"
            required
            placeholder="השם שלך"
            defaultValue={firstname && firstname}
            />
          <input
            type="phone"
            name="phone"
            className="contact-item phone"
            placeholder="טלפון (נשמר חסוי)"
            defaultValue={phone || ""}
          />
          <input
            type="email"
            name="email"
            className="contact-item email"
            placeholder="אימייל (לא נטריד אותך סתם)"
            defaultValue={email || ""}
          />
          <button type="submit" className="">{message}</button>
        </form>
      </div>
    </div>
  );
}

export default Footer;
