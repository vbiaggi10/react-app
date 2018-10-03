import React, { Component } from "react";

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }

  entryAccount(e) {
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    } else if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    window.firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(() => {
        alert("ingresaste");
        this.setState({ email: "", password: "" });
      })
      .catch(error => {
        alert(error.code);
      });
  }

  resetPassword(e) {
    e.preventDefault();

    const user = {
      email: this.state.email
    };

    window.firebase
      .auth()
      .sendPasswordResetEmail(user.email)
      .then(() => {
        alert("Password Reset Email Sent");
        this.setState({ email: "", password: "" });
      })
      .catch(error => {
        alert(error.code);
      });
  }

  render() {
    return (
      <nav className="navbar navbar-light bg-light sign-form">
        <a className="navbar-brand">POST IT LIST</a>
        <div className="justify-content-end">
          <form onSubmit={this.handleSubmit.bind(this)} className="form-inline">
            <div className="form-group">
              <label
                htmlFor="exampleInputEmail1"
                className="bmd-label-floating"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={this.entryAccount.bind(this)}
                value={this.state.email}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleInputPassword1"
                className="bmd-label-floating"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                onChange={this.entryAccount.bind(this)}
                value={this.state.password}
              />
            </div>
            <button className="btn btn-raised btn-info" name="submit">
              Log in
            </button>
          </form>
          <a
            href=""
            onClick={this.resetPassword.bind(this)}
            className="text-muted forgot-pass"
          >
            Forgot password?
          </a>
        </div>
      </nav>
    );
  }
}

export default SignIn;
