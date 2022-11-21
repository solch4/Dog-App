import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, getTemperaments, setActualPage, setMaxPageNumber, setMinPageNumber } from "../actions/actions.js";
import Filters from "./Filters.js";
import Sort from './Sort.js'
import Card from "./Card.js";
import Pages from "./Pages.js";
import Nav from "./Nav.js";
import Footer from "./Footer.js";
import Loader from "./Loader.js";
import noDog from '../assets/no-dog.svg'
import '../styles/Home.css'

const Home = () => {
  const dispatch = useDispatch();
  const appTopRef = useRef()
  const dogs = useSelector((state) => state.dogs);
  const [, setOrder] = useState(""); //este state sólo sirve para re-renderizar la pág cuando hacemos un sort

  //paginado
  const actualPage = useSelector(state => state.actualPage)
  const dogsPerPage = 8; //cuantos dogs por page
  const indexOfLastDog = actualPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const actualDogs = dogs.slice(indexOfFirstDog, indexOfLastDog); //recortamos el arreglo con todos los dogs
  //este estado y el q está abajo es para hacer el paginado más tikito y que quede lindo, uso ambos para hacer un slice y renderizar sólo ese pedazo
  const minPageNumber = useSelector(state => state.minPageNumber)
  const maxPageNumber = useSelector(state => state.maxPageNumber)
  const pages = (pageNumber) => {
    dispatch(setActualPage(pageNumber))
    appTopRef.current?.scrollIntoView({ behavior: 'smooth' })
    if(pageNumber >= maxPageNumber) {
      dispatch(setMinPageNumber(minPageNumber+4))
      dispatch(setMaxPageNumber(maxPageNumber+4))
    } else if(pageNumber <= minPageNumber+1 && pageNumber !== 1) {
      dispatch(setMinPageNumber(minPageNumber-4))
      dispatch(setMaxPageNumber(maxPageNumber-4))
    }
  };

  useEffect(() => {
    !dogs.length && dispatch(getDogs())
    dispatch(getTemperaments())
  }, [dispatch, dogs, actualPage]);
  
  const handleRefresh = () => {
    dispatch(setActualPage(1))
    dispatch(setMinPageNumber(0))
    dispatch(setMaxPageNumber(5))
    dispatch(getDogs());
  }

  return (
    <div ref={appTopRef} className="App">
      <Nav />
      <div className="home-container">
        <div className="sort-filter-container">
          <div className="sort-filter">
            <Filters />
            <Sort setOrder={setOrder} />
          </div>
          <button className="home-refresh-btn" onClick={handleRefresh}>Refresh</button>
        </div>

        <div className="create-dog">
          Create your original dog breed&nbsp;
          <Link to="/dogs">here</Link>!
        </div>

        {/* dog cards */}
        <div className="card-container">
          {actualDogs.length && Array.isArray(actualDogs) ? (
            actualDogs.map((dog) => (
              <Card
                id={dog.id}
                key={dog.id}
                name={dog.name}
                image={dog.image}
                weight={dog.weight}
                temperaments={dog.temperaments}
              />
            ))
          ) : (
            !dogs.length 
            ? <Loader /> 
            : <div className="home-dog-not-found"><img width={150} src={noDog} alt="" /><h3>Dog not found :(</h3></div>
          )}
        </div>
        
        <Pages
          dogsPerPage={dogsPerPage}
          pages={pages}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
