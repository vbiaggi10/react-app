import React, { Component } from "react";
import imgProfile from "../../../../../img/user.png";

class ProfileCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      photo: ""
    };
  }
  componentDidMount() {
    if (localStorage.getItem("user") === "null") {
      this.setState({ user: localStorage.getItem("userEmail"), photo: imgProfile });
    } else {
      this.setState({ user: localStorage.getItem("user"), photo: localStorage.getItem("photoUrl")});
    }
  }
  render() {
    return (
      <div className="col-sm-4 mx-auto">
        <div className="card profile-card">
          <div className="col">
          <center>
            <img
              className="card-img-top imgProfile"
              src={this.state.photo}
              alt="url"
            />
            </center>
          </div>
          <div className="card-body col">
            <h5 className="card-title">{this.state.user}</h5>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;
