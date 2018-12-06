const express = require('express')
const router = express.Router()

const ToDoController = require('../controllers/toDo')

router.get('/', (request, response) => {
    ToDoController
        .getToDos()
        .then(toDos => response.json(toDos))
        .catch(err => console.log(err))
})

router.post('/', (request, response) => {
    const {
        toDo
    } = request.body
    ToDoController
        .addToDo(toDo)
        .then(toDo => response.json(toDo))
        .catch(err => console.log(err))
})

router.put('/', (request, response) => {
    const {
        toDo
    } = request.body
    ToDoController
    .updateToDo(toDo)
    .then(toDo => response.json(toDo))
    .catch(err => console.log(err))
})

router.delete('/', (request, response) => {
    const {
        id
    } = request.body
    ToDoController
    .deleteToDo(id)
    .then(toDo => response.json(toDo))
    .catch(err => console.log(err))
})

module.exports = router