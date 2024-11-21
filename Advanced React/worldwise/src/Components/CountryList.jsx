import Spinner from "./Spinner"
import Message from "./Message"
import styles from "./CountryList.module.css"
import CountryItem from "./CountryItem"
import { useCities } from "../Context/CitiesContext"
function CountryList(){
    const{cities,isLoading} = useCities()
    const countries = cities.reduce((arr,city) => {
        if(!arr.map(el => el.city).includes(city.country))
            return [...arr, {country : city.country,emoji : city.emoji}]
        else 
            return arr
    
    },[]

    )



    if(isLoading) return <Spinner/>
    if(!countries.length) return <Message message="Add your first city by clicking on a city on the map"/>
    return(
    <div>
        <ul className={styles.CountryList}>
            {countries.map((country) => <CountryItem country={country} key={country.id}/>)}
        </ul>

    </div>
    )

}
export default CountryList