import React, { useState} from 'react'
import { Switch, Route, Router } from 'react-router-dom'
// components
import Home from './components/Home'
import NewCard from './components/NewCard'
import AllCards from './components/AllCards'
import Nav from './components/Nav'
import Register from './components/auth/Register'
import LogIn from './components/auth/LogIn'
import history from './history'
// styles
import './styles/App.css';
import './styles/Tablet.css'
import './styles/Desktop.css'

function App() {

  // persisting the logged in user through the app using hooks
  const [user, setUser] = useState({
    email: "",
    id: ""
  })
  
  // using react-router-dom (Router, Switch and Route) for routing && to set the nav on all pages
  return (
    <div className="App">
      <Router history={history}>
        <Nav user={user} setUser={setUser} />
        <Switch>
          <Route exact path="/register" render={(props) => <Register {...props} user={user} setUser={setUser} /> } />
          <Route exact path="/login" render={(props) => <LogIn {...props} user={user} setUser={setUser} /> }/>
          <Route exact path="/newcard" render={(props) => <NewCard {...props} user={user} setUser={setUser} /> } />
          <Route exact path="/cards" render={(props) => <AllCards {...props} user={user} setUser={setUser} /> }/>
          <Route exact path="/" render={(props) => <Home {...props} user={user} setUser={setUser} /> }/>

        </Switch>
      </Router>

    </div>
  );
}

export default App;
