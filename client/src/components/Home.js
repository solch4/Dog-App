import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getTemperaments } from "../actions/actions.js";
import Filters from "./Filters.js";
import Sort from './Sort.js'
import Card from "./Card.js";
import Pages from "./Pages.js";
import Nav from "./Nav.js";
import '../styles/Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const dogs = useSelector((state) => state.dogs);
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
    } else if(pageNumber <= minPageNumber+1 && pageNumber !== 1) {
      setMinPageNumber(minPageNumber-4)
      setMaxPageNumber(maxPageNumber-4)
    }
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments())
  }, [dispatch]);

  return (
    <div className="App">
      <Nav setMinPageNumber={setMinPageNumber} setMaxPageNumber={setMaxPageNumber} setActualPage={setActualPage} />
      <div className="home-container">
        <div className="sort-filter-container">
          <Sort setMinPageNumber={setMinPageNumber} setMaxPageNumber={setMaxPageNumber} setActualPage={setActualPage} setOrder={setOrder} />
          <Filters setMinPageNumber={setMinPageNumber} setMaxPageNumber={setMaxPageNumber} setActualPage={setActualPage} />
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
