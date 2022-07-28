import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Login } from './components/Login/Login';
import { Dashboard } from './page/Dashboard/index';
import {AuthProvider} from './Context/AuthContext';

function App() {
  return (
    <div>
      <AuthProvider>
       <Router> 
          <Route exact path="/" component={Login} />
          <Route  path="/dashboard" component={Dashboard} />
       </Router>
      </AuthProvider>
    </div>
  )
}

export default App;
