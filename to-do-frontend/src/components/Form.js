import React, { Component } from 'react'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      task: '',
      completed: false,
      categoryOption: ''
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    //e.preventDefault() //is preventDefault still necessary? 
    this.props.addToDoList(this.state)
    this.setState({
      task: '',
      categoryOption: ''
    })
  }

  render() {
    return (
      <form>
        <div className='input-group'>
          <span className='input-group-btn'>
            <button
              className='btn btn-info'
              type='submit'
              onClick={this.handleSubmit}
              disabled={(this.state.task === '' || this.state.categoryOption === '') ? true : false}
            >Add</button>
          </span>
          <input id='task'
            className='form-control'
            placeholder='Add a task'
            onChange={this.handleChange}
            value={this.state.task} />
            <span>
              <select id='categoryOption'
              className='form-control'
              onChange={this.handleChange}
              value={this.state.categoryOption}>
                <option value=''>Select a Category</option>
                {this.props.categoryList}
              </select>
            </span>
        </div>
      </form>
    )
  }
}

export default Form