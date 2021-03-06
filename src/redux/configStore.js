import { applyMiddleware, combineReducers, createStore } from 'redux'
import ToDoListReducer from './reducer/ToDoReducer'
import reduxThunk from 'redux-thunk';
const rootReducer = combineReducers({
    //reducer khai báo tại đây
    ToDoListReducer,
})

const store = createStore(rootReducer,applyMiddleware(reduxThunk));


export default store;