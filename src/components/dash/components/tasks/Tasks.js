import React, { Component } from "react";
import PaintTasks from "./components/PaintTasks";
import NewTask from "./components/NewTask";

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.myUpdate = React.createRef();
    this.state = {
      tasks: [],
      aux: 0
    }

    this.database = window.firebase
      .database()
      .ref(localStorage.getItem('userID') + "/list/" + localStorage.getItem('listID') + "/tasks");

    this.removeTask = this.removeTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
  }

  componentDidMount() {
    let { tasks } = this.state;
    this.database.orderByChild("timestamp").on("child_added", snap => {
      // tasks = [];
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

    this.database.on("child_changed", snap => {
      tasks.map(task => {
        if (task.id === snap.key) {
          const indexUpdate = tasks.indexOf(task)
          delete tasks[indexUpdate];
        }
      })
      tasks.push({
        id: snap.key,
        status: snap.val().status,
        nameTask: snap.val().nameTask,
        timestamp: snap.val().timestamp
      });
      this.setState({ tasks });
    });
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

  updateTask(node, id, nameTask, status, timestamp) {
    const updateBD = () => {
      const taskData = {
        nameTask: nameTask,
        status: status,
        timestamp: timestamp
      };

      const updatesTask = {};

      updatesTask[
        localStorage.getItem("userID") + "/list/" + localStorage.getItem("listID") + "/tasks/" + id
      ] = taskData;
      return window.firebase
        .database()
        .ref()
        .update(updatesTask);
    }

    if (node !== '') {
      if (this.state.aux === 0) {
        this.setState({ aux: 1 });
        node.disabled = false;
      } else {
        this.setState({ aux: 0 });
        updateBD()
        node.disabled = true;
      }
    } else {
      updateBD()
    }
  }

  render() {
    return (
      <div className="container">
        <div className="profile">
          <h2>Tasks</h2>
        </div>
        <div className="row">
          <div className="col-sm-4 target-tasks">
            <h3>To do</h3>
            <div className="form-group">
              <NewTask createTask={this.createTask} />
            </div>
            {this.state.tasks.map(task => {
              let paintTasks = '';
              if (task.status === 'todo') {
                paintTasks = (<PaintTasks
                  ref={this.myUpdate}
                  key={task.id}
                  id={task.id}
                  status={task.status}
                  nameTask={task.nameTask}
                  timestamp={task.timestamp}
                  removeTask={this.removeTask}
                  updateTask={this.updateTask}
                />)
              }
              return (paintTasks);
            })}
          </div>
          <div className="col-sm-4 target-tasks">
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
                  updateTask={this.updateTask}
                />)
              }
              return (paintTasks);
            })}
          </div>
          <div className="col-sm-4 target-tasks">
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
                  updateTask={this.updateTask}
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