import React, { Component } from "react";
import PropTypes from "prop-types";

import Main from "./components/sign/Main";
import Dash from "./components/dash/Dash";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }
  componentDidMount() {
    this.authListener();
  }
  authListener() {
    window.firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
        localStorage.setItem("user", user.displayName);
        localStorage.setItem("userID", user.uid);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("photoUrl", user.photoURL);
      } else {
        this.setState({ user: null });
        localStorage.removeItem("user");
        localStorage.removeItem("userID");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("photoUrl");
      }
    });
  }
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;
    return (<div>{this.state.user ? <Dash body={children} /> : <Main />}</div>);
  }
}

export default App;
