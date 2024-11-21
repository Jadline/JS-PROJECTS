import { useReducer,useEffect } from "react"
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
        // console.log(currentQuestion)
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
export function useQuizHook(){
    const [{questions,status,index,answer,points,Highscore,secondsRemaining}, dispatch] = useReducer(reducer,initialState)

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((prev,cur)=> prev + cur.points,0)

    useEffect(() => {
        fetch("http://localhost:8000/questions")
        .then((res)=> res.json())
        .then((data) => dispatch({type : 'dataReceived',payload : data}))
        .catch((err) => dispatch({type : 'dataFailed'}))
      },[])
      return({
        index,
            numQuestions,
            points,
            maxPossiblePoints,
            question : questions[index],
            dispatch,
            answer,
            secondsRemaining,
            status,
            Highscore
      })
}