import React, { Component } from 'react'
import {ToDo} from './'

class ToDoList extends Component {

    render() {
      this.props.splitToDos.sort((a,b) => b.id - a.id)
      let list = this.props.splitToDos.map((todo) => { 
        return <ToDo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          changeCompleted={this.props.changeCompleted} />
      });
  
      return (
        <ul className='list-group'>
          {list}
        </ul>
      );
    }
  }

export default ToDoList