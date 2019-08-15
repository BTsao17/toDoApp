import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class AddCategoryModal extends Component {
  constructor() {
    super();
    this.state = {
      newCategory: '',
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = () => {
    this.props.addCategory(this.state);
    this.setState({
      newCategory: '',
    });
    this.props.onHide();
  };

  handleClose = () => {
    this.setState({
      newCategory: '',
    });
    this.props.onHide();
  };

  render() {
    return (
      <Modal show={this.props.show} size="lg" centered>
        <Modal.Header>
          <Modal.Title>Custom Category</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
            <Form.Group>
              <Form.Label>Category Name:</Form.Label>
              <Form.Control id="newCategory" type="text" value={this.state.newCategory} onChange={this.handleChange} />
            </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button
            type="submit"
            variant="info"
            onClick={this.handleSubmit}
            disabled={this.state.newCategory === '' ? true : false}
          >
            Add
          </Button>
        </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}

export default AddCategoryModal;