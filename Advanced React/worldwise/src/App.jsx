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

const BASE_URL = "http://localhost:8000"
function App() {
  const[cities,setCities] = useState([])
  const[isLoading,setIsLoading] = useState(false)
  useEffect(() => {
    async function FetchCities(){
      try{
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      }
      catch{
        alert('There was an error fetching data')
      }
      finally {
        setIsLoading(false)
      }

    }
    FetchCities()

  },[])

  return (   
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path="product" element={<Product/>}/>
        <Route path="pricing" element={<Pricing/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="app" element={<AppLayout/>}>
          <Route index element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading}/>}/>
          <Route path="cities/:id" element={<City/>}/>
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading}/>}/>
          <Route path="form" element={<Form/>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
      </BrowserRouter>
 
  )
}

export default App
