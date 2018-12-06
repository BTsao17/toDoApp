const express = require('express')
const app = express()
const bodyParser = require ('body-parser')
const cors = require('cors')
const port = process.env.PORT || process.argv[2] || 8080

const toDoRouter = require('./routes/toDos')

app.use(bodyParser.json())
app.use(cors())
app.use('/toDos', toDoRouter)

app.listen(port, () => {
    console.log(`listening at ${port}`)
})