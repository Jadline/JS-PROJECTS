import { useFakeAuth } from "../Context/FakeAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function ProtectedRoute({children}){
    const{isAuthenticated} = useFakeAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if(!isAuthenticated) navigate('/')
    },[isAuthenticated,navigate])
    return children

}
export default ProtectedRoute