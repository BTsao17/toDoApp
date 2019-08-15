import React, { Component } from 'react';
import { AddCategoryModal } from './';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddToDoForm extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
      completed: false,
      categoryOption: '',
      modalShow: false,
    };
  }

  modalClose = () => {
    this.setState({
      modalShow: false,
    });
  };

  handleChange = (e) => {
    if (e.target.value === 'addNewCategory') {
      console.log('testing modal sucess');
      this.setState({
        modalShow: true,
      });
    }
    else {
      this.setState({
        [e.target.id]: e.target.value,
      });
    }
  };

  handleSubmit = (e) => {
    //e.preventDefault() //is preventDefault still necessary?
    this.props.addToDoList(this.state);
    this.setState({
      task: '',
      categoryOption: '',
    });
  };

  render() {
    return (
      <Form className="newTaskForm">
        <Form.Control
          id="task"
          className="addTask"
          placeholder="New task"
          onChange={this.handleChange}
          value={this.state.task}
        />
        <Form.Control
          id="categoryOption"
          className="addTask"
          as="select"
          onChange={this.handleChange}
          value={this.state.categoryOption}
        >
          <option value="">Select a Category</option>
          {this.props.categoryList}
          <option value="addNewCategory">ADD NEW CATEGORY</option>
        </Form.Control>

        <AddCategoryModal show={this.state.modalShow} onHide={this.modalClose} addCategory={this.props.addCategory} />

        <Button
          className="addTaskBut"
          variant="info"
          type="submit"
          onClick={this.handleSubmit}
          disabled={this.state.task === '' || this.state.categoryOption === '' ? true : false}
        >
          Add Task
        </Button>
      </Form>
    );
  }
}

export default AddToDoForm;
