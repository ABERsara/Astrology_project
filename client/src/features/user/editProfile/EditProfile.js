import "./edit-Profile.css";
import { useUpdateUserMutation, useGetUserQuery } from "../userApiSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import React, { useRef, useState } from "react";

const EditProfile = () => {
  const navigate = useNavigate();
  const { id, image: initialImage } = useAuth()
  const { data: user, isSuccess: isGetUserSuccess } = useGetUserQuery(id, { refetchOnMountOrArgChange: true }); // קריאה עם ה-ID
  const [updateUser, { isSuccess: isUpdateSuccess, isError, error }] = useUpdateUserMutation();
  useEffect(() => {
    if (isUpdateSuccess) {

      navigate("/dash/user");
    }
  }, [isUpdateSuccess]);

  const [image, setImage] = useState(initialImage || ""); // תמונה שתוצג
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // יצירת תצוגה מקדימה
    }
  };
  // פתיחת ה-input בלחיצה על התמונה
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // טיפול בהעלאת קובץ חדש




  // טיפול בהעלאת קובץ חדש
  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const objectUrl = URL.createObjectURL(file); // יצירת URL מקומי
  //     setMyImage(objectUrl); // הצגת תצוגה מקדימה
  //   }
  // };

  //    const formSubmit = (e) => {
  //  e.preventDefault();
  //   const dataForm = new FormData(e.target);
  //   // const imageFile = dataForm.get('image');
  //   // if (!imageFile || imageFile.size === 0) {
  //   //   console.log("image",imageFile)
  //   // //  אם לא נבחרה תמונה חדשה, נוסיף את התמונה הקודמת
  //   //   dataForm.set('image', user.image || ""); // נוודא שהתמונה הקודמת נשלחת
  //   // }
  //   const data = { ...user,
  //     firstname:dataForm.get('firstname'),
  //     lastname: dataForm.get('lastname'),
  //   phone:dataForm.get('phone'),
  //    email:dataForm.get('email'),
  //   ...dataForm,
  //     id: user._id };
  //    console.log("זה הנתונים שהתקבלו: ", dataForm, data);
  //    try {
  //      updateUser(data);
  //      console.log("המשתמש עודכן בהצלחה");
  //     } catch (error) {
  //    console.log(error);


  //    };
  //   }
  const formSubmit = (e) => {
    e.preventDefault();
    const dataForm = new FormData(e.target);
    const file = fileInputRef.current.files[0]; // קבלת הקובץ מה-input
    console.log('file: ', file);

    // אם נבחרה תמונה חדשה, נוסיף אותה ל-FormData
    if (file) {
      dataForm.set("image", file);
    } else if (user.image) {
      dataForm.set("image", user.image); // הוספת התמונה הקיימת כברירת מחדל
    }
    // const imageFile = dataForm.get('image');
    // if (!imageFile || imageFile.size === 0) {
    //   console.log("image",imageFile)
    // //  אם לא נבחרה תמונה חדשה, נוסיף את התמונה הקודמת
    //   dataForm.set('image', user.image || ""); // נוודא שהתמונה הקודמת נשלחת
    // }
    // הדפסת הנתונים לבדיקה
    for (let pair of dataForm.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    // const data = {
    //   ...dataForm, ...user,
    //   firstname: dataForm.get('firstname'),
    //   lastname: dataForm.get('lastname'),
    //   phone: dataForm.get('phone'),
    //   email: dataForm.get('email'),
    //   // image:dataForm.get('image').filename||user.image.filename,
    //   id: user._id
    // };
    // console.log("זה הנתונים שהתקבלו: ", dataForm);
    try {
      updateUser(dataForm);
    } catch (error) {
      console.log(error);


    };
  }
  const closeModal = () => {

    navigate("/dash/user")
  }
  return (
    <>
      {isError && <h1>{JSON.stringify(error)}</h1>}
      {!user ? (
        <div>
          <h1>משתמש {id} לא נמצא</h1>
        </div>
      ) : (
        <div className="edit-profile-zone">
          <img src="/xMark.png" alt="" className="edit-profile-item-img-back" onClick={closeModal} />

          <h1>עריכת פרופיל</h1>

          <div className="edit-profile-page">
            <form className="edit-profile-form edit-profile" onSubmit={formSubmit}>
              {/* <label className="edit-profile-item image"></label> */}
              {/* <img
                className="edit-profile-item image" alt=""
                src={image ? `http://localhost:2024/uploads/${image}` : "/account-white.png"}

              /><input type="file" name="image" /> */}
              {/* תמונה ולחיצה לפתיחת ה-input */}
              <img
                src={previewImage ? previewImage : image ? `http://localhost:2024/uploads/${image}` : "/account-white.png"}
                alt="profile"
                className="edit-profile-item image"
                onClick={handleImageClick}
                style={{
                  cursor: "pointer",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  // border: "2px solid #ddd",
                }}
              />
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                name="image"
              />

              <label className="edit-profile-item firstname">שם פרטי:</label>
              <input type="text" name="firstname" required defaultValue={user.firstname} />
              <label className="edit-profile-item lastname">שם משפחה:</label>
              <input type="text" name="lastname" defaultValue={user.lastname ? user.lastname : ""} />
              <label className="edit-profile-item phone">טלפון:</label>
              <input type="phone" name="phone" defaultValue={user.phone ? user.phone : ""} />
              <label className="edit-profile-item email">אימייל:</label>
              <input type="email" name="email" required defaultValue={user.email} />
              <input type="hidden" name="id" value={user._id} />
              <input type="hidden" name="permission" value={user.permission} />

              <div className="edit-profile-item-submit-button">
                <button type="submit" className="edit-profile-item-submit">עדכן</button>
              </div>
              <div id="error-message" className="error-message"></div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

