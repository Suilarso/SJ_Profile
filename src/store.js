import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  // userLoginReducer,
  userRegisterReducer,
  // userDetailsReducer,
  // userUpdateProfileReducer,
} from './reducers/userReducers'
// import { addItemReducer, itemGetDetailsReducer } from './reducers/itemReducers';

// Please add reducers here
const reducer = combineReducers({
  // userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  // userDetails: userDetailsReducer,
  // userUpdateProfile: userUpdateProfileReducer,
  // addItem: addItemReducer,
  // getItemDetails: itemGetDetailsReducer,
})

//SJ0210221 - Replace all userAuth to userToken
const userAuthFromStorage = localStorage.getItem('userToken')
  ? JSON.parse(localStorage.getItem('userToken'))
  : null

const initialState = {
  userLogin: { userToken: userAuthFromStorage },
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
