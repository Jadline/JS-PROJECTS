import styles from "./MealInfo.module.css"
function MealInfo({info}){
    const ingredients = []
    const measurements = []
 
    const{
        idMeal,
        strMeal,
        strDrinkAlternate,
        strCategory,
        strArea,
        strInstructions,
        strMealThumb,
        strTags,
        strYoutube,
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strIngredient16,
        strIngredient17,
        strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
      strMeasure9,
      strMeasure10,
      strMeasure11,
      strMeasure12,
      strMeasure13,
      strMeasure14,
      strMeasure15,
      strMeasure16,
      strMeasure17,
    } = info
    const measurementsinfo = [ strMeasure1,
        strMeasure2,
        strMeasure3,
        strMeasure4,
        strMeasure5,
        strMeasure6,
        strMeasure7,
        strMeasure8,
        strMeasure9,
        strMeasure10,
        strMeasure11,
        strMeasure12,
        strMeasure13,
        strMeasure14,
        strMeasure15,
        strMeasure16,
        strMeasure17,

    ]
    measurementsinfo.forEach((measurement) => {
        if(measurement !== null && measurement.trim() !== '') {
            measurements.push(measurement)
        }
    })
    console.log(measurements)
    const ingredientsinfo = [  strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strIngredient7,
        strIngredient8,
        strIngredient9,
        strIngredient10,
        strIngredient11,
        strIngredient12,
        strIngredient13,
        strIngredient14,
        strIngredient15,
        strIngredient16,
        strIngredient17,]
    ingredientsinfo.forEach((ingr) => {
        if(ingr){
            ingredients.push(ingr)
        }
    })
    console.log(ingredients)
    const ingredientsdata = measurements.map((measure,index) => {
        return `${measure} ${ingredients[index]},`
    })
    console.log(ingredientsdata)
    return (
        <div className={styles.infoContainer}>
            <div className={styles.infodata}>
                <h2>Meal : <span>{strMeal}</span></h2>
                <p>Category : <span>{strCategory}</span></p>
                <p>Origin : <span>{strArea}</span></p>
                <p>Tags : <span>{strTags}</span></p>
            </div>
            
            <h3>Ingredients</h3>
            <p className={styles.ingredients}>{ingredientsdata}</p>
            <div></div>
            <h3 className={styles.instructions}>Instructions</h3>
            <p className={styles.pinstructions}>{strInstructions}</p>
            <img src={strMealThumb} className={styles.image}/>
            <a href={strYoutube} className={styles.youtubelink}>Watch Recipe</a>
        </div>
        
    )
}
export default MealInfo