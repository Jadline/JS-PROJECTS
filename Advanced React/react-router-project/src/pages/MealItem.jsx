import styles from "./MealItem.module.css"
import Button from "../Components/Button"
import { useNavigate } from "react-router-dom"
function MealItem({meal}){
    const navigate = useNavigate()
    const {
        strMeal,
        strMealThumb,
        idMeal}
         = meal
    return(
        
            <li className={styles.recipeItem}>
                <img src={strMealThumb} alt={strMeal} className={styles.image}/>
                <h3 className={styles.mealname}>{strMeal}</h3>
                <Button onClick={() => navigate(`${strMeal}`)}>Get Recipe</Button>
            </li>
       
    )
}
export default MealItem