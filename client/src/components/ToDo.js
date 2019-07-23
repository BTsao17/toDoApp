import React, { Component } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';

class ToDo extends Component {
  completedTask = (e) => {
    this.props.changeCompleted(e.target.value);
  };

  render() {
    return (
      <ListGroup.Item className="tasksList-item">
      <input
        type="checkbox"
        value={this.props.id}
        onChange={this.completedTask}
        checked={this.props.completed === true ? true : false}
      />
      <label className={this.props.completed === true ? 'done' : ''}>{this.props.task}</label>
      </ListGroup.Item>

      // <li className="list-group-item">
      //   <input
      //     type="checkbox"
      //     value={this.props.id}
      //     onChange={this.completedTask}
      //     checked={this.props.completed === true ? true : false}
      //   />
      //   <label className={this.props.completed === true ? 'done' : ''}>{this.props.task}</label>
      // </li>
    );
  }
}

export default ToDo;
