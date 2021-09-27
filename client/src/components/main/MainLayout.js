import React from 'react'
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import { Appbar } from './Appbar';
import { ModalNewToDo } from './ModalNewToDo';
import { Router } from './Router';
export const MainLayout = () => {
    return (
        <BrowserRouter>
            <Appbar />

            <Container>
                <Router />
            </Container>

            <ModalNewToDo />
        </BrowserRouter>
    )
}
