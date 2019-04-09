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

app.get('/category', (request, response) => {
  Model.Category
    .fetchAll()
    .then(categories => {
      const data = categories.models.map(category => category.attributes)
      response.json(data)
    })
    .catch(err => console.log(err))
})

app.post('/category', (request, response) => {
  const {
    category
  } = request.body
  const newCategory = new Model.Category({
    category: category.newCategory
  })
  newCategory.save()
    .then(category => {
      const data = category.attributes
      response.json(data)
    })
    .catch(err => console.log(err))
})

//this endpoint no longer necessary as I've changed how we can view to-dos by categories
// app.get('/:categoryID', (request, response) => {
//     const { categoryID } = request.params 
//     if (Number(categoryID) === 0) {
//         Model.ToDo
//         .fetchAll()
//         .then(toDos => {
//             const data = toDos.models.map(toDo => toDo.attributes)
//             response.json(data)
//         })
//         .catch(err => console.log(err))
//     } else {
//         Model.ToDo
//             .where('category_id', Number(categoryID))
//             .fetchAll()
//             .then(toDos => {
//                 const data = toDos.models.map(toDo => toDo.attributes)
//                 //console.log(data)
//                 response.json(data)
//             })
//     }
// })

app.listen(port, () => {
  console.log(`listening at ${port}`)
})