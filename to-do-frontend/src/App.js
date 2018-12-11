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
      categoryOption: ''
    }
  }

  addToDoList = (toDo) => {
    axios
      .post(`${baseUrl}/toDos`, { toDo })
      .then((response) => {
        const { toDoArr } = this.state;
        const newtoDoArr = [response.data].concat(toDoArr)
        this.setState({
          toDoArr: newtoDoArr
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
      displayOption: e.target.value
    })
  }

  selectedCategory = (e) => {
    this.setState({
      categoryOption: e.target.value
    }
      //, () => this.viewToDoByCategory()
    )
  }

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
    //combining two get requests
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

    //for drop down menu for filtering of tasks by category -> const will need to be changed to "let" when we want to customize categories
    const categoryList = this.state.categories.map((category) => {
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
          <select value={this.state.displayOption} onChange={this.selectedView}>
            <option value='all'>all</option>
            <option value='active'>active</option>
            <option value='complete'>complete</option>
          </select>

          <button className='pull-right btn btn-default'
            onClick={this.clearCompleted}
            disabled={disableButton ? false : true}
          >Clear All Completed</button>


          <label>Categories:</label>
          <select onChange={this.selectedCategory}>
            <option value='0'>All</option>
            {categoryList}
          </select>

          <button> Add Category</button>


          <span className='counter--block float-right'>
            <span className='counter__type'>All: {this.state.toDoArr.length}</span>
            <span className='counter__type'>Active: {countTask.false}</span>
            <span className='counter__type'>Complete: {countTask.true}</span>
          </span>
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

export default App
