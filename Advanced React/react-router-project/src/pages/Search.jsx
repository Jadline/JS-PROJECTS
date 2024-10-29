import styles from "./Search.module.css"
import {useState} from "react"
import { useNavigate } from "react-router-dom"

const options =[
    'Beef',
    'Chicken',
    'Dessert',
    'Lamb',
    'Miscellaneous',
    'Pasta',
    'Pork',
    'Seafood','Side','Starter','Vegan','Vegetarian','Breakfast','Goat'
]

function Search(){
    const[category,setCategory] = useState('')
    const navigate = useNavigate()
    console.log(category)
    function handleCategorySelection (e){
        const selectedCategory = e.target.value;
        setCategory(selectedCategory)
        if(selectedCategory){
            navigate(`/${selectedCategory.toLowerCase()}`)
        }

    }
    return (
        <div className={styles.div}>
            <div className={styles.container}>
                <h1>Discover,create and savor delightful recipes</h1>
                <p>from around the world with the ultimate culinary companion</p>
                <div className={styles.inputcontainer}>
                    <select value={category} onChange={handleCategorySelection} className={styles.select}>
                        {options.map((option,i) => 
                        <option value={option} key={i}>
                            {option}
                        </option>)}
                    </select>
                  
                    {/* <input type="text" placeholder="enter a Category" className={styles.input} value={category} onChange={(e) => setCategory(e.target.value)} /> */}
                    {/* <button className={styles.button} ><span role="image">🔍</span></button> */}
                </div>
                <h2>{category}</h2>
            </div>        
        </div>
    )
}
export default Search