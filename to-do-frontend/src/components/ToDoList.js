import React, { Component } from 'react'
import {ToDo} from './'

class ToDoList extends Component {

    render() {
      let viewToDosByStatus = this.props.viewToDosByCategory.filter((todo) => {
        if (this.props.displayOption === 'active' && todo.completed === false) {
          return todo
        } else if (this.props.displayOption === 'complete' && todo.completed === true) {
          return todo
        } else {
          return this.props.displayOption === 'all'
        }
      })

      const sortByDateAdded = viewToDosByStatus.sort((a,b) => b.id - a.id)
      let list = sortByDateAdded.map((todo) => { 
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