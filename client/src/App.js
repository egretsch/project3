import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Footer from "./components/Footer"
import "./pages/pages.css"

const App = () => (
  <Router>
    <div>
      
      <div className='content'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/search' component={Search} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </div>
      <Footer />
    </div>
  </Router>

)


export default App;
