import {applyMiddleware, combineReducers, createStore} from 'redux'
import accountreducer from './Features/account/accountSlice'
import customerreducer from './Features/customer/customerSlice'
import {thunk} from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
const rootReducer = combineReducers({
    account : accountreducer,
    customer : customerreducer
})
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
export default store;






