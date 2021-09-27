import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Card, Buttom, Badge } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { StartCompletedToDo, StartDeleteToDo, StartObtenerTodos } from '../../actions/Todos'
import { apiService } from '../../services/apiService'
import Swal from 'sweetalert2';
import moment from 'moment';

export const HomePage = () => {

    const dispatch = useDispatch()
    const { user, todos } = useSelector(state => state)
    
    
    useEffect(() => {
        dispatch( StartObtenerTodos( user.token ))
    }, [])
    


    return (
        <Row style={{ height: '90vh' }} class='d-flex justify-content-center aling-items-center'>
            <Col style={ styles.col } className='d-flex justify-content-center'>
                <Container>
                    
                    <div style={{ textAlign: 'center', margin: '1rem', borderBottom: '1px solid black' }}>
                        <h4>Pendientes</h4>
                    </div>

                    <Row>


                        {
                            todos.toDos.map( item => (
                                <ToDoItem todo={ item }/>
                            ))
                        }
                    </Row>

                </Container>
            </Col>
        </Row>  
    )
}



const ToDoItem = ({ todo }) => {

    const dispatch = useDispatch()
    const { token } = useSelector(state => state.user)
    const [user, setUser] = useState(null)

    const getBg = () => {
        switch( todo.Criticality ){
            case 'HIGH': 
                return 'red'
            case 'MEDIUM' : 
                return 'yellow'
            default : 
                return 'rgba(0,0,0,.125)'
        }
    }

    useEffect(() => {

        if( todo.User ) {
            apiService.getUsuarioById( todo.User, token )
            .then( res => {
                setUser(res.data.user)
            })
            .catch( e => {
                Swal.fire('Error', 'Error en los servicios', 'error');
            });
        }
    }, [todo])



    const handleDelete = () => {
        dispatch( StartDeleteToDo( token, todo._id) );
    }



    const handleComplete = () => {
        dispatch( StartCompletedToDo( token, todo._id) );
    }

    console.log(moment( todo.LimitDate ).format('DD-MM-YYYY'));


    return (
        <Card style={{ width: '100%', margin: '1rem 0', borderColor: getBg() }} key={ todo._id }>
            <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">Creado por: { user?.UserName }</Card.Subtitle>
                <Card.Title>{ todo.Name }</Card.Title>
                <Card.Text>
                { todo.Description }
                </Card.Text>
                <Badge style={ styles.badge } className='m-2' onClick={ handleDelete } >Eliminar</Badge>{"   "} 
                <Badge style={ styles.badge } onClick={ handleComplete } >Listo</Badge>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right'}}>
                <Card.Text>A completar el: { moment( todo.LimitDate ).format('DD/MM/yyyy').toString() }</Card.Text>
            </Card.Footer>
        </Card>
    )


}



const styles = {
    col: {
        backgroundColor: 'white',
        borderRadius: '5px',
        minHeigth: '85vh',
        margin: '10px',
        overflowY: 'scroll',
        maxHeight: '100%'
    },
    badge: {
        cursor: 'pointer'
    }
}