import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../config';

class Navigator extends Component {
  logout = () => {
    return firebaseAuth().signOut()
  }  

  render() {
    let logLink = null;
    if (this.props.isAuthenticated)
      logLink = <button className="btn btn-link" onClick={this.logout}>Logout</button>;
    else
      logLink = <Link className="nav-link" to="/login">Login</Link>;

    return (
      <div>
        
      <nav className="navbar navbar-expand-lg navbar-light ">
     
        {/* <Link className="navbar-brand" to="/">Home</Link> */}
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item">
              <Link className="nav-link" to="/">Customer List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/training">Training List</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pt">PT Customers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/calendar">Calendar</Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            {logLink}
          </ul>        
        
      </nav>        
      </div>
    );
  }
}

export default Navigator;