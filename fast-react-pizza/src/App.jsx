import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './UI/Home'
import Menu,{loader as menuLoader} from './Features/Menu/Menu'
import Cart from "./Features/Cart/Cart"
import Order,{loader as orderLoader} from './Features/Order/Order'
import CreateOrder from './Features/Order/CreateOrder'
import AppLayout from "./UI/AppLayout"
import NotFound from "./UI/Error"


const router = createBrowserRouter([
  {
    element : <AppLayout/>,
    errorElement : <NotFound/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/menu',
        element : <Menu/>,
        loader : menuLoader,
        errorElement : <NotFound/>
      },
      {
        path : '/cart',
        element: <Cart/>
      },
      {
        path : '/order/:id',
        element : <Order/>,
        loader : orderLoader,
        errorElement : <NotFound/>
      },
      {
        path : '/order/new',
        element : <CreateOrder/>
      },

    ]
  }
])

function App() {
  

  return (
   <RouterProvider router={router}/>
  )
}

export default App
