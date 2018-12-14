import React, { Component } from 'react'

class AddNewCategory extends Component {
    constructor() {
      super()
      this.state = {
        newCategory: ''
      }
    }
  
    handleChange = e => {
      this.setState({
        [e.target.id]: e.target.value
      })
    }
  
    handleSubmit = (e) => {
      //e.preventDefault()
      this.props.addCategory(this.state)
      this.setState({
        newCategory: ''
      })
    }
  
    render() {
  
      return (
        <div>
          <button type="button"
            data-toggle="modal"
            data-target="#addCategoryForm"
          > Add Category
          </button>
  
          <div className="modal fade"
            id="addCategoryForm"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle">Custom Category</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <form>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="newCategory" className="col-form-label">Category Name:</label>
                      <input type="text"
                        className="form-control"
                        id="newCategory"
                        value={this.state.newCategory}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit"
                      className="btn btn-info"
                      onClick={this.handleSubmit}
                      disabled={this.state.newCategory === '' ? true : false}
                      data-dismiss="modal"
                    >Add</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
  
        </div>
      )
    }
  }

export default AddNewCategory