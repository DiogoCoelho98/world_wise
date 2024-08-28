import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CitiesProvider } from "./contexts/CitiesContext.jsx";
import { AuthProvider } from ".//contexts/FakeAuthContext.jsx";

import CityList from "./components/CityList.jsx";
import CountriesList from "./components/CountriesList.jsx";
import City from "./components/City.jsx";
import Form from "./components/Form.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import SpinnerFullPage from "./components/SpinnerFullPage.jsx";

// Lazy loading (splitting the bundle)
const Home = lazy(() => import("./pages/Home.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Product = lazy(() => import("./pages/Product.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const AppLayout = lazy(() => import("./pages/AppLayout.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {

  return (
    <AuthProvider>

      <CitiesProvider>

        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage/>}>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/pricing" element={<Pricing/>}></Route>
              <Route path="/product" element={<Product/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              
              <Route path="/app" element={
                  <ProtectedRoute>
                    <AppLayout/>
                  </ProtectedRoute>
                }
              >
                  <Route index element={<Navigate to="cities" replace/>}/>
                  <Route path="cities" element={<CityList/>}/>
                  <Route path="cities/:id" element={<City />}/>
                  <Route path="countries" element={<CountriesList/>}/>
                  <Route path="form" element={<Form/>}/>
                </Route>
              
              <Route path="*" element={<NotFound/>}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        
      </CitiesProvider>

    </AuthProvider>
  )
}