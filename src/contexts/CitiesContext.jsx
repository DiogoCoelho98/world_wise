import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

 function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("Error fetching data");

        const data = await res.json();
        if(!data || data.length === 0) throw new Error("No cities available!");

        setCities(data);
      } catch(err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, []);

  async function getCity(id) {
    try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if (!res.ok) throw new Error("Error fetching data");
        
        const data = await res.json();
        if (!data || data.length === 0) throw new Error("No city available, choose another one");

        setCurrentCity(data)
     } catch(err) {
        setError(err.message)
     } finally {
        setIsLoading(false)
     }
    }

    async function createCity(newCity) {
      try {
          setIsLoading(true);
          setError(null);

          // Adding a city to the fake API
          const res = await fetch(`${BASE_URL}/cities`, {method: "POST", body: JSON.stringify(newCity), headers: {"Content-Type": "application/json"}});
          if (!res.ok) throw new Error("Error fetching data");
          
          const data = await res.json();
          if (!data || data.length === 0) throw new Error("No city available, choose another one");

          setCities(cities => [...cities, data]);
       } catch(err) {
          setError(err.message)
       } finally {
          setIsLoading(false)
       }
      }

  return(
        <CitiesContext.Provider value={{cities, isLoading, currentCity, getCity, createCity}}>{children}</CitiesContext.Provider>    
  )
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside of </<CitiesProvider/>!");
    return context;
}

export { CitiesProvider, useCities}