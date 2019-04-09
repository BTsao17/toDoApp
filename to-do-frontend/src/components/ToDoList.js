import React, { Component } from 'react';
import { ToDo } from './';

class ToDoList extends Component {
  render() {
    let viewToDosByStatus = this.props.viewToDosByCategory.filter((todo) => {
      if (this.props.displayOption === 'active' && todo.completed === false) {
        return todo;
      }
      else if (this.props.displayOption === 'complete' && todo.completed === true) {
        return todo;
      }
      else {
        return this.props.displayOption === 'all';
      }
    });

    //Sorting - work in progress -> before implementation, need to first figure out how show clear separation of each category when viewing all categories'
    const sortByCategory = [ ...viewToDosByStatus ].sort((a, b) => {
      if (a.category_id > b.category_id) {
        return 1;
      }
      if (a.category_id < b.category_id) {
        return -1;
      }
      if (a.category_id === b.category_id) {
        if (a.completed === b.completed) {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
        }
        if (a.completed) {
          return 1;
        }
        if (!a.completed) {
          return -1;
        }
      }
      return 0;
    });

    const sortByCompletion = [ ...viewToDosByStatus ].sort(
      (a, b) => (a.completed === b.completed ? (a.id > b.id ? -1 : 1) : a.completed ? 1 : -1)
    );
    const sortByDateAdded = [ ...viewToDosByStatus ].sort((a, b) => b.id - a.id);

    //different way of sorting the list depending on if specific categories are chosen.
    let conditionalSortingRendering = this.props.categoryOption === '0' ? sortByDateAdded : sortByCompletion;
    const list = conditionalSortingRendering.map((todo) => {
      return (
        <ToDo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          completed={todo.completed}
          changeCompleted={this.props.changeCompleted}
        />
      );
    });

    //console.log(conditionalSortingRendering)
    // console.log(sortByCategory)

    return <ul className="list-group">{list}</ul>;
  }
}

export default ToDoList;
