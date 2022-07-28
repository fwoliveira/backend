import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Dashboard } from './page/Dashboard/index';
import {PrivateRouter} from './routes/priveteroutes'

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRouter  path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </div>
  )
}

export default App;
