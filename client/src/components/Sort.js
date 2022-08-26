import React from "react";
import { useDispatch } from "react-redux";
import { sortByName, sortByWeight } from "../actions/actions";
import '../styles/Sort.css'

const Sort = ({ setActualPage, setOrder }) => {
  const dispatch = useDispatch();

  const handleSort = (e) => {
    if (e.target.value === 'ascendente' || e.target.value === 'descendente') {
      dispatch(sortByName(e.target.value));
      setActualPage(1);
      setOrder(`sort by ${e.target.value}`);  
    }
    else if (e.target.value === 'mayor' || e.target.value === 'menor') {
      dispatch(sortByWeight(e.target.value));
      setActualPage(1);
      setOrder(`sort by ${e.target.value}`);  
    }
  }

  return (
    <div className="sort-container">
      <span className="sort-title">Sort by:&nbsp;</span>
      <select onChange={handleSort}>
        <option selected disabled>-select sort-</option>
        <option value="ascendente">Name (A-Z)</option>
        <option value="descendente">Name (Z-A)</option>
        <option value="menor">Weight (asc)</option>
        <option value="mayor">Weight (desc)</option>
      </select>
    </div>
  );
};

export default Sort;
