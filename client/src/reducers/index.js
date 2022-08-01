const initialState = {
  allDogs: [],
  temperaments: [],
  details: [],
  dogs: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        allDogs: action.payload,
        dogs: action.payload,
      };

    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: action.payload,
      };

    case "GET_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
      };

    case "GET_BY_ID":
      return {
        ...state,
        details: action.payload,
      };

    case "ORDER_BY_NAME":
      const orderedByName =
        action.payload === "ascendente"
          ? state.allDogs.sort((a, b) => {
              if (a.name > b.name) return 1;
              if (a.name < b.name) return -1;
              return 0;
            })
          : state.allDogs.sort((a, b) => {
              if (a.name > b.name) return -1;
              if (a.name < b.name) return 1;
              return 0;
            });
      return {
        ...state,
        allDogs: orderedByName,
      };

    case "ORDER_BY_WEIGHT":
      const orderedByWeight =
        action.payload === "mayor"
          ? state.allDogs.sort((a, b) => {
              if (typeof action.payload.weight === "string") {
                if (a.weight > b.weight) return 1;
                if (a.weight < b.weight) return -1;
                return 0;
              } else {
                if (parseInt(a.weight) > parseInt(b.weight)) return 1;
                if (parseInt(a.weight) < parseInt(b.weight)) return -1;
                return 0;
              }
            })
          : state.allDogs.sort((a, b) => {
              if (typeof action.payload.weight === "string") {
                if (a.weight > b.weight) return -1;
                if (a.weight < b.weight) return 1;
                return 0;
              } else {
                if (parseInt(a.weight) > parseInt(b.weight)) return 1;
                if (parseInt(a.weight) < parseInt(b.weight)) return -1;
                return 0;
              }
            });
      return {
        ...state,
        allDogs: orderedByWeight,
      };

    default:
      return {...state};
  }
}

export default rootReducer;
