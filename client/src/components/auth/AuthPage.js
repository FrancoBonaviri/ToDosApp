import React,{ useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { startLogin, startCreateUser } from '../../actions/User';




export const AuthPage = () => {

    const [loginForm, setLoginForm] = useState(true);
    



    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: '100vh'}}>
            <Card style={{ width: '24rem', height: 'auto' }}>
                <Card.Body>
                    { 
                        loginForm ?
                        <LoginForm setLoginForm={setLoginForm}/> :
                        <RegisterForm setLoginForm={setLoginForm}/>
                    
                    }
                </Card.Body>
            </Card>
        </div>
    )
}




const LoginForm = ({setLoginForm}) => {

    const dispatch = useDispatch();
    const [formValues, setformValues] = useState({
        email: '',
        password: ''
    })

    const handleChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const handleSubmit = () => {
        if( isValid() ){

            try {
                dispatch( startLogin(formValues.email, formValues.password) )
            } catch (error) {
                console.log(error);
            }
        }
    }


    const isValid = () => {
        return !!( formValues.email?.trim() != '' && formValues.password)
    }



    return (
        <Form onChange={handleChange}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" name="email" value={ formValues.email }/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" placeholder="Contraseña" name="password" value={ formValues.password }/>
            </Form.Group>


            <Button variant="primary" type="button" size='lg' onClick={ handleSubmit }>
                Ingresar
            </Button>


            <p style={{ marginTop: '1rem'}}>
                No tenes cuenta? Podes registrarte <a href='#' onClick={ () => setLoginForm(false) }>aqui</a>
            </p>
        </Form>
    )



}


const RegisterForm = ({setLoginForm}) => {

    const dispatch = useDispatch();

    const [formValues, setformValues] = useState({
        email: '',
        password: '',
        passwordRepeat: '',
        userName: ''
    })

    const handleChange = ({ target }) => {
        setformValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const handleSubmit = () => {
        if( isValid() ){
            try {
                
                dispatch( startCreateUser(formValues.email, formValues.password, formValues.userName, formValues.passwordRepeat) )
            
            } catch (error) {
                console.log(error);
            }
        }
    }


    const isValid = () => {
        return !!( formValues.email?.trim() != '' && formValues.password && formValues.password?.trim != '' && formValues.passwordRepeat?.trim != '' )
    }

    return (
        <Form onChange={ handleChange }>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name='email' placeholder="Email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Nombre de usuario</Form.Label>
                <Form.Control type="text" name='userName' placeholder="Nombre de usuario" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control type="password" name='password' placeholder="Contraseña" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Repita la contraseña</Form.Label>
                <Form.Control type="password" name='passwordRepeat' placeholder="Repita la contraseña" />
            </Form.Group>


            <Button variant="primary" type="button" size='lg' onClick={ handleSubmit }>
                Ingresar
            </Button>


            <p style={{ marginTop: '1rem'}}>
                Ya tenes cuenta? Podes ingresar <a href='#' onClick={ () => setLoginForm(true) }>aqui</a>
            </p>
        </Form>
    )


}