import styles from "./Button.module.css"
function Button ({children,onClick,type}){
    return(
        <Button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </Button>
    )
}
export default Button