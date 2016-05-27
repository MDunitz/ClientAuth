//no component level state ->functional component
//logic of what to render based on if user is authentitcated -> class based component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';




class Header extends Component { 

  renderLinks(){
    if(this.props.authenticated){
      return (
        <li className="nav-item">
          <Link className="nav-link" to="/signout"> Sign Out </Link>
        </li>
      )
    }else{
      return [
        <li className="nav-item" key={1}>
          <Link className="nav-link" to="/signin"> Sign in </Link>
        </li>,
        <li className="nav-item" key={2}>
          <Link className="nav-link" to="/signup">Sign Up </Link>
        </li>
      ]
    }

  }

  render(){
      return(
        <nav className="navbar navbar-light">
          <Link to="/" className="navbar-brand">Redux Auth </Link>
          <ul className="nav navbar-nav">
            {this.renderLinks()}
          </ul>
        </nav>
    );
  }
}

function mapStateToProps(state){
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(Header);



//no matter what we want the header visible -> add it to the app component (not the router)