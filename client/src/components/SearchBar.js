import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from '../actions/actions.js'
import '../styles/SearchBar.css'

const SearchBar = ({setActualPage}) => {
  const dispatch = useDispatch()
  const [nameInput, setNameInput] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    setNameInput(e.target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    dispatch(getByName(nameInput))
    setActualPage(1)
  }

  return (
    <form className="search-bar">
      <input type='text' onChange={e => handleChange(e)} placeholder="Search dog..." />
      <button type="submit" onClick={e => handleSearch(e)}>Search</button>
    </form>
  )
};

export default SearchBar