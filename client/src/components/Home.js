import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, sortByName, sortByWeight, filterByTemperament, filterCreated, getTemperaments } from "../actions/actions.js";
// import Filters from "./Filters.js";
import Card from "./Card.js";
import Pages from "./Pages.js";
import Nav from "./Nav.js";
import '../styles/Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
  const temperamentsState = useSelector(state => state.temperaments)
  const [order, setOrder] = useState(""); //este state sólo sirve para re-renderizar la pág cuando hacemos un sort

  //paginado
  const [actualPage, setActualPage] = useState(1); //arrancamos desde la page 1
  const [dogsPerPage, setDogsPerPage] = useState(8); //cuantos dogs por page
  const indexOfLastDog = actualPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const actualDogs = dogs.slice(indexOfFirstDog, indexOfLastDog); //recortamos el arreglo con todos los dogs
  const [minPageNumber, setMinPageNumber] = useState(0) //este estado y el q está abajo es para hacer el paginado más tikito y que quede lindo, uso ambos para hacer un slice y renderizar sólo ese pedazo
  const [maxPageNumber, setMaxPageNumber] = useState(5)
  const pages = (pageNumber) => {
    setActualPage(pageNumber);
    if(pageNumber >= maxPageNumber) {
      setMinPageNumber(minPageNumber+4)
      setMaxPageNumber(maxPageNumber+4)
    } else if(pageNumber <= minPageNumber) {
      setMinPageNumber(minPageNumber-4)
      setMaxPageNumber(maxPageNumber-4)
    }
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments())
  }, [dispatch]);

  const handleFilterCreated = (e) =>{
    setActualPage(1)
    dispatch(filterCreated(e.target.value))
  }

  const handleFilterTemperaments = (e) =>{
    setActualPage(1)
    dispatch(filterByTemperament(e.target.value))
  }

  /* const handleReset = (e) => {
    e.preventDefault();
    dispatch(getDogs())
  } */

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setActualPage(1);
    setOrder(`ordenado de forma ${e.target.value}`);
  }

  function handleSortByWeight(e) {
    e.preventDefault();
    dispatch(sortByWeight(e.target.value));
    setActualPage(1);
    setOrder(`ordenado de forma ${e.target.value}`);
  }

  return (
    <div className="App">
      <Nav setActualPage={setActualPage} />
      <div className="home-container">
        <div className="sort-filter-container">
          {/* sort */}
          <div className="sort-container">
            {/* sort by name */}
            <span className="sort-filter-title">Sort by:&nbsp;</span>
            <select onChange={handleSortByName}>
              <option value="ascendente">Name (A-Z)</option>
              <option value="descendente">Name (Z-A)</option>
            </select>
            {/* sort by weight */}
            <select onChange={handleSortByWeight}>
              <option value="mayor">Weight (asc)</option>
              <option value="menor">Weight (desc)</option>
            </select>
          </div>

          {/* filters */}
          {/* <Filters actualPage={actualPage} setActualPage={setActualPage} /> */}
          <div className="filter-container">
            <span className="sort-filter-title">Filter by: </span>
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
        </div>

        <div className="create-dog">
          Create your original dog breed&nbsp;
          <Link to="/dogs">here</Link>!
        </div>

        {/* dog cards */}
        <div className="card-container">
          {actualDogs.length && Array.isArray(actualDogs) ? (
            actualDogs.map((dog) => {
              return (
                <Card
                  id={dog.id}
                  key={dog.id}
                  name={dog.name}
                  image={dog.image}
                  weight={dog.weight}
                  temperaments={dog.temperaments}
                />
              );
            })
          ) : (
            <h4>{!dogs.length ? 'Loading...' : dogs}</h4>
          )}
        </div>
        
        <Pages
          actualPage={actualPage}
          minPageNumber={minPageNumber}
          maxPageNumber={maxPageNumber}
          dogsPerPage={dogsPerPage}
          dogs={Array.isArray(dogs) ? dogs.length : 1}
          pages={pages}
        />

      </div>
    </div>
  );
};

export default Home;
