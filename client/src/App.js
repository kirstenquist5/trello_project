import React, { Fragment } from 'react';
import { Route, Switch, } from 'react-router-dom'
import Home from './components/Home';
import NavBar from './components/NavBar'

const App = () => (
  <Fragment>
    <NavBar />
    <Switch>
      <Route exact path='/' component={Home} />
    </Switch>
  </Fragment>
)

export default App;
