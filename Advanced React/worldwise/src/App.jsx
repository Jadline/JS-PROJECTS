import { BrowserRouter, Routes ,Route} from "react-router-dom"
import Pricing from "./pages/Pricing"
import Product from "./pages/product"
// import PricingPage from "./pages/pricingPage"
import HomePage from "./pages/Homepage"
import PageNotFound from "./pages/PageNotFound"
import Login from "./pages/Login"
import  AppLayout from "./pages/AppLayout"
import CityList from "./Components/CityList"
import CountryList from "./Components/CountryList"
import {useState,useEffect} from "react"
import Form from "./Components/Form"
import City from "./Components/City"
import { Navigate } from "react-router-dom"
import { CitiesProvider } from "./Context/CitiesContext"
import { AuthProvider } from "./Context/FakeAuth"

// 
function App() {
  

  return ( 
    <AuthProvider>
    <CitiesProvider>  
      <BrowserRouter>
     
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="app" element={<AppLayout/>}>
          <Route index element={<Navigate replace to="cities"/>}/>
          <Route path="cities" element={<CityList/>}/>
          <Route path="cities/:id" element={<City/>}/>
          <Route path="countries" element={<CountryList/>}/>
          <Route path="form" element={<Form/>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      
      </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
   
 
  )
}

export default App
