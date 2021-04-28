import React from 'react'
import ReactDOM from 'react-dom'

import App from './containers/App'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'normalize.css'
import './index.css'
import Sobre from './pages/sobre'
import AppP from './pages/app'
import Home from './pages/home'

ReactDOM.render(
        <Router>
        <App>
        <Switch>
                <Route exact path="/app" component={AppP}/>
                <Route path="/sobre" component={Sobre}/>
                <Route path="/home" component={Home}/>
        </Switch>
        </App>
        </Router>
    , document.getElementById('root')
 );
