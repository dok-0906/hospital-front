import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
  state = {
    email: null,
    password: null,
    error: null,
    loading: false,
  };
  handleType = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value, error:null});
  };

  handleClick = () => {
    axios.post("http://134.209.96.67:4545/api/v1/users/login", {
      email: this.state.email,
      password: this.state.password
    }).then((result) => {
      localStorage.setItem("role", result.data.data.role);
      this.props.onLogin(result.data.token);
    })
    .catch((err) => this.setState({error: err.response.data.error}));
  }
  render() {
    return <div className="box">
      
      {this.state.error && (
        <div className="notification is-warning">{this.state.error}</div>
      )}
      &nbsp;
      <div className="field">
        <label className="label">Имэйл</label>
        <input className="input" name="email" type="text"
        onChange={this.handleType}/>
      </div>
      <div className="field">
        <label className="label">Нууц үг</label>
        <input className="input" name="password" type="password"
        onChange={this.handleType}/>
      </div>
      <div className="field">
        <button className="button is-info" onClick={this.handleClick}>Нэвтрэх</button>
      </div>
    </div>;
  }
}
