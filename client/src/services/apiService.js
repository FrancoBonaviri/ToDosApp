import axios from 'axios';


class ApiService { 

    constructor() {
        this.URL = 'http://localhost:4500'
    }


    getUsuarioById = async(id, token) => {
        const res = await axios.get(this.URL + '/usuario/' + id, { headers: { 'x-token': token } })
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

    login = async( Email, Password ) => {
        const res = await axios.post(this.URL + '/usuario/login', {Email, Password})
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }



    craeteUser = async( Email, Password, UserName, PasswordRepeat ) => {
        const res = await axios.post(this.URL+ '/usuario', {Email, Password, UserName, PasswordRepeat})
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }


    obtenerToDos = async( token ) => {
        const res = await axios.get(this.URL+ '/todos', { headers: { 'x-token': token } } );
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

    createTodo = async ( token, Name, Description, LimitDate, Criticality ) => {

        const body = { 
            Name, Description, LimitDate, Criticality
        }
        
        const res = await axios.post(this.URL+ '/todos', body, { headers: { 'x-token': token } } );
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

    deleteTodo = async ( token, id ) => {
        
        const res = await axios.delete(this.URL+ '/todos/' + id, { headers: { 'x-token': token } } );
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

    completedToDo = async ( token, id ) => {
        
        const res = await axios.put(this.URL+ '/todos/' + id, {}, { headers: { 'x-token': token } } );
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }


    obtenerToDosAnteriores =  async( token ) => {
        const res = await axios.get(this.URL+ '/todos/anteriores', { headers: { 'x-token': token } } );
        if( !res.data.ok ) {
            throw new Error(res.data.err)
        }
        return res;
    }

}


export const apiService = new ApiService();