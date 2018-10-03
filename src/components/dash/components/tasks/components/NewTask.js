import React, { Component } from "react";

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.createTask = this.createTask.bind(this);
  }

  createTask(e) {
    e.preventDefault();
    if (this.textInput.value !== '') {
      this.props.createTask(this.textInput.value);
      this.textInput.value = "";
      this.textInput.focus();
    }else{
      alert('Please write a task')
    }
  }

  render() {
    return (
      <div className="createPost">
        <form>
          <div className="form-group">
            <label>New task</label>
            <textarea
              ref={input => (this.textInput = input)}
              type="name"
              className="form-control"
            />
          </div>
          <a onClick={this.createTask} className="btn" type="submit">
            Add
          </a>
        </form>
      </div>
    );
  }
}

export default CreatePost;
