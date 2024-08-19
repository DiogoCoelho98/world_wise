import Home from "./pages/Home.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import Product from "./pages/Product.jsx"
import Pricing from "./pages/Pricing.jsx";
import NotFound from "./pages/NotFound.jsx"
import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountriesList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {useState, useEffect} from "react";


const BASE_URL = "http://localhost:8000";

export default function App() {
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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/pricing" element={<Pricing/>}></Route>
          <Route path="/product" element={<Product/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/app" element={<AppLayout/>}>
            <Route index element={<Navigate to="cities" replace/>}/>
            <Route path="cities" element={<CityList cities={cities} loading={loading}/>}/>
            <Route path="cities/:id" element={<City />}/>
            <Route path="countries" element={<CountriesList cities={cities} loading={loading}/>}/>
            <Route path="form" element={<Form/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}