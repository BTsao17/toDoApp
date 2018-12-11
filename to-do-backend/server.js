const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || process.argv[2] || 8080

const toDoRouter = require('./routes/toDos')

app.use(bodyParser.json())
app.use(cors())
app.use('/toDos', toDoRouter)

//testing
const Model = require('./models/models')
//create new row in ToDos - successful and changed my original toDopost controller.

// const newToDo = new Model.ToDo({
//     task: 'Vacuum the carpet',
//     completed: false,
//     category_id: 1
// })
// newToDo.save()
// .then(toDo => {
//     console.log(toDo.attributes)
// })

//fetch all Categories
// Model.Category
//     .fetchAll()
//     .then(categories => {
//         //console.log(categories.models)
//         console.log(categories.models.map(category => category.attributes))
//     })

app.get('/category', (request, response) => {
    Model.Category
        .fetchAll()
        .then(categories => {
            const data = categories.models.map(category => category.attributes)
            //console.log(data)
            response.json(data)
        })
        .catch(err => console.log(err))
})

//fetch based on category ID
// Model.ToDo
//     .where('category_id', 1)
//     .fetchAll()
//     .then(toDos => {
//         console.log(toDos.models.map(toDo => toDo.attributes))
//     })

app.get('/:categoryID', (request, response) => {
    //console.log(request.params)
    const { categoryID } = request.params //data type is a string
    //console.log(typeof categoryID)

    if (Number(categoryID) === 0) {
        Model.ToDo
        .fetchAll()
        .then(toDos => {
            const data = toDos.models.map(toDo => toDo.attributes)
            response.json(data)
        })
        .catch(err => console.log(err))
    } else {
        Model.ToDo
            .where('category_id', Number(categoryID))
            .fetchAll()
            .then(toDos => {
                const data = toDos.models.map(toDo => toDo.attributes)
                //console.log(data)
                response.json(data)
            })
    }
})

app.listen(port, () => {
    console.log(`listening at ${port}`)
})