import {useEffect,useReducer} from "react"
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen"
import Question from "./Question"
import NextButton from "./nextbutton"
import ProgressBar from "./progress"
import FinishScreen from "./FinishScreen"
import Timer from "./Timer"
import Footer from "./Footer"

const SEC_PER_QUESTION = 30

const initialState = {
  questions : [],
  
  //loading,error,ready,active,finished
  status : 'loading',
  index : 0,
  answer : null,
  points : 0,
  Highscore : 0,
  secondsRemaining :  null
}

function reducer(state,action){
  switch (action.type){
    case "dataReceived" :
      return {
        ...state,
        questions : action.payload,
        status : "ready"
      }
    case "dataFailed":
      return {
        ...state,
        status : "error"     
      }
    case "start":
      return {
        ...state,
        status : "active",
        secondsRemaining : state.questions.length * SEC_PER_QUESTION
      }
    case "nextQuestion":
      return {
        ...state,
        index : state.index + 1,
        answer : null
      }
    case "finish":
      return {
        ...state,
        status : 'finish',
        Highscore : state.points  > state.Highscore ?  state.points : state.Highscore
      }
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index)
      console.log(currentQuestion)
      return {
        ...state,
        answer : action.payload,
        points : action.payload ===  currentQuestion.correctOption ?  state.points + currentQuestion.points : state.points
      }
    case "restart" :
      return {
        ...initialState,
        questions : state.questions,
        status : "ready"       
      }
    case "tick" :
      return {
        ...state,
        secondsRemaining : state.secondsRemaining - 1,
        status : state.secondsRemaining === 0 ? "finish" : state.status
      }
    default : 
      throw new Error ('action is unknown')

  }
}


function App() {
  const [{questions,status,index,answer,points,Highscore,secondsRemaining}, dispatch] = useReducer(reducer,initialState)

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev,cur)=> prev + cur.points,0)

  useEffect(() => {
    fetch("http://localhost:8000/questions")
    .then((res)=> res.json())
    .then((data) => dispatch({type : 'dataReceived',payload : data}))
    .catch((err) => dispatch({type : 'dataFailed'}))
  },[])
  return (
    <div className = "app">
        <Header/>
        <main className ="main">
            {status === 'loading' && <Loader/> }
            {status === 'error' && <Error/>}
            {status === 'ready' && <StartScreen numQuestions ={numQuestions} dispatch={dispatch}/>}
            {status === "active" && 
            <>
            <ProgressBar index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
              <Question 
                question={questions[index]} 
                dispatch={dispatch}
                answer={answer}/>
              <Footer>
                <Timer dispatch={dispatch} secondsRemaining={secondsRemaining}/>
                <NextButton dispatch={dispatch}
                answer={answer} 
                index={index} 
                numQuestions={numQuestions}/>
              </Footer>
            </>
           
            }
            {status === "finish" &&  <FinishScreen points={points} maxPossiblePoints={maxPossiblePoints} index={index} numQuestions={numQuestions} Highscore={Highscore} dispatch={dispatch}/>}
           
        </main>
    </div>
  );
}

export default App;
