import { configureStore } from '@reduxjs/toolkit';
import accountreducer from './Features/account/accountSlice'
import customerreducer from './Features/customer/customerSlice'

const store = configureStore({
    reducer : {
        account :accountreducer,
        customer : customerreducer
    }
})

export default store;






