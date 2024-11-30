const initialStateCustomer = {
    fullName : '',
    nationalid : '',
    createdAt : ''
}

function customerreducer(state=initialStateCustomer,action){
    switch(action.type){
        case 'customer/createCustomer':
            return {
                ...state,
                fullName : action.payload.fullName,
                nationalid : action.payload.nationalid,
                createdAt : action.payload.createdAt
            }
        case 'customer/updateName':
            return {
                ...state,
                fullName : action.payload.fullName

            }
        default :
            return state
    }
}

export function createCustomer(fullName,nationalid){
    return {
        type : 'customer/createCustomer',
        payload : {
            fullName,
            nationalid,
            createdAt : new Date().toISOString()}
    }
}
export function updateName (fullName){
    return {
        type : 'customer/updateName',
        payload : fullName
    }
}
export default customerreducer