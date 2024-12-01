import { createSlice } from "@reduxjs/toolkit"

const initialState= {
    fullName : '',
    nationalid : '',
    createdAt : ''
}
const customerSlice = createSlice({
    name : 'customer',
    initialState,
    reducers : {
        createCustomer : {
            prepare(fullName,nationalId,createdAt){
                return {
                    payload : {
                    fullName,
                    nationalId,
                    createdAt,
                 }
                }
            },
            reducer(state,action){
            state.fullName = action.payload.fullName
            state.nationalid = action.payload.nationalId
            state.createdAt = action.payload.createdAt

        }},
        updateName(state,action){
            state.fullName = action.payload
        }
    }
})
export const {createCustomer,updateName} = customerSlice.actions
export default customerSlice.reducer
// function customerreducer(state=initialStateCustomer,action){
//     switch(action.type){
//         case 'customer/createCustomer':
//             return {
//                 ...state,
//                 fullName : action.payload.fullName,
//                 nationalid : action.payload.nationalid,
//                 createdAt : action.payload.createdAt
//             }
//         case 'customer/updateName':
//             return {
//                 ...state,
//                 fullName : action.payload.fullName

//             }
//         default :
//             return state
//     }
// }

// export function createCustomer(fullName,nationalid){
//     return {
//         type : 'customer/createCustomer',
//         payload : {
//             fullName,
//             nationalid,
//             createdAt : new Date().toISOString()}
//     }
// }
// export function updateName (fullName){
//     return {
//         type : 'customer/updateName',
//         payload : fullName
//     }
// }
// export default customerreducer