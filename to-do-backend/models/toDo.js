const bookshelf = require ('./bookshelf')

const ToDo = bookshelf.Model.extend({
    tableName: 'toDos',
})

module.exports = ToDo