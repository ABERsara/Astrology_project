import "./view-users.css"

import Search from "../../../components/search/Search"
import { Link } from "react-router-dom"
import React from 'react'

const ViewUsers = () => {



  const users = [{
    _id: 1,
    username: "Plony123",
    firstname: "פלוני",
    lastName: "אלמוני"
    , phone: "123"
    , email: "Plony123@gmail.com"
,    imageUrl: "",
    permission: 'User',
    active: true
  }]


  return (

    <div className="users-list">
      <div className="users-list-search">
        <Search placeholder={"חיפוש לפי שם משתמש"} />
        {/* <Link/> */}
        <table className="users-table" >
          <thead>
            <tr>
              <td>שם מלא</td>
              <td>שם משתמש</td>
              <td>טלפון</td>
              <td>אימייל</td>
              <td>הרשאה</td>
              <td>פעיל?</td>
              <td>פעולות</td>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="users-details">
                    <img src={user.imageUrl || ""} alt="" width={40} height={40} className="users-details-img" />
                    {user.firstname + " " + user.lastName}
                  </div>
                </td>
                <td>{user.username}</td>
                <td>
                  {user.phone}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.permission}
                </td>
                <td>
                  {user.active ? "פעיל" : "לא פעיל"}
                </td>
                <td>
                  <Link to={`dash/users/${user._id}`}>
                    צפיה
                  </Link>
                  <button className="users-details-delete-button">מחיקה</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewUsers

