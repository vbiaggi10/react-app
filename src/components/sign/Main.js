import React, { Component } from "react";
// import PropTypes from 'prop-types';
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

// import items from '../../data/menu'

class Main extends Component {
  render() {
    return (
      <div className=" content-bg">
        <SignIn />
        <div className="container">
          <div className="row">
            <SignUp />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
