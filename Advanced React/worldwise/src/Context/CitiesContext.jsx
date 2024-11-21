import { createContext,useState,useEffect,useContext} from "react";

const citiesContext = createContext()
const BASE_URL = "http://localhost:8000"

function CitiesProvider({children}){
    const[cities,setCities] = useState([])
    const[isLoading,setIsLoading] = useState(false)
    const[currentCity,setCurrentcity] = useState({})
    console.log(cities)
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

  },[]);

    async function getCity(id){
        try{
            setIsLoading(true)
            const res = await fetch(`${BASE_URL}/cities/${id}`)
            const data = await res.json()
            console.log(data)
            setCurrentcity(data)
        }
        catch{
            alert('There was an error fetching data')
        }
        finally {
            setIsLoading(false)
        }
    }
      
  async function createCity(newCity){
    try{
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities/`,{
            method : 'POST',
            body : JSON.stringify(newCity),
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const data = await res.json()
        setCities(curcities => [...curcities,data])
    }
    catch{
        alert('There was an error fetching data')
    }
    finally {
        setIsLoading(false)
    }
}
async function DeleteCity(id){
    try{
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities/${id}`,{
            method : 'DELETE',
        })
       
        setCities(curcities => {
            return curcities.filter(city => city.id !== id)
        })
    }
    catch{
        alert('There was an error fetching data')
    }
    finally {
        setIsLoading(false)
    }
}

  return <citiesContext.Provider value={{
    setCities,
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