import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDogs, sortByName, sortByWeight } from "../actions/actions.js";
import SearchBar from "./SearchBar.js";
import Filters from "./Filters.js";
import Card from "./Card.js";
import Pages from "./Pages.js";

const Home = () => {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.allDogs);
  const [order, setOrder] = useState("");

  //paginado
  const [actualPage, setActualPage] = useState(1); //arrancamos desde la page 1
  const [dogsPerPage, setDogsPerPage] = useState(8); //cuantos dogs por page
  const lastDog = actualPage * dogsPerPage;
  const firstDog = lastDog - dogsPerPage;
  const actualDogs = allDogs.slice(firstDog, lastDog); //recortamos el arreglo con todos los dogs

  const pages = (pageNumber) => {
    setActualPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

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

      <div>
        <SearchBar setActualPage={setActualPage} />
      </div>

      <div>
        <Filters />

        {/* sort by name */}
        <select onChange={handleSortByName}>
          <option value="ascendente">A-Z</option>
          <option value="descendente">Z-A</option>
        </select>

        {/* sort by weight */}
        <select onChange={handleSortByWeight}>
          <option value="mayor">Más pesado</option>
          <option value="menor">Menos pesado</option>
        </select>
      </div>

      <Link to="/dog">
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
        {actualDogs ? (
          actualDogs.map((dog) => {
            return (
              <div key={dog.id}>
                <Link to={"/dogs/" + dog.id}>
                  <Card
                    key={dog.id}
                    name={dog.name}
                    image={dog.image}
                    /* temperament={
                      dog.temperaments
                        ? dog.temperaments
                        : dog.temperaments &&
                          dog.temperaments.map((e) => `${e.name}, `)
                    } */
                    weight={dog.weight}
                  />
                </Link>
              </div>
            );
          })
        ) : (
          <p>loading...</p>
        )}
      </div>
    </div>
  );
};

export default Home;
