import React from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ShowModalNewToDo } from '../../actions/Modal';
import { logout } from '../../actions/User';

export const Appbar = () => {

    const dispatch = useDispatch();


    return (
        <Navbar bg="light" expand="lg">
            <Container >
                <Navbar.Brand><NavLink style={{ textDecoration: 'none', color: 'black'}} to='/'>ToDos</NavLink> </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#"  onClick={ () => dispatch( ShowModalNewToDo() )}>Nuevo ToDo</Nav.Link>
                    <Nav.Link><NavLink style={{ textDecoration: 'none', color: 'black'}} to='/anteriores'>Anteriores</NavLink> </Nav.Link>
                    <Nav.Link href="#"  onClick={ () => dispatch( logout() )}>Salir</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
