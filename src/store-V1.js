import { combineReducers, createStore } from 'redux';
const initialState =
{
    balance: 0,
    loan: 0,
    loanPurpose: ""
}

const customerState =
{
    fullName: '',
    nationalID: '',
    createdAt: '',

}

function accountReducer(state = initialState, action) {
    switch (action.type) {
        case "account/deposite":
            return { ...state, balance: state.balance + action.payload }
        case "account/withdraw":
            return { ...state, balance: state.balance - action.payload }
        case "account/requestLoan":
            if (state.loan > 0) return state;
            return { ...state, loan: action.payload.amount, loanPurpose: action.payload.purpose, balance: state.balance + action.payload.amount }
        case "account/payLoan":
            return { ...state, loan: 0, loanPurpose: '', balance: state.balance - state.loan }
        default:
            return state
    }
}

function customerReducer(state = customerState, action) {
    switch (action.type) {
        case 'customer/createCustomer':
            return { ...state, fullName: action.payload.fullName, nationalID: action.payload.nationalID, createdAt: action.payload.createdAt }
        case 'customer/updateName':
            return { ...state, fullName: action.payload }
        default:
            return state
    }

}

const rootReducer = combineReducers(
    {
        account: accountReducer,
        customer: customerReducer
    }
)
const store = createStore(rootReducer);


function deposite(amount) {
    return { type: "account/deposite", payload: amount }

}
function withdraw(amount) {
    return { type: "account/withdraw", payload: amount }

} function requestLoan(amount, purpose) {
    return { type: "account/requestLoan", payload: { amount: amount, purpose: purpose } }

} function payLoan() {
    return { type: "account/payLoan" }
}


function createCustomer(fullName, nationalID) {
    return { type: 'customer/createCustomer', payload: { fullName, nationalID, createdAt: new Date().toISOString() } }
}

function updateName(fullName) {
    return {
        type: 'customer/updateName', payload: fullName
    }
}
store.dispatch(deposite(5000));

store.dispatch(createCustomer('magedmamdouh', "12345"));
console.log(store.getState())