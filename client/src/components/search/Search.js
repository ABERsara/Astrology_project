import React from 'react'
import "./search.css"
import { MdOutlineSearch } from "react-icons/md";
const Search = ({placeholder}) => {
  return (
    <div className="search-button">
    <MdOutlineSearch />
    <input type="text" placeholder={placeholder}
     className="search-input" />
  </div>
)}

export default Search