import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
//Landing page should be login page.


import API from "./utils/API";



class App extends Component {
  state = {
    isLogedin: false
  }

  componentDidMount() {
    this.auth();

  }
  
  auth = () => {
    

    API.userAuth()
      .then(res => {
        
        if (res.data.validUser) {
          this.setState({
            isLogedin: true
          });
          // isLogedin = true
          // console.log(isLogedin)
        }
        return res;

      })
      .catch(err => {
        console.log(err)
      });
  };

  
  render() {
  return(
      <Router>
  <div>
    <Switch>
      
      <Route exact path='/' component={Login} />
          <Route path='/search' component={this.state.isLogedin ? Search : Login} />
      <Route path='/profile' component={ this.state.isLogedin ? Profile : Login} />
    </Switch>
  </div>
      </Router >
    );
  }
}


export default App;
