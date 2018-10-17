import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
//Landing page should be login page.

const App = () => (

  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/search' component={Search} />
        <Route path='/profile' component={Profile}/>
      </Switch>
    </div>
  </Router>
  
)


export default App;
