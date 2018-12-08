const categoriesData = require('../data/categories')

exports.seed = function(knex, Promise) {
  return knex('categories').del()
    .then( () => {
      return knex('categories').insert(categoriesData);
    })
}
