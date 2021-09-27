import { types } from '../types/types';

const initialState = {
    toDos: [],
    toDosAnteriores: []
}


export const toDoReducer = ( state = initialState, action ) => {
    console.log(action.payload);
    switch ( action.type ) {
        case types.newToDo : 
            return {
                ...state,
                toDos: [ action.payload, ...state.toDos, ]
            }
        case types.deleteToDo :
            return {
                ...state,
                toDos : [ ...(state.toDos.filter( todo => todo._id != action.payload  )) ]
            } 
        case types.completeToDo :
            return {
                ...state,
                toDosAnteriores: [ ...state.toDosAnteriores, { ...state.toDos.find( todo => todo._id == action.payload  ), Completed: true }],
                toDos: [ ...state.toDos.filter( todo => todo._id != action.payload  ) ]
            } 
        case types.obtenerToDos :
            return {
                ...state,
                toDos: [ ...action.payload ]
            } 
        case types.obtenerToDosAnteriores :
            return {
                ...state,
                toDosAnteriores: [ ...action.payload ]
            } 
        default: 
        return {
            ...state
        }
    }



}