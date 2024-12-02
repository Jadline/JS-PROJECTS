
import { Outlet,useNavigation } from "react-router-dom"
import CartOverview from "../Features/Cart/CartOverview"
import Header from "./Header"
import Loader from "./Loader"

function AppLayout(){
    const navigation = useNavigation()
    const isLoading = navigation === 'isLoading'
    return(
        <div className='layout'>
            {isLoading && <Loader/>}
            <Header/>
            <main>
              <Outlet/>
            </main>
            <CartOverview/>
        </div>
    )
}
export default AppLayout