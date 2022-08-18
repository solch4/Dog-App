import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, filterByTemperament, filterCreated, getDogs } from "../actions/actions";

function Filters({ actualPage, setActualPage }) {

  const temp = useSelector((state) => state.temperaments);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);
  
  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleFilterCreated (e) {
    setActualPage(1)
    dispatch(filterCreated(e.target.value))
  }

  function handleFilterTemperament(e) {
    setActualPage(1);
    dispatch(filterByTemperament(e.target.value));
  }  

  return (
    <div className="filters">
      <span>Filter by: </span>

      {/* <select onChange={e => handleFilterTemperament(e)}>
        <option key={0} value="all">All temperaments</option>
        {temp?.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
      </select> */}
      <select onChange={e => handleFilterTemperament(e)}>
        <option key={0} value="all">All temperaments</option>
        {temp?.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
      </select>

      <select onChange={e => handleFilterCreated(e)}>
        <option value="all">All dogs</option> {/* tiene q coincidir con lo q pusimos en el reducer */}
        <option value="api">API</option>
        <option value="created">Created</option>
      </select>

    </div>
  );
}

export default Filters;