import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login'
import SignUpForm from './components/Signup Form'
import { HashRouter as Router, Switch, Route} from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
        <Switch>
          <Route path="">
          <Login/>
          </Route>
          <Route path ="/login">
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
        </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
