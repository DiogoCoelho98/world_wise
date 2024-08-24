import { createContext, useState, useEffect, useContext } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

 function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
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
        setLoading(false);
      }
    }
    getData();
  }, []);

  return(
        <CitiesContext.Provider value={{cities, loading}}>{children}</CitiesContext.Provider>    
  )
}

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error("CitiesContext was used outside of </<CitiesProvider/>!");
    return context;
}

export { CitiesProvider, useCities }