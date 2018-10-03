import React, { Component } from "react";

class PaintTasks extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.status = props.status;
    this.nameTask = props.nameTask;
    this.timestamp = props.timestamp;
    this.myRef = React.createRef();
    this.myUpdate = React.createRef();
    this.state = {
      nameTask: props.nameTask,
      status: props.status,
      aux: 0
    };
    // this.handleInput = this.handleInput.bind(this);
  }

  handleRemove(id) {
    this.props.removeTask(id);
  }

  handleUpdate(e) {
    const node = this.myRef.current;
    if (this.state.aux === 0) {
      this.setState({ aux: 1 });
      node.disabled = false;
    } else {
      this.setState({ aux: 0 });
      const taskData = {
        nameTask: this.state.nameTask,
        status: this.status,
        timestamp: this.timestamp
      };

      const updatesTask = {};

      updatesTask[
        localStorage.getItem("userID") + "/list/" + localStorage.getItem("listID") + "/tasks/" + this.id
      ] = taskData;

      node.disabled = true;

      return window.firebase
        .database()
        .ref()
        .update(updatesTask);
    }
  }

  handleChange(e){
    this.setState({nameTask: e.target.value})
  }

  isActive(value) {
    return 'btn-status mr-3 text-muted ' + ((value === this.status) ? 'btn-active' : 'default');
  }

  handleInput(e) {
    const taskData = {
      nameTask: this.state.nameTask,
      status: e.target.name,
      timestamp: this.timestamp
    };

    const updatesTask = {};

    updatesTask[
      localStorage.getItem("userID") + "/list/" + localStorage.getItem("listID") + "/tasks/" + this.id
    ] = taskData;

    return window.firebase
      .database()
      .ref()
      .update(updatesTask);
  }

  render() {
    return (
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <div className="card-subtitle mb-2 ">
            <a href="" className={this.isActive("todo")} name="todo" onClick={this.handleInput.bind(this)}>To do</a>
            <a href="" className={this.isActive("doing")} name="doing" onClick={this.handleInput.bind(this)}>Doing</a>
            <a href="" className={this.isActive("done")} name="done" onClick={this.handleInput.bind(this)}>Done</a>
          </div>
          <div className="card-text">
            <input
              ref={this.myRef}
              className="form-control"
              value={this.state.nameTask}
              disabled="disabled"
              onChange={this.handleChange.bind(this)}
            />
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
      </div>
    );
  }
}

export default PaintTasks;
