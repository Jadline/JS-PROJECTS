import { useState,useReducer } from "react";

const initialState = {count : 0,step : 1}
function reducer(state,action){
  // console.log(state,action)
  switch(action.type){
    case 'dec':
      return {...state,count : state.count - state.step}
    case 'inc' :
      return {...state,count : state.count + state.step}
    case 'setCount':
      return {...state,count : action.payload}
    case 'setStep' :
      return {...state,step : action.payload}
    case 'reset':
      return initialState;
    default :
      throw new Error ('unknown action')
  }
  
 
}

export function useDate(){
    const[state,dispatch] = useReducer(reducer,initialState)
    const{count,step} = state
  
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({type:'dec',payload : 1})
    
  };

  const inc = function () {
    dispatch({type : "inc",payload : 1})
    
  };

  const defineCount = function (e) {
    dispatch({type : "setCount",payload : Number(e.target.value)})
 
  };

  const defineStep = function (e) {
    dispatch({type : 'setStep',payload : Number(e.target.value)})
    
  };

  const reset = function () {
    dispatch({type : 'reset'})
    // setCount(0);
    // setStep(1);
  };
  return {
    step,
    defineCount,
    defineStep,
    inc,
    dec,
    count,
    reset,
    date
  }

}