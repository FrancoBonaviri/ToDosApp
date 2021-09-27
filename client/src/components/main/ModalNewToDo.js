import React, {useEffect, useState} from 'react'
import {Button, Modal, Form, InputGroup, FormControl} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { HideModalNewToDo, ShowModalNewToDo } from '../../actions/Modal';
import moment from 'moment';
import { StartCraeteToDo } from '../../actions/Todos';

const initialStateFormValues = {
    Name: '',
    Description: '',
    LimitDate: '',
    Criticality: ''
}
const initialStateFormErrors = {
    Name: false,
    Description: false,
    LimitDate: false,
    Criticality: false
}


export const ModalNewToDo = () => {

    const dispatch = useDispatch()
    const { showModal } = useSelector( state => state.modal )
    const { token } = useSelector( state => state.user )

    const [formValues, setformValues] = useState(initialStateFormValues)
    const [formErrors, setformErrors] = useState(initialStateFormErrors)

    const handleClose = () => dispatch( HideModalNewToDo() );

    const handleChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        });
        setformErrors({
            ...formErrors,
            [target.name]: false
        })
    }

    useEffect(() => {
        setformErrors( initialStateFormErrors);
        setformValues(initialStateFormValues);
    }, [showModal])


    const handleSubmit = () => {
        if( isValid() ){

            console.log( formValues.LimitDate)
            dispatch( StartCraeteToDo(token, formValues.Name, formValues.Description, formValues.LimitDate, formValues.Criticality ))
            handleClose()
        }
    }


    const isValid = () => {

        let errorObject = {
            Name: false,
            Description: false,
            LimitDate: false,
            Criticality: false
        }
        let result = true;
        
        if( !(formValues.Name?.trim() != '') ) {
            errorObject.Name = true;
        }

        if( !(formValues.Description?.trim() != '') ) {
            errorObject.Description = true;
        }

        if( ! (formValues.LimitDate && moment().subtract('day', 1).isSameOrBefore( moment(formValues.LimitDate ))  ) ) {
            errorObject.LimitDate = true;
        }

        if( !(formValues.Criticality?.trim() != '')) {
            errorObject.Criticality = true;
        }


        Object.keys(errorObject).forEach( key => {
            if( errorObject[key] ) {
                result = false;
            } 
        });


        setformErrors({...errorObject});
        return result;
    }

    return (
    <>
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Nuevo ToDo!!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onChange={ handleChange }>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" isInvalid={ formErrors.Name } name='Name' value={ formValues.Name } placeholder="Nombre" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control type="text" isInvalid={ formErrors.Description }  name='Description' value={ formValues.Description } placeholder="Descripcion" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Fecha limite</Form.Label>
                    <Form.Control type="date" isInvalid={ formErrors.LimitDate } name='LimitDate' value={ formValues.LimitDate } placeholder="Fecha limite" />
                </Form.Group>


                <Form.Group className="mb-3 mt-3"> 
                    <Form.Label style={{ display: 'block' }}>Criticidad</Form.Label>

                    <Form.Check
                        inline
                        label="Baja"
                        name="Criticality"
                        value='2'
                        type='radio'
                        id={`inline-radio-1`}
                    />
                    <Form.Check
                        inline
                        label="Media"
                        name="Criticality"
                        value='1'
                        type='radio'
                        id={`inline-radio-2`}
                    />
                    <Form.Check
                        inline
                        label="Alta"
                        name="Criticality"
                        value='0'
                        type='radio'
                        id={`inline-radio-3`}
                    /> 
                    {
                        formErrors.Criticality &&
                        <Form.Text className="text-danger">
                            Debe completar este campo
                        </Form.Text>
                    }
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
            Cancelar
            </Button>
            <Button variant="primary" onClick={ handleSubmit }>
            Confirmar
            </Button>
        </Modal.Footer>
        </Modal>
    </>
    );
}
