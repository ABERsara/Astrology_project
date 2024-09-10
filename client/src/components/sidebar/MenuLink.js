import React from 'react'
import {NavLink}from "react-router-dom"
const MenuLink = ({item}) => {
  return (
    <NavLink to={item.path} className="menu-link" activeclassname="active">
      {item.icon}
      {item.title}
    </NavLink>
  )
}

export default MenuLink