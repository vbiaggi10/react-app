import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }
  static propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
  };
  signOut() {
    window.firebase.auth().signOut();
  }
  render() {
    const { title, items } = this.props;
    return (
      <div className="header">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="">{title}</a>
          <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-expanded="false">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              {items && items.map((item, key) =>
                <li className="nav-item" key={key}>
                  <Link to={item.url} className="nav-link" name={item.title}>{item.title}</Link>
                </li>
              )}
              <li className="nav-item">
                <a href="" className="nav-link" onClick={this.signOut.bind(this)}>
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </nav>

      </div>
    );
  }
}

export default Header;
