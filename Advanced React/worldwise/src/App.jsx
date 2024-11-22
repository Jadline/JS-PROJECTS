import { BrowserRouter, Routes ,Route} from "react-router-dom"
import {lazy} from 'react'

import CityList from "./Components/CityList"
import CountryList from "./Components/CountryList"
import {useState,useEffect} from "react"
import Form from "./Components/Form"
import City from "./Components/City"
import { Navigate } from "react-router-dom"
import { CitiesProvider } from "./Context/CitiesContext"
import { AuthProvider } from "./Context/FakeAuth"
import ProtectedRoute from "./pages/ProtectedRoute"
import { Suspense } from "react"
import SpinnerFullPage from './Components/SpinnerFullPage'
// import Pricing from "./pages/Pricing"
// import Product from "./pages/product"
// import HomePage from "./pages/Homepage"
// import PageNotFound from "./pages/PageNotFound"
// import Login from "./pages/Login"
// import  AppLayout from "./pages/AppLayout"

const HomePage = lazy(() => import('./pages/Homepage'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Product = lazy(() => import('./pages/product'))
const Login = lazy(() => import('./pages/Login'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))


// dist/assets/index-f1fe32e5.css   30.55 kB │ gzip:   5.08 kB
// dist/assets/index-187541a2.js   507.45 kB │ gzip: 148.28 kB




// 
function App() {
  

  return ( 
    <AuthProvider>
    <CitiesProvider>  
      <BrowserRouter>
     <Suspense fallback={<SpinnerFullPage/>}>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="app" element={
          <ProtectedRoute>
            <AppLayout/>
          </ProtectedRoute>
          }>
          <Route index element={<Navigate replace to="cities"/>}/>
          <Route path="cities" element={<CityList/>}/>
          <Route path="cities/:id" element={<City/>}/>
          <Route path="countries" element={<CountryList/>}/>
          <Route path="form" element={<Form/>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      </Suspense>
      
      </BrowserRouter>
    </CitiesProvider>
    </AuthProvider>
   
 
  )
}

export default App
