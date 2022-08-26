import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByTemperament, filterCreated } from "../actions/actions";
import '../styles/Filters.css'

function Filters({ setActualPage }) {
  const temperamentsState = useSelector(state => state.temperaments)

  const dispatch = useDispatch();
  
  const handleFilterCreated = (e) =>{
    setActualPage(1)
    dispatch(filterCreated(e.target.value))
  }

  const handleFilterTemperaments = (e) =>{
    setActualPage(1)
    dispatch(filterByTemperament(e.target.value))
  }

  return (
    <div className="filter-container">
    <span className="filter-title">Filter by: </span>
    <select onChange={(e) => handleFilterTemperaments(e)}>
      <option key={0} value="all">
        All temperaments
      </option>
      {temperamentsState.length
        ? temperamentsState.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))
        : null}
    </select>

    <select onChange={(e) => handleFilterCreated(e)}>
      <option value="all">All dogs</option>
      <option value="created">Created</option>
      <option value="api">API</option>
    </select>
  </div>
);
}

export default Filters;