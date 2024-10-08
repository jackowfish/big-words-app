import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import StartPage from './components/Start Page'
import SignUpForm from './components/Signup Form'
import LoginForm from './components/Login Form'
import HomePage from './components/Home Page'
import MyWords from './components/MyWords'
import MyLibrary from './components/MyLibrary'
import MyAccount from './components/MyAccount'
import Search from './components/Search'
import BookInfo from './components/BookInfo'
import EditPage  from './components/EditPage';
import AdminPage from './components/Admin Page';

import { HashRouter as Router, Switch, Route} from "react-router-dom";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import getFirebase from '../firebase.config';

const app = getFirebase();

const analytics = getAnalytics(app);
// const {path} = useRouteMatch();

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/">
        <Switch>
        <Route path ="/login">
            <LoginForm /> 
          </Route>
          <Route path="/signup">
            <SignUpForm />
          </Route>
          <Route path ="/homepage">
            <HomePage />
          </Route>
          <Route path="/mywords"> 
            <MyWords />
          </Route>
          <Route path="/mylibrary">
            <MyLibrary />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/myaccount">
            <MyAccount />

          </Route>
          <Route path="/admin">
            <AdminPage />
          </Route>
          
          <Route path={"/bookinfo"} component={BookInfo}/>
          <Route path={"/edit"} component={EditPage}/>
          
          <Route path ="/">
            <StartPage />
          </Route>
        </Switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
