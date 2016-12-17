import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { render } from 'react-dom';
import React from 'react';

import Login from './login';
import Register from './register';

render((
    <Router history={browserHistory}>
        <Route path="/" component={Login}/>
        <Route path="/register" component={Register}/>
    </Router>
), document.getElementById('root'));