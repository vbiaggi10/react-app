import React, { Component } from 'react';
import Header from './components/Header';
// import ContentMuro from './components/wall/Wall'
// import Profile from './components/profile/Profile';
import Content from './components/Content';
// import firebase from 'firebase';
import items from '../../data/menuDash'
class Dash extends Component {

    render() {
        const { body } = this.props;
        return (
        <div className="main">
            <Header props={this.props} title="TO DO LIST" items={items} />
            <Content body={body} />
        </div>
    )
    }

}
export default Dash;