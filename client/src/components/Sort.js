import React from "react";
import { useDispatch } from "react-redux";
import { setActualPage, setMaxPageNumber, setMinPageNumber, sortByName, sortByWeight } from "../actions/actions";
import '../styles/Sort.css'

const Sort = ({ setOrder }) => {
  const dispatch = useDispatch();

  const handleSort = (e) => {
    dispatch(setActualPage(1))
    dispatch(setMinPageNumber(0))
    dispatch(setMaxPageNumber(5))
    setOrder(e.target.value)
    if (e.target.value === 'ascendente' || e.target.value === 'descendente') dispatch(sortByName(e.target.value));
    if (e.target.value === 'mayor' || e.target.value === 'menor') dispatch(sortByWeight(e.target.value));
  }

  return (
    <div className="sort-container">
      <span className="sort-title">Sort by:&nbsp;</span>
      <select defaultValue='DEFAULT' onChange={handleSort}>
        <option value="DEFAULT" disabled>Select sort...</option>
        <option value="ascendente">Name (A-Z)</option>
        <option value="descendente">Name (Z-A)</option>
        <option value="menor">Weight (asc)</option>
        <option value="mayor">Weight (desc)</option>
      </select>
    </div>
  );
};

export default Sort;
