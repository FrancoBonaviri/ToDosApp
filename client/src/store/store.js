import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { modalReducer } from '../reducers/modalReducer';
import { toDoReducer } from '../reducers/toDoReducer';
import { userReducer } from '../reducers/userReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    modal: modalReducer,
    user: userReducer,
    todos: toDoReducer
});


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
);