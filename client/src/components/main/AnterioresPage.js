import React, { useEffect } from 'react'
import { Row, Col, Container, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { StartObtenerToDosAnteriores } from '../../actions/Todos';
import TimeAgo from 'javascript-time-ago'
import es from 'javascript-time-ago/locale/es.json'

TimeAgo.addDefaultLocale(es)
const timeAgo = new TimeAgo('es-AR')





export const AnterioresPage = () => {

    const dispatch = useDispatch();
    const { user, todos } = useSelector(state => state)
    
    
    useEffect(() => {
        dispatch( StartObtenerToDosAnteriores( user.token ) );
    }, [])




    return (
        <Row style={{ height: '90vh' }} class='d-flex justify-content-center aling-items-center'>
            <Col style={ styles.col } className='d-flex justify-content-center'>
                <Container>
                    
                    <div style={{ textAlign: 'center', margin: '1rem', borderBottom: '1px solid black' }}>
                        <h4>Anteriores</h4>
                    </div>

                    <Row>


                        {
                            todos.toDosAnteriores.map( item => (
                                <ToDoAnteriorItem todo={ item }/>
                            ))
                        }
                    </Row>

                </Container>
            </Col>
        </Row>
    )
}





const ToDoAnteriorItem = ({ todo }) => {


    return (
        <Card style={{ width: '100%', margin: '1rem 0' }} key={ todo._id }>
            <Card.Body>
                <Card.Title>{ todo.Name }</Card.Title>
                <Card.Text>
                { todo.Description }
                </Card.Text>
            </Card.Body>
            <Card.Footer style={{ textAlign: 'right'}}>
                <Card.Text>Completada { todo?.CompletedDate && timeAgo.format( new Date( todo.CompletedDate ) ) }</Card.Text>
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


