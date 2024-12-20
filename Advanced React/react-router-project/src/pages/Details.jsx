import styles from "./Details.module.css"
import MealInfo from "./MealInfo"
import { useEffect,useState } from "react"
import {useParams} from 'react-router-dom'
const mealinfo = [
    {
        "idMeal": "52944",
        "strMeal": "Escovitch Fish",
        "strDrinkAlternate": null,
        "strCategory": "Seafood",
        "strArea": "Jamaican",
        "strInstructions": "Rinse fish; rub with lemon or lime, seasoned with salt and pepper or use your favorite seasoning. I used creole seasoning. Set aside or place in the oven to keep it warm until sauce is ready.\r\n\r\nIn large skillet heat oil over medium heat, until hot, add the fish, cook each side- for about 5-7 minutes until cooked through and crispy on both sides. Remove fish and set aside. Drain oil and leave about 2-3 tablespoons of oil\r\nAdd, bay leave, garlic and ginger, stir-fry for about a minute making sure the garlic does not burn\r\nThen add onion, bell peppers, thyme, scotch bonnet, sugar, all spice-continue stirring for about 2-3 minutes. Add vinegar, mix an adjust salt and pepper according to preference. Let it simmer for about 2 more minutes. \r\n\r\nDiscard bay leave, thyme spring and serve over fish with a side of this bammy. You may make the sauce about 2 days in advance.",
        "strMealThumb": "https://www.themealdb.com/images/media/meals/1520084413.jpg",
        "strTags": "Seafood,Spicy,Speciality,Easter",
        "strYoutube": "https://www.youtube.com/watch?v=nF6DOtGE6k8",
        "strIngredient1": "Red Snapper",
        "strIngredient2": "Vegetable Oil",
        "strIngredient3": "Garlic",
        "strIngredient4": "Ginger",
        "strIngredient5": "Thyme",
        "strIngredient6": "Bay Leaf",
        "strIngredient7": "Red Pepper",
        "strIngredient8": "Yellow Pepper",
        "strIngredient9": "Onion",
        "strIngredient10": "Carrots",
        "strIngredient11": "Sugar",
        "strIngredient12": "Allspice",
        "strIngredient13": "Worcestershire Sauce",
        "strIngredient14": "Scotch Bonnet",
        "strIngredient15": "Lime",
        "strIngredient16": "Malt Vinegar",
        "strIngredient17": "Pepper",
        "strMeasure1": "2 Pounds",
      "strMeasure2": "1/2 cup ",
      "strMeasure3": "1 clove peeled crushed",
      "strMeasure4": "1/2 tsp",
      "strMeasure5": "2 sprigs",
      "strMeasure6": "1",
      "strMeasure7": "0.5",
      "strMeasure8": "0.5",
      "strMeasure9": "1 sliced",
      "strMeasure10": "1 chopped",
      "strMeasure11": "1 tbs",
      "strMeasure12": "1/2 tsp",
      "strMeasure13": "1 tsp ",
      "strMeasure14": "1",
      "strMeasure15": "1",
      "strMeasure16": "3/4 cup ",
      "strMeasure17": "pinch",
    }
]

function Details (){
    const[mealdata,setMealdata] = useState([])
    const controller = new AbortController()
    const timeoutid = setTimeout(() => {
        controller.abort()
    },5000);
    const {recipename} = useParams()
    console.log(recipename)
    useEffect(() => {
        async function getRecipe(){
        try{
            const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(recipename)}`, {signal : controller.signal})
            if (!res.ok) throw new Error(`There was a ${res.status} error while fetching the data`)
            const data = await res.json()
           
            setMealdata(data.meals)
        } 
        catch(error){
            if(error.name === 'AbortError'){
                console.error('request was aborted')
            }
            else {
                console.error('Fetch error',error)
            }

        }
        finally {
            clearTimeout(timeoutid)
        }
    }
        
    getRecipe()
    },[recipename])

    
    return(
        <div className={styles.detailsContainer}>
            {mealdata.map((info) => 
            
            <MealInfo info={info} key={info.idMeal}/>)}
        </div>
    )
}
export default Details