import React, { Component } from "react";
import PaintTasks from "./components/PaintTasks";
import NewTask from "./components/NewTask";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.myUpdate = React.createRef();
    this.state = {
      tasks: []
    }

    this.database = window.firebase
      .database()
      .ref(localStorage.getItem('userID') + "/list/" + localStorage.getItem('listID') + "/tasks");

    this.removeTask = this.removeTask.bind(this);
  }

  componentDidMount() {
    let { tasks } = this.state;

    this.database.orderByChild("timestamp").on("child_added", snap => {
      tasks.push({
        id: snap.key,
        status: snap.val().status,
        nameTask: snap.val().nameTask,
        timestamp: snap.val().timestamp
      });

      this.setState({ tasks });
    });

    this.database.on("child_removed", snap => {
      for (let index = 0; index < tasks.length; index++) {
        if (tasks[index].id === snap.key) {
          tasks.splice(index, 1);
        }
      }
      this.setState({ tasks });
    });

    // this.database.on("child_changed", snap => {
    //   this.setState({ tasks: [] });
    //   tasks.push({
    //     id: snap.key,
    //     status: snap.val().status,
    //     nameTask: snap.val().nameTask,
    //     timestamp: snap.val().timestamp
    //   });
    //   this.setState({ tasks });
    // });
  }

  removeTask(id) {
    this.database.child(id).remove();
  }

  createTask(nameTask) {
    window.firebase.database().ref(localStorage.getItem('userID') + "/list/" + localStorage.getItem('listID') + "/tasks").push().set({
      nameTask: nameTask,
      status: 'todo',
      timestamp: window.firebase.database.ServerValue.TIMESTAMP
    });
  }

  render() {
    return (
      <div className="container">
        <div className="profile">
          <h2>Tasks</h2>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <h3>To do</h3>
            <div className="form-group">
              <NewTask createTask={this.createTask} />
            </div>
            {this.state.tasks.map(task => {
              let paintTasks = '';
              if (task.status === 'todo') {
                paintTasks = (<PaintTasks
                  // ref={this.myUpdate}
                  key={task.id}
                  id={task.id}
                  status={task.status}
                  nameTask={task.nameTask}
                  timestamp={task.timestamp}
                  removeTask={this.removeTask}
                />)
              }
              return (paintTasks);
            })}
          </div>
          <div className="col-sm-4">
            <h3>Doing</h3>
            {this.state.tasks.map(task => {
              let paintTasks = '';
              if (task.status === 'doing') {
                paintTasks = (<PaintTasks
                  key={task.id}
                  id={task.id}
                  status={task.status}
                  nameTask={task.nameTask}
                  timestamp={task.timestamp}
                  removeTask={this.removeTask}
                />)
              }
              return (paintTasks);
            })}
          </div>
          <div className="col-sm-4">
            <h3>Done</h3>
            {this.state.tasks.map(task => {
              let paintTasks = '';
              if (task.status === 'done') {
                paintTasks = (<PaintTasks
                  key={task.id}
                  id={task.id}
                  status={task.status}
                  nameTask={task.nameTask}
                  timestamp={task.timestamp}
                  removeTask={this.removeTask}
                />)
              }
              return (paintTasks);
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Tasks;