import React, { Component } from 'react';
import { AddCategoryModal } from './';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import Modal from 'react-bootstrap/Modal';

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

// class AddCategoryModal extends Component {
//   constructor() {
//     super();
//     this.state = {
//       newCategory: '',
//     };
//   }
//   handleChange = (e) => {
//     this.setState({
//       [e.target.id]: e.target.value,
//     });
//   };
//   handleSubmit = (e) => {
//     this.props.addCategory(this.state);
//     this.setState({
//       newCategory: '',
//     });
//     this.props.onHide();
//   };
//   render() {
//     return (
//       <Modal show={this.props.show} size="lg" centered>
//         <Modal.Header>
//           <Modal.Title>Custom Category</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Category Name:</Form.Label>
//               <Form.Control id="newCategory" type="text" value={this.state.newCategory} onChange={this.handleChange} />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={this.props.onHide}>
//             Close
//           </Button>
//           <Button
//             type="submit"
//             variant="info"
//             onClick={this.handleSubmit}
//             disabled={this.state.newCategory === '' ? true : false}
//           >
//             Add
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     );
//   }
// }

export default AddToDoForm;
