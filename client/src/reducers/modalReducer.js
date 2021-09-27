import { types } from '../types/types';

const initialState = {
    showModal: false 
}


export const modalReducer = ( state = initialState, action ) => {

    console.log(action.type)
    switch ( action.type ) {
        case types.uiShowModalNewTodo : 
            return {
                ...state,
                showModal: true,
            }
        case types.uiHideModalNewTodo :
            return {
                ...state,
                showModal: false,
            } 
        default: 
        return {
            ...state
        }
    }



}