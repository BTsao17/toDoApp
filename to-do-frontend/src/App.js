import React, { Component } from 'react'
import { Form, ToDoList } from './components'
import axios from 'axios'
import config from './config/config'

const baseUrl = `http://${config.host}:${config.port}`

class App extends Component {
  constructor() {
    super()
    this.state = {
      toDoArr: [],
      displayOption: 'active',
      categories: [],
      categoryOption: '0'
    }
  }

  addToDoList = (toDo) => {
    axios
      .post(`${baseUrl}/toDos`, { toDo })
      .then((response) => {
        const { toDoArr } = this.state
        const newtoDoArr = [response.data].concat(toDoArr)
        this.setState({
          toDoArr: newtoDoArr
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  addCategory = (category) => {
    axios
      .post(`${baseUrl}/category`, { category })
      .then((response) => {
        const { categories } = this.state
        const newCategories = categories.concat([response.data])
        this.setState({
          categories: newCategories
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  changeCompleted = (id) => {
    const { toDoArr } = this.state
    toDoArr.forEach((toDo) => {
      if (toDo.id === Number(id)) {
        if (!toDo.completed) {
          toDo.completed = true
        } else {
          toDo.completed = false
        }
        axios
          .put(`${baseUrl}/toDos`, { toDo })
          .catch((err) => {
            console.log(err)
          })
      }
    })
    this.setState({
      toDoArr
    })
  }

  clearCompleted = () => {
    const { toDoArr } = this.state
    let activeTasks = toDoArr.filter((todo) => {
      if (todo.completed === true) {
        axios.delete(`${baseUrl}/toDos`, { data: { id: todo.id } })
          .catch((err) => {
            console.log(err)
          })
      }
      return todo.completed === false
    })
    this.setState({
      toDoArr: activeTasks
    })
  }

  selectedView = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  //combined selectedView and selected Category as one function instead
  // selectedCategory = (e) => {
  //   this.setState({
  //     categoryOption: e.target.value
  //   }
  //     , () => this.viewToDoByCategory()
  //   )
  // }

  // viewToDoByCategory = () => {
  //   axios
  //     .get(`${baseUrl}/${this.state.categoryOption}`)
  //     .then((response) => {
  //       //console.log(response)
  //       this.setState({
  //         toDoArr: response.data
  //       })
  //     })
  //     .catch(err => console.log(err))
  // }

  componentDidMount() {
    Promise.all([
      axios.get(`${baseUrl}/toDos`),
      axios.get(`${baseUrl}/category`)
    ])
      .then(([toDosResponse, categoriesResponse]) => {
        this.setState({
          toDoArr: toDosResponse.data,
          categories: categoriesResponse.data
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    let disableButton = this.state.toDoArr.find((task) => {
      return task.completed
    })

    let viewToDosByCategory = this.state.toDoArr.filter((todo) => {
      if (Number(this.state.categoryOption) === 0) {
        return todo
      } else {
        return Number(this.state.categoryOption) === todo.category_id
      }
    })

    // let viewToDosByStatus = this.state.toDoArr.filter((todo) => {
    //   if (this.state.displayOption === 'active' && todo.completed === false) {
    //     return todo
    //   } else if (this.state.displayOption === 'complete' && todo.completed === true) {
    //     return todo
    //   } else if (this.state.displayOption === 'all') {
    //     return todo
    //   } else {
    //     return null
    //   }
    // })

    let countTask = this.state.toDoArr.reduce((acc, currV) => {
      let key = currV['completed']
      if (typeof acc[key] === 'undefined') {
        acc[key] = 1
      } else {
        acc[key] += 1
      }
      return acc
    }, {})

    //for drop down menu for filtering of tasks by category
    const sortCategoryByABC = this.state.categories.sort((a, b) => {
      let categoryA = a.category.toUpperCase()
      let categoryB = b.category.toUpperCase()
      if (categoryA < categoryB) {
        return -1
      }
      if (categoryA > categoryB) {
        return 1
      }
      return 0
    })
    const categoryList = sortCategoryByABC.map((category) => {
      return (
        <option key={category.id} value={category.id}>{category.category}</option>
      )
    })

    return (
      <div className='container'>
        <div>
          <h1 className='text-center h1--block'>To-Do List</h1>
        </div>

        <div>
          <label htmlFor='categoryOption'>Categories:</label>
          <select id='categoryOption'
            value={this.state.categoryOption}
            onChange={this.selectedView}
          >
            <option value='0'>All</option>
            {categoryList}
          </select>
        </div>

        <AddNewCategory addCategory={this.addCategory} />

        <select id='displayOption'
          value={this.state.displayOption}
          onChange={this.selectedView}
        >
          <option value='all'>all</option>
          <option value='active'>active</option>
          <option value='complete'>complete</option>
        </select>

        {/* need to change visibility of 'clear all' button to only show when completed tasks are visible */}
        <button className='pull-right btn btn-default'
          onClick={this.clearCompleted}
          disabled={disableButton ? false : true}
        >Clear All Completed To-Dos</button>

        <div className='counter--block float-right'>
          <span className='counter__type'>All: {this.state.toDoArr.length}</span>
          <span className='counter__type'>Active: {countTask.false}</span>
          <span className='counter__type'>Completed: {countTask.true}</span>
        </div>

        <Form addToDoList={this.addToDoList} categoryList={categoryList} />

        <ToDoList viewToDosByCategory={viewToDosByCategory}
          displayOption={this.state.displayOption}
          changeCompleted={this.changeCompleted}
        />

      </div>
    )
  }
}

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

export default App
