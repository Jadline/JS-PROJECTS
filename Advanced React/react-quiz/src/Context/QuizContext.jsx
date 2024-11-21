import { createContext,useContext,useReducer,useEffect } from "react"
import { useQuizHook } from "../Hooks/QuizHook"
export const QuizContext = createContext()

function QuizProvider ({children}){
    const quiz = useQuizHook()
    return(
        <QuizContext.Provider value={
            quiz
        }>
            {children}
        </QuizContext.Provider>
    )
}
function useQuiz(){
    const context = useContext(QuizContext)
    if(context === undefined) throw new Error('You may have used the context outside the provider')
    return context
}
export{QuizProvider,useQuiz}