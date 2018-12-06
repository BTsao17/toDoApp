import React, { Component } from 'react'

class Form extends Component {
  constructor() {
    super()
    this.state = {
      task: '',
      completed: false
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addToDoList(this.state)
    this.setState({
      task: ''
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
              disabled={this.state.task === '' ? true : false}
            >Add</button>
          </span>
          <input id='task'
            className='form-control'
            placeholder='add a task'
            onChange={this.handleChange}
            value={this.state.task} />
        </div>
      </form>
    )
  }
}

export default Form