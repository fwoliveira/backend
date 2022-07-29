import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {AuthProvider} from './Context/AuthContext';
import history from './services/history';
import Routes from './routes/privateroutes'

function App() {
  return (
    <div>
      <AuthProvider>
       <Router history={history}> 
         <Routes/>
       </Router>
      </AuthProvider>
    </div>
  )
}

export default App;
