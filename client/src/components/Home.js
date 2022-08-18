import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, sortByName, sortByWeight, filterByTemperament, filterCreated, getTemperaments } from "../actions/actions.js";
import SearchBar from "./SearchBar.js";
import Filters from "./Filters.js";
import Card from "./Card.js";
import Pages from "./Pages.js";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const temperamentsState = useSelector(state => state.temperaments)
  const [order, setOrder] = useState(""); //este state sólo sirve para re-renderizar la pág cuando hacemos un sort

  //paginado
  const [actualPage, setActualPage] = useState(1); //arrancamos desde la page 1
  const [dogsPerPage, setDogsPerPage] = useState(8); //cuantos dogs por page
  const indexOfLastDog = actualPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const actualDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog); //recortamos el arreglo con todos los dogs

  const pages = (pageNumber) => {
    setActualPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments())
  }, [dispatch]);

  const handleFilterCreated = (e) =>{
    e.preventDefault();
    dispatch(filterCreated(e.target.value))
  }

  const handleFilterTemperaments = (e) =>{
    e.preventDefault();
    dispatch(filterByTemperament(e.target.value))
  }

  const handleReset = (e) => {
    e.preventDefault();
    dispatch(getDogs())
  }

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
    <div className="containerHome">
      <h1>Título</h1>
      <Link to="/">
        <button>Volver</button>
      </Link>

      <SearchBar setActualPage={setActualPage} />

      {/* filters */}
      {/* <Filters actualPage={actualPage} setActualPage={setActualPage} /> */}
      <div className="filter-container">
        <span>Filter by: </span>
        <select onChange={e => handleFilterTemperaments(e)}>
          <option key={0} value="all">All temperaments</option>
          {temperamentsState.length ? temperamentsState.map((t) => (
            <option key={t.id} value={t.name}>{t.name}</option>
            )) : null}
        </select>

        <select onChange={e => handleFilterCreated(e)}>
          <option value="all">All dogs</option>
          <option value="created">Created</option>
          <option value="api">API</option>
        </select>
      </div>
      {/* sort */}
      <div>
        {/* sort by name */}
        <span>
          Sort by:&nbsp;
        </span>
        <select onChange={handleSortByName}>
          <option value="ascendente">Name (A-Z)</option>
          <option value="descendente">Name (Z-A)</option>
        </select>

        {/* sort by weight */}
        <select onChange={handleSortByWeight}>
          <option value="mayor">Weight (More heavy)</option>
          <option value="menor">Weight (Less heavy)</option>
        </select>
      </div>

      <Link to="/dogs">
        <button>Create dog</button>
      </Link>

      {/* paginado */}
      <div className="containerPages">
        <Pages
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          pages={pages}
        />
      </div>

      {/* dog section */}
      <div className="mostrarPerros">
        {actualDogs.length ? (
          actualDogs.map((dog) => {
            return (
              <div key={dog.id}>
                <Link to={"/dogs/" + dog.id}>
                  <Card
                    key={dog.id}
                    name={dog.name}
                    image={dog.image}
                    temperaments={
                      dog.temperaments
                        ? dog.temperaments
                        : dog.temperaments &&
                          dog.temperaments.map((e) => {
                            console.log(dog.temperaments);
                            return `${e.name}, `
                          })
                    }
                    weight={dog.weight}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <h4>Loading...</h4>
        )}
      </div>
    </div>
  );
};

export default Home;
