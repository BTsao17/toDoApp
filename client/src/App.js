import React, { Component } from 'react';
import { AddToDoForm, ToDoList, AddNewCategory } from './components';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

class App extends Component {
  constructor() {
    super();
    this.state = {
      toDoArr: [],
      displayOption: 'active',
      categories: [],
      categoryOption: '0',
    };
  }

  addToDoList = (toDo) => {
    axios
      .post(`/toDos`, { toDo })
      .then((response) => {
        const { toDoArr } = this.state;
        const newtoDoArr = [ response.data ].concat(toDoArr);
        this.setState({
          toDoArr: newtoDoArr,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addCategory = (category) => {
    axios
      .post(`/category`, { category })
      .then((response) => {
        const { categories } = this.state;
        const newCategories = categories.concat([ response.data ]);
        this.setState({
          categories: newCategories,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  changeCompleted = (id) => {
    const { toDoArr } = this.state;
    toDoArr.forEach((toDo) => {
      if (toDo.id === Number(id)) {
        if (!toDo.completed) {
          toDo.completed = true;
        }
        else {
          toDo.completed = false;
        }
        axios.put(`/toDos`, { toDo }).catch((err) => {
          console.log(err);
        });
      }
    });
    this.setState({
      toDoArr,
    });
  };

  clearCompleted = () => {
    const { toDoArr, categoryOption } = this.state;
    let activeTasks = toDoArr.filter((todo) => {
      if (categoryOption === '0') {
        if (todo.completed === true) {
          axios.delete(`/toDos`, { data: { id: todo.id } }).catch((err) => {
            console.log(err);
          });
        }
        return todo.completed === false;
      }
      else {
        if (todo.completed === true && Number(categoryOption) === todo.category_id) {
          axios.delete(`/toDos`, { data: { id: todo.id } }).catch((err) => {
            console.log(err);
          });
        }
        else if (todo.completed === true && Number(categoryOption) !== todo.category_id) {
          return todo.completed === true;
        }
        return todo.completed === false;
      }
    });
    this.setState({
      toDoArr: activeTasks,
    });
  };

  selectedView = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

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
    Promise.all([ axios.get(`/toDos`), axios.get(`/category`) ])
      .then(([ toDosResponse, categoriesResponse ]) => {
        this.setState({
          toDoArr: toDosResponse.data,
          categories: categoriesResponse.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { displayOption } = this.state;

    let viewToDosByCategory = this.state.toDoArr.filter((todo) => {
      if (Number(this.state.categoryOption) === 0) {
        return todo;
      }
      else {
        return Number(this.state.categoryOption) === todo.category_id;
      }
    });

    let showDelBut = viewToDosByCategory.find((task) => {
      return task.completed;
    });

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

    let countTask = viewToDosByCategory.reduce((acc, currV) => {
      let key = currV['completed'];
      if (typeof acc[key] === 'undefined') {
        acc[key] = 1;
      }
      else {
        acc[key] += 1;
      }
      return acc;
    }, {});

    const sortCategoryByABC = this.state.categories.sort((a, b) => {
      let categoryA = a.category.toUpperCase();
      let categoryB = b.category.toUpperCase();
      if (categoryA < categoryB) {
        return -1;
      }
      if (categoryA > categoryB) {
        return 1;
      }
      return 0;
    });

    const categoryList = sortCategoryByABC.map((category) => {
      return (
        <option key={category.id} value={category.id}>
          {category.category}
        </option>
      );
    });

    return (
      <Container>
        <h1 className="text-center title">To-Do List</h1>

        <AddToDoForm addToDoList={this.addToDoList} categoryList={categoryList} />

        <div className="otherInfo">

          <div className="toDoCounter">
            <div className="counterType">All: {viewToDosByCategory.length}</div>
            <div className="counterType">Active: {countTask.false === undefined ? 0 : countTask.false}</div>
            <div className="counterType">Completed: {countTask.true === undefined ? 0 : countTask.true}</div>
          </div>
          <AddNewCategory addCategory={this.addCategory} />
        </div>

        <Accordion className="filters">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Filters
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="filterList filterList-padding">
                <div className="catFilter">
                  <Form.Label className="catFilter-label">Categories:</Form.Label>
                  <Form.Control
                    as="select"
                    id="categoryOption"
                    className="catFilter-options"
                    value={this.state.categoryOption}
                    onChange={this.selectedView}
                  >
                    <option value="0">All</option>
                    {categoryList}
                  </Form.Control>
                </div>
                <div className="taskFilter">
                  <Form.Label className="taskFilter-label">Tasks:</Form.Label>
                  <Form.Control
                    as="select"
                    id="displayOption"
                    className="taskFilter-options"
                    value={this.state.displayOption}
                    onChange={this.selectedView}
                  >
                    <option value="all">all</option>
                    <option value="active">active</option>
                    <option value="complete">complete</option>
                  </Form.Control>
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>

        <ToDoList
          viewToDosByCategory={viewToDosByCategory}
          displayOption={this.state.displayOption}
          categoryOption={this.state.categoryOption}
          changeCompleted={this.changeCompleted}
        />

        {displayOption !== 'active' &&
        showDelBut && (
          <Button variant="info" onClick={this.clearCompleted}>
            Delete All Completed Tasks
          </Button>
        )}
      </Container>
    );
  }
}

export default App;
