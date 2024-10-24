import styles from "./MealItem.module.css"
import Button from "../Components/Button"
function MealItem({meal}){
    const {
        strMeal,
        strMealThumb,
        idMeal}
         = meal
    return(
        
            <li className={styles.recipeItem}>
                <img src={strMealThumb} alt={strMeal} className={styles.image}/>
                <h3>{strMeal}</h3>
                <Button>Get Recipe</Button>
            </li>
       
    )
}
export default MealItem