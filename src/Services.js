import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Services extends Component {
  serviceAppClick = () => {
    console.log("clicked"+localStorage.getItem("token"));
  };
  render() {
    return (
    <div >
    <nav className="level ">
    <div className="level-left box is-info">
    <div className="level-item has-background-link-light">
      <p className="subtitle is-5">
        <strong>Эмчилгээний цаг</strong>
      </p>
    </div>
    <div className="level-item">
      <div className="field has-addons">
        <p className="control">
          <Link to="Services/:id">
          <button className="button is-info" onClick={this.serviceAppClick}>
            Захиалах
          </button>
          </Link>
        </p>
      </div>
    </div>
  </div>
    </nav>
        
    </div>
    )
  }
}
