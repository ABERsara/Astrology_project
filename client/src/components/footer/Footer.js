import { useAddContactMutation, useUpdateContactMutation } from "../contactApiSlice";
import useAuth from "../../hooks/useAuth";
import "./footer.css"
//תפריט תחתון
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const { firstname, lastname ,email,phone} = useAuth();
  const [addContact, {data, isError:isAddError, error, isSuccess, isLoading}] = useAddContactMutation()  
    const [updateContact,{isError:isUpdateError}]=useUpdateContactMutation()
    // בדיקה אם המשתמש נמצא בדף about
    const isAboutPage = location.pathname === '/dash/about';
    const formSubmit = (e) => {
      e.preventDefault();
      const data = new FormData(e.target);
      for (let [key, value] of data.entries()) {
        console.log(key, value);
      }
      const contactObject =Object.fromEntries(data.entries())
      addContact(contactObject);
      console.log("adding"+contactObject);
      
  }
  
  return (
    <div className={`footer ${isAboutPage ? 'about-footer' : ''}`}>
      <div className="contactSection">
        יצירת קשר
      
      </div>
      <div className="formContact">
      <form onSubmit={formSubmit} className="add-form-contact">
      <input type="text" name="name" className="contact-item name" required placeholder="השם שלך:" defaultValue={`${firstname?firstname:''}${lastname?lastname:''}`} />
      <input type="phone" name="phone" className="contact-item phone" required placeholder="אימייל (לא נטריד אותך סתם) "defaultValue={phone?phone:""} />
      <input type="email" name="email" className="contact-item email" required placeholder="טלפון (נשמר חסוי) " defaultValue={email?email:""} />
      <button  type="submit" className="">תיצרו איתי קשר!</button>

      </form>
      </div>
      {/* <div className="inSite">
        <h3>מה באתר?</h3>
        <ul>
          <li>אודות</li>
          <li>אבחון אישי</li
          <li>אבחון קבוצתי</li>
        </ul>
      </div>
      <div className="support">
        <h3>תמיכה</h3>
        <ul>
          <li>מצב אבחון</li>
          <li>תוצאות אבחון</li>
          <li>אבחון קבוצתי</li>
        </ul>
      </div>
      <div className="connect">
        <h3>יצירת קשר</h3>
        <ul>
          <li>0534102755</li>
          <li>rachely0584851652@gmail.com </li>
        </ul>
      </div>
      <div className="foot-rights">@all rights reserved</div> */}
    </div>

  )
}

export default Footer