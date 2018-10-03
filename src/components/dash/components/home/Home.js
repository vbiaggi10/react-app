import React, { Component } from "react";
import ProfileCard from "./components/ProfileCard";
import Lists from "./components/Lists";
// import "./wall.css";

class ContentMuro extends Component {
  render() {
    return (
      <div className="page-contents">
        <div className="container mt-3">
          <ProfileCard />
          <Lists />
        </div>
      </div>
    );
  }
}

export default ContentMuro;
