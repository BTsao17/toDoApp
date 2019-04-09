const bookshelf = require('./bookshelf');

const Category = bookshelf.Model.extend({
  tableName: 'categories',
  toDos: function() {
    return this.hasMany(ToDo);
  },
});

const ToDo = bookshelf.Model.extend({
  tableName: 'toDos',
  category: function() {
    return this.belongsTo(Category);
  },
});

module.exports = {
  ToDo,
  Category,
};
