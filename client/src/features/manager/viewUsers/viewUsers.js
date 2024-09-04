import "./view-users.css"
import { useGetAllUsersQuery } from "../../user/userApiSlice"
import Search from "../../../components/search/Search"
import { Link,useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { useState } from 'react';
import { format } from 'date-fns';

const ViewUsers = () => {

const {data: usersObject,isError,error,isLoading,isSuccess}= useGetAllUsersQuery()
const navigate=useNavigate()

if (isLoading) return <h1>Loading ...</h1>
  if (isError) return <h1>{JSON.stringify(error)}</h1>

  return (

    <div className="users-list">
      <div className="users-list-search">
        <Search placeholder={"חיפוש לפי שם משתמש"} />
       
        <table className="users-table" >
          
          <thead>
            <tr>
              <td>שם מלא</td>
              <td>שם משתמש</td>
              <td>טלפון</td>
              <td>אימייל</td>
              <td>הרשאה</td>
              <td>פעיל?</td>
              <td >נרשם לאתר בתאריך?</td>
              <td>פעולות</td>
            </tr>
          </thead>
          <tbody>
            {usersObject.data?.map(user => (
              <tr key={user._id}>
                <td>
                  <div className="users-details">
                    <img src={user.imageUrl || "noavatar.png"} alt="" width={40} height={40} className="users-details-img" />
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
                <td>{format(user.createdAt.slice(0,10), 'dd-MM-yyyy')}</td>
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

