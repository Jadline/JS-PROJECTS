import {useEffect} from "react"
function Timer ({dispatch,secondsRemaining}){

    const mins = Math.floor(secondsRemaining / 60)
    const secs = secondsRemaining % 60

    useEffect(() => {
        const intervalid = setInterval(() => {
            dispatch({type:'tick'})
        },1000)
        return () => {
            clearInterval(intervalid)
        }
    },[dispatch])
    return(
        <div className="timer">
            {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs }
        </div>
    )
}
export default Timer