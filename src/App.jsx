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
import { CitiesProvider } from "./contexts/CitiesContext.jsx";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export default function App() {

  return (
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/pricing" element={<Pricing/>}></Route>
            <Route path="/product" element={<Product/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/app" element={<AppLayout/>}>
              <Route index element={<Navigate to="cities" replace/>}/>
              <Route path="cities" element={<CityList/>}/>
              <Route path="cities/:id" element={<City />}/>
              <Route path="countries" element={<CountriesList/>}/>
              <Route path="form" element={<Form/>}/>
            </Route>
            <Route path="*" element={<NotFound/>}></Route>
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
  )
}