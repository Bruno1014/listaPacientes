import React from 'react'

import { Router, Switch, Route } from 'react-router'

import Login from '../pages/login'
import Register from '../pages/register'
import Sobre from '../pages/sobre'
import App from '../pages/app'
import Home from '../pages/home'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'

import {history} from '../history'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Login} exact path="/"/>
            <Route component={Login} exact path="/login"/>
            <Route component={Sobre} exact path="/sobre"/>
            <Route component={Register} exact path="/register"/>
            <PrivateRoute component={Home} exact path="/home"/>
            <PrivateRoute component={App} exact path="/app"/>
            <PrivateRoute component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes
