import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "./pages/Profile";

const App = () => (

  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Profile} />
      </Switch>
    </div>
  </Router>
)



export default App;
