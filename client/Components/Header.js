import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/LoginAction';


class Header extends React.Component{
  logout(e) {
    e.preventDefault();
    this.props.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const userLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/new-event">Events</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/myprofile">My Profile</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={this.props.logout}>Logout</a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/signup">SignUp</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded pl-5 pr-5">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <Link className="navbar-brand" to="/">Test</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          { isAuthenticated ? userLinks : guestLinks }
        </div>
      </nav>

    );
  }
 }

 Header.propTypes = {
   auth: PropTypes.object.isRequired
 }

 function mapStateToProps(state) {
   return {
     auth: state.auth
   };
 }

export default connect(mapStateToProps, { logout })(Header);
