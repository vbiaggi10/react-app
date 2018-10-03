import React, { Component } from "react";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.createList = this.createList.bind(this);
  }

  createList(e) {
    e.preventDefault();
    if (this.textInput.value !== '') {
      this.props.createList(this.textInput.value);
      this.textInput.value = "";
      this.textInput.focus();
    } else {
      alert('Please write a new list')
    }
  }

  render() {
    return (
      <div className="createPost">
        <div className="form-group">
          <label>New list</label>
          <input
            ref={input => (this.textInput = input)}
            type="name"
            className="form-control"
          />
        </div>
        <button onClick={this.createList} className="btn">
          Add
        </button>
      </div>
    );
  }
}

export default CreatePost;
