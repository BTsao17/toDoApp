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
  handleSubmit = (e) => {
    this.props.addCategory(this.state);
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
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Category Name:</Form.Label>
              <Form.Control id="newCategory" type="text" value={this.state.newCategory} onChange={this.handleChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onHide}>
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
      </Modal>
    );
  }
}

export default AddCategoryModal;