const bookshelf = require ('./bookshelf')

const ToDo = bookshelf.Model.extend({
    tableName: 'toDos',
    category: function () {
        return this.belongsTo(Category)
    }
})

const Category = bookshelf.Model.extend({
    tableName: 'categories',
    toDos: function() {
        return this.hasMany(ToDo)
    }
})

module.exports = ToDo, Category