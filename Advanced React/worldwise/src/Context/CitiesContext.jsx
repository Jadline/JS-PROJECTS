import { createContext,useState,useEffect,useContext} from "react";
import {useReducer,useCallback} from 'react'
const citiesContext = createContext()
const BASE_URL = "http://localhost:8000"

function reducer(state,action){
    //  console.log('Action type:', action.type);
    switch (action.type){
        case 'loading': 
            return {
                ...state,
                isLoading:true
            }
        case 'cities/loaded':
            return {
                ...state,isLoading : false,cities : action.payload
            }
        case 'city/created':
            return {
                ...state,isLoading : false, 
                cities : [...state.cities,action.payload],
                currentCity : action.payload
                
            }
        
        case 'rejected':
            return {
                ...state,isLoading : false,
                error : action.payload
            }
        case 'city/loaded':
            return{
                ...state,
                isLoading : false,
                currentCity : action.payload
            }
        case 'city/deleted':
            return {
                ...state,
                isLoading : false,
                cities : state.cities.filter(city => city.id !== action.payload),
                currentCity : {}
            }
        default :
            throw new Error('Unknown action type')
    }

}
const initialState = {
    cities : [],
    isLoading : false,
    currentCity : {},
    error : ''

}

function CitiesProvider({children}){
    const [{cities,isLoading,currentCity},dispatch] = useReducer(reducer,initialState)
    // const[cities,setCities] = useState([])
    // const[isLoading,setIsLoading] = useState(false)
    // const[currentCity,setCurrentcity] = useState({})
    
    console.log(cities)
    useEffect(() => {
        async function FetchCities(){
            dispatch({type : 'loading'})
        try{
            
            const res = await fetch(`${BASE_URL}/cities`)
            const data = await res.json()
            dispatch({type : 'cities/loaded',payload : data})
        }
        catch{
            dispatch ({
                type: 'rejected',
                payload : 'There was an error fetching data'
            })
        }
    }
        FetchCities()

  },[]);

    const getCity = useCallback(async function getCity(id){
        if(currentCity.id === Number(id)) return;

        dispatch({type : 'loading'})
        try{
            
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            // console.log(data)
            // setCurrentcity(data)
            dispatch({type:'city/loaded',payload : data})
        }
        catch{
            dispatch({
                type : 'rejected',
                payload : 'There was an error getting city'
            })
        }
        
    },[currentCity.id])
      
  async function createCity(newCity){
    dispatch({type : 'loading'})
    try{
        
        const res = await fetch(`${BASE_URL}/cities/`,{
            method : 'POST',
            body : JSON.stringify(newCity),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const data = await res.json()
        dispatch ({
            type : 'city/created',
            payload : data
        })
    }
    catch{
        dispatch({
            type : 'rejected',
            payload : 'There was an error creating new City'
        })
    }
    
}
async function DeleteCity(id){
    dispatch({
        type : 'loading'
    })
    try{
        
        const res = await fetch(`${BASE_URL}/cities/${id}`,{
            method : 'DELETE',
        })
       
        // setCities(curcities => {
        //     return curcities.filter(city => city.id !== id)
        // })
        dispatch({
            type : 'city/deleted',
            payload : id
        })
    }
    catch{
        dispatch({
            type : 'rejected',
            payload : 'There was an error deleting city'

        })
    }
    
}

  return <citiesContext.Provider value={{
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    DeleteCity
  }}>
    {children}
  </citiesContext.Provider>

}

function useCities(){
    const context = useContext(citiesContext)
    if(context === undefined) throw new Error('cities context was used outside citiesProvider')
    return context
}
export {CitiesProvider,useCities}