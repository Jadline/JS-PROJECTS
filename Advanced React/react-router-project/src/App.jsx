
// import { BrowserRouter,Route } from "react-router-dom"
import Search from "./pages/Search"
import CategoryMeal from "./pages/Category"
import Details from "./pages/Details"
import { BrowserRouter, Routes,Route} from "react-router-dom"
import Category from "./pages/Category"
function App() {
  return (
  
    <div>
      
     {/* <Search/> */}
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Search/>}/>
      <Route path='/:category' element ={<Category/>}/>
      <Route path=':category/:recipename' element={<Details/>}/>
       
     

     </Routes>
     </BrowserRouter>
    </div>
   
  )
}

export default App
