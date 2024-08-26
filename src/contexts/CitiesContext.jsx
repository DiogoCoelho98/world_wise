import { createContext, useEffect, useContext,useReducer } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true, error: null };
  
    case "cities/loaded":
      return { ...state, isLoading: false, error: null, cities: action.payload };

    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
      
    case "city/created":
      return { ...state, cities: [...state.cities, action.payload], currentCity: action.payload, isLoading: false };

    case "city/deleted":
      return { ...state, cities: state.cities.filter(city => action.payload !== city.id), currentCity: {}, isLoading: false };

    case "error":
      return { ...state, isLoading: false, error: action.payload };
    
    default: 
      throw new Error("Action type not available");
  }
}

const initialValue = {
  cities: [],
  isLoading: false,
  error: null,
  currentCity: {}
};

function CitiesProvider({ children }) {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(reducer, initialValue);

  /* const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState({}); */

  useEffect(() => {
    async function getData() {
      dispatch({ type: "loading" });
      
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("Error fetching data");

        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "error", payload: err.message });
      }
    }
    getData();
  }, []);

  async function getCity(id) {
    if (id === currentCity.id) return; 

    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("Error fetching data");
        
      const data = await res.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" }
      });
      if (!res.ok) throw new Error("Error creating city");

      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error deleting city");

      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({ type: "error", payload: err.message });
    }
  }

  return(
        <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity, createCity, deleteCity, error}}>{children}</CitiesContext.Provider>    
  )
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside of </<CitiesProvider/>!");
    return context;
}

export { CitiesProvider, useCities}