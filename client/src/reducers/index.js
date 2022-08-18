const initialState = {
  dogs: [],
  allDogs: [], //es una copia de dogs, sirve para hacer el filtro sobre esta prop y no sobre dogs para q no haya problemas como q filtramos un array ya filtrado
  temperaments: [],
  details: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "GET_BY_NAME":
      return {
        ...state,
        allDogs: action.payload,
      };

    case "GET_BY_ID":
      return {
        ...state,
        details: action.payload,
      };

    case "ORDER_BY_NAME":
      const orderedByName =
        action.payload === "ascendente"
          ? state.dogs.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.dogs.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: orderedByName,
      };

    case "ORDER_BY_WEIGHT":
      const orderedByWeight =
        action.payload === "menor"
          ? state.allDogs.sort((a, b) => {
              if (parseInt(a.weight) > parseInt(b.weight)) return 1;
              if (parseInt(a.weight) < parseInt(b.weight)) return -1;
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (parseInt(a.weight) > parseInt(b.weight)) return -1;
              if (parseInt(a.weight) < parseInt(b.weight)) return 1;
              return 0;
            });
      return {
        ...state,
        allDogs: orderedByWeight,
      };

    case "FILTER_BY_TEMPERAMENT":
      const allDogs = state.allDogs;

      //Selene way (no me da error, con el console.log veo q sí filtra, pero no me renderiza el coso,,,)
      // const filterDog =
      //   action.payload === "all"
      //     ? allDogs
      //     : allDogs.filter((d) => d.temperaments?.includes(action.payload));
      // console.log(filterDog);
      // return {
      //   ...state,
      //   dogs: filterDog
      // }

      const filterDog = allDogs.filter((dog) =>
        dog.temperaments?.includes(action.payload)
      );
      console.log(filterDog);
      return {
        ...state,
        dogs: filterDog,
        // allDogs: filterDog,
      };

    case "FILTER_CREATED": //este tampoco me funca :)♥ lo filtra pero no me renderiza
      const allDogs2 = state.allDogs
      //selene way
      /* const filterCreation =
        action.payload === "created"
          ? state.allDogs.filter((dog) => dog.createdInDB)
          : state.allDogs.filter((dog) => !dog.createdInDB); */
      const filterCreation =
        action.payload === "created"
          ? allDogs2.filter((dog) => dog.createdInDB)
          : allDogs2.filter((dog) => !dog.createdInDB);
      return {
        ...state,
        dogs: action.payload === "all" ? state.allDogs : filterCreation,
        // allDogs: action.payload === "all" ? state.allDogs : filterCreation,
      };

    case "CREATE_DOG":
      return {
        ...state
      }

    default:
      return { ...state };
  }
}

export default rootReducer;
