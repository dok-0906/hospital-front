import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Login from "./Login";
import Services from "./Services";
import ServiceDetail from "./ServiceDetail";
import NavBar from "./NavBar";
import NavBarNurse from "./NavBarNurse";
import myAppointments from "./myAppointments";
import nurseViewApp from "./nurseViewApp";
import nurseUpdateApp from "./nurseUpdateApp";
import NurseRootView from "./NurseRootView";


export default class App extends Component {
  state = {
    token: null,
    role: localStorage.getItem("role")
  };

  handleLogin = (token) => {
    this.setState({token});
    localStorage.setItem("token", token);
    if(this.state.role==='user'){
      this.router.history.push("/Services");
    } else {
      
    }
    localStorage.getItem("role") == 'user' ? this.router.history.push("/Services"): this.router.history.push("/NurseRootView"); 
    window.location.reload();
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    this.setState({token: null, role: null});
    this.router.history.push("/"); 
    ;
    window.location.reload();
  };
  


  render() {
    return (
      <Router ref={(router) => (this.router = router)}>
        {this.state.role == 'user' && (<NavBar onLogout={this.handleLogout} />)}
        {this.state.role == 'nurse' && (<NavBarNurse onLogout={this.handleLogout} />)}
        <div className="container">
          <Switch>
            <Route exact path="/Services" component={Services} />
            <Route exact path="/NurseRootView" component={NurseRootView}/>
            <Route exact path="/Services/myappoint" component={myAppointments} />
            <Route path="/Services/:id" component={ServiceDetail} />
            <Route exact path="/nurseView" component={nurseViewApp} />
            <Route exact path="/nurseUpdate" component={nurseUpdateApp} />
            <Route
              path="/"
              render={() => <Login onLogin={this.handleLogin} />}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
