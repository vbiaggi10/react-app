import React, { Component } from "react";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      repeatPassword: ""
    };
  }

  createAccount(e) {
    if (e.target.name === "email") {
      this.setState({ email: e.target.value });
    } else if (e.target.name === "password") {
      this.setState({ password: e.target.value });
    } else if (e.target.name === "repeatPassword") {
      this.setState({ repeatPassword: e.target.value });
    }
  }

  signOther(targetName) {
    let provider;
    if (targetName === "signGoogle") {
      provider = new window.firebase.auth.GoogleAuthProvider();
      return provider;
    }
  }

  firebaseOtherAuth(e) {
    const provider = this.signOther(e.target.name);
    window.firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        alert("ingresaste");
      })
      .catch(function(error) {
        alert(error.code);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      repeatPassword: this.state.repeatPassword
    };

    if (newUser.password === newUser.repeatPassword) {
      window.firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .catch(error => {
          alert(error.code);
          alert(error.message);
        });
      this.setState({ email: "", password: "", repeatPassword: "" });
    } else {
      alert("Password doesnt match");
    }
  }

  render() {
    return (
      <div className="container col-sm-12 col-md-5 mt-4 mb-4 bg-transp">
        <div className="">
          <h2>Sing up</h2>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <label
                htmlFor="exampleInputEmail1"
                className="bmd-label-floating"
              >
                Email address (two help blocks)
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                onChange={this.createAccount.bind(this)}
                value={this.state.email}
              />
              <span className="bmd-help">
                We'll never share your email with anyone else.
              </span>
              <span className="bmd-help">
                And this is probably from a second plugin showing in a
                non-optimal way
              </span>
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
                onChange={this.createAccount.bind(this)}
                value={this.state.password}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="exampleInputPassword2"
                className="bmd-label-floating"
              >
                Repeat password
              </label>
              <input
                type="password"
                name="repeatPassword"
                className="form-control"
                id="exampleInputPassword2"
                onChange={this.createAccount.bind(this)}
                value={this.state.repeatPassword}
              />
            </div>
            <button className="btn btn-raised btn-info">Send</button>
          </form>
          <div className="text-center">
            <span>Or sign up using</span>
          </div>
          <div className="text-center">
            <button
              className="btn btn-outline-info"
              name="signGoogle"
              onClick={this.firebaseOtherAuth.bind(this)}
            >
              Google
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
