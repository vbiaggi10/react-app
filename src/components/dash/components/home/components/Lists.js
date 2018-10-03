import React, { Component } from "react";
import NewList from "./NewList";
import PaintList from "./PaintList";

class Lists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      messages: [],
      uid: null
    };
    this.database = window.firebase
      .database()
      .ref(localStorage.getItem("userID") + "/list/");

    this.removeList = this.removeList.bind(this);
    this.addPost = this.addPost.bind(this);
  }

  componentDidMount() {
    let { lists } = this.state;

    this.database.orderByChild("timestamp").on("child_added", snap => {
      lists.push({
        id: snap.key,
        nameList: snap.val().nameList,
        timestamp: snap.val().timestamp
      });

      this.setState({ lists });
    });

    this.database.on("child_removed", snap => {
      for (let index = 0; index < lists.length; index++) {
        if (lists[index].id === snap.key) {
          lists.splice(index, 1);
        }
      }
      this.setState({ lists });
    });
  }

  removeList(id) {
    this.database.child(id).remove();
  }

  addPost(message, selected) {
    this.database.push().set({
      body: message,
      privacy: selected,
      uid: localStorage.getItem("userID"),
      userName: localStorage.getItem("user"),
      userEmail: localStorage.getItem("userEmail"),
      count: 0,
      timestamp: window.firebase.database.ServerValue.TIMESTAMP
    });
  }

  createList(nameList) {
    window.firebase
      .database()
      .ref(localStorage.getItem("userID") + "/list/")
      .push()
      .set({
        nameList: nameList,
        timestamp: window.firebase.database.ServerValue.TIMESTAMP
      });
  }

  render() {
    return (
      <div className="col-sm-12 mt-3">
        <div className="create-post col">
          <NewList createList={this.createList} />
          {/* <CreatePost addPost={this.addPost} /> */}
        </div>
        <div>
          <h3 className="mt-4">Lists</h3>
          <div />
          <div>
            {this.state.lists.map(list => {
              return (
                <PaintList
                  key={list.id}
                  id={list.id}
                  nameList={list.nameList}
                  timestamp={list.timestamp}
                  removeList={this.removeList}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Lists;
