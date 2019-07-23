import React, { Component } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddToDoForm extends Component {
  constructor() {
    super();
    this.state = {
      task: '',
      completed: false,
      categoryOption: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
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
        <Form.Control id="task" placeholder="New task" onChange={this.handleChange} value={this.state.task} />
        <Form.Control id="categoryOption" as="select" onChange={this.handleChange} value={this.state.categoryOption}>
          <option value="">Select a Category</option>
          {this.props.categoryList}
        </Form.Control>
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
