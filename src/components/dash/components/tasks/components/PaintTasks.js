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
      status: props.status
    };
    // this.handleInput = this.handleInput.bind(this);
  }

  handleRemove(id) {
    this.props.removeTask(id);
  }

  handleUpdate(e) {
    const node = this.myRef.current;
    this.props.updateTask(node, this.id, this.state.nameTask, this.status, this.timestamp);
    // const node = this.myRef.current;
    
  }

  handleChange(e){
    this.setState({nameTask: e.target.value})
  }

  isActive(value) {
    return 'btn-status mr-3 text-muted ' + ((value === this.status) ? 'btn-active' : 'default');
  }

  handleInput(e) {
    this.props.updateTask('', this.id, this.state.nameTask, e.target.name, this.timestamp);
  }

  render() {
    return (
      <div className="card mt-3 mb-3">
        <div className="card-body">
          <div className="card-subtitle mb-2 ">
            <a className={this.isActive("todo")} name="todo" onClick={this.handleInput.bind(this)}>To do</a>
            <a className={this.isActive("doing")} name="doing" onClick={this.handleInput.bind(this)}>Doing</a>
            <a className={this.isActive("done")} name="done" onClick={this.handleInput.bind(this)}>Done</a>
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
