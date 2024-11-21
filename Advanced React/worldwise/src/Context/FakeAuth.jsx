import { createContext,useContext ,useReducer,useEffect} from "react"
import { useNavigate } from "react-router-dom"


const AuthContext = createContext()
function reducer(state,action){
    switch (action.type){
        case 'login':
            return{
                ...state,
                user : action.payload,
                isAuthenticated : true
            }
        case 'logout':
            return {
                ...state,
                user : null,
                isAuthenticated : false
            }
        default : 
            throw new Error('Unknown action type')
    }

}
const initialState = {
    user : null,
    isAuthenticated : false
}
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };

function AuthProvider({children}){
    // const navigate = useNavigate()
   

    const[{user,isAuthenticated},dispatch] = useReducer(reducer,initialState)

    function login(email,password){
        if(email === FAKE_USER.email && password === FAKE_USER.password){
            dispatch({type : 'login',payload : FAKE_USER})   
        }
        
       

    }
    function logout(){
        dispatch({type : 'logout'})

    }

    return(
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
        }}>
            {children}
        </AuthContext.Provider>
    )

}
function useFakeAuth(){
    const context = useContext(AuthContext)
    if(context === undefined) throw new Error('You might be using the AuthContext outside the provider')
    return context
}

export {useFakeAuth,AuthProvider}