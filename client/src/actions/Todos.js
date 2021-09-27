import { apiService } from '../services/apiService'
import { types } from '../types/types'
import Swal from 'sweetalert2';


export const StartObtenerTodos = (token) => {
    return (dispatch) => {

        return apiService.obtenerToDos(token)
        .then( res  => {
            dispatch( ObtenerToDos( res.data.ToDos ) )
        })
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
        })

    }
}
const ObtenerToDos = (todos) => ({
    type: types.obtenerToDos,
    payload: todos
})


export const StartCraeteToDo = (token, Name, Description, LimitDate, Criticality) => {
    return (dispatch) => {

        return apiService.createTodo(token, Name, Description, LimitDate, Criticality)
        .then( res  => {
            dispatch( CraeteToDo( res.data.ToDo ) );

            Swal.fire('Genial!!!', 'Creamos el ToDo con exito', 'success')
        })
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
        })

    }
}

const CraeteToDo = (todo) => ({
    type: types.newToDo,
    payload: todo
})


export const StartDeleteToDo = ( token, id ) => {
    return (dispatch) => {

        return apiService.deleteTodo(token, id)
        .then( res  => {
            dispatch( deleteTodo( id ) );

            Swal.fire('Genial!!!', 'Eliminamos el ToDo con exito', 'success')
        })
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
        })

    } 
}

const deleteTodo = ( id ) => ({
    type: types.deleteToDo,
    payload: id
})




export const StartCompletedToDo = ( token, id ) => {
    return (dispatch) => {

        return apiService.completedToDo(token, id)
        .then( res  => {
            dispatch( completedTodo( id ) );

            Swal.fire('Genial!!!', 'Completamos el ToDo con exito', 'success')
        })
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
        })

    } 
}

const completedTodo = ( id ) => ({
    type: types.completeToDo,
    payload: id
})



export const StartObtenerToDosAnteriores = ( token ) => {
    return (dispatch) => {

        return apiService.obtenerToDosAnteriores(token)
        .then( res  => {
            dispatch( ObtenerToDosAnteriores( res.data.ToDos ) )
        })
        .catch( e => {
            Swal.fire('Error', e.message, 'error');
        })

    }
}



const ObtenerToDosAnteriores = (todos) => ({
    type: types.obtenerToDosAnteriores,
    payload: todos
})