import "./edit-Profile.css"

const EditProfile = () => {
  return (
    <div className="edit-profile">
      <form className="edit-profile-form">
      <input type="file" name="imageUrl" placeholder="העלה תמונה" />
        <input type="text" name="firstName" required placeholder="הכנס שם פרטי" />
        <input type="text" name="lastName" placeholder="הכנס שם משפחה" />
        <input type="phone" name="phone" placeholder="הכנס מס' נייד" />
        <input type="email" name="email" required placeholder="הכנס כתובת אימייל" />
        <input type="password" name="password" required placeholder="הכנס סיסמה" />
        <button type="submit">עדכן</button>
        <button type="cancel">בטל</button>
      </form>
    </div>
  )
}

export default EditProfile