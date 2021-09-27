import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { AnterioresPage } from './AnterioresPage'
import { HomePage } from './HomePage'


export const Router = () => {
    return (
        <Switch>
            <Route path="/" exact >
                <HomePage />
            </Route>



            <Route path="/anteriores" exact >
                <AnterioresPage />
            </Route>
        </Switch>
    )
}
