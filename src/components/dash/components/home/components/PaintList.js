import React, { Component } from "react";
import { Link } from "react-router-dom";

class PaintList extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.nameList = props.nameList;
    this.timestamp = props.timestamp;
    this.myRef = React.createRef();
    this.state = {
      nameList: props.nameList,
      aux: 0
    };
  }

  handleInput(id) {
    if (this.id === id) {
        localStorage.setItem("listID", this.id);
      } else {
        localStorage.removeItem("listID");
      }
  }

  handleRemove(id) {
    this.props.removeList(id);
  }

  handleChange(e){
    this.setState({nameList: e.target.value})
  }

  handleUpdate(e) {
    const node = this.myRef.current;
    if (this.state.aux === 0) {
      this.setState({ aux: 1 });
      node.disabled = false;
    } else {
      this.setState({ aux: 0 });
      const listData = {
        nameList: this.state.nameList,
        timestamp: this.timestamp
      };

      const updatesList = {};

      updatesList[
        localStorage.getItem("userID") + "/list/" + this.id
      ] = listData;

      node.disabled = true;

      return window.firebase
        .database()
        .ref()
        .update(updatesList);
    }
  }

  render() {
    return (
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <input
            ref={this.myRef}
            className="form-control"
            value={this.state.nameList}
            onChange={this.handleChange.bind(this)}
            disabled="disabled"
          />
          <Link
            to="/tasks/"
            onClick={() =>{this.handleInput(this.id)}}
          >
            See tasks
          </Link>
          <div>
            <a
              onClick={() => this.handleRemove(this.id)}
              className="btn btn-primary"
            >
              Delete
            </a>
            <a onClick={() => this.handleUpdate()} className="btn btn-primary">
              Edit
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default PaintList;
