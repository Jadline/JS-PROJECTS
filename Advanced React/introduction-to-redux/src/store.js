import {combineReducers, createStore} from 'redux'
import accountreducer from './Features/account/accountSlice'
import customerreducer from './Features/customer/customerSlice'


const rootReducer = combineReducers({
    account : accountreducer,
    customer : customerreducer
})
const store = createStore(rootReducer)
export default store;






