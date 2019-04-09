exports.up = function(knex, Promise) {
  return knex.schema.table('toDos', function(table) {
    table.integer('category_id').references('categories.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('toDos', (table) => {
    table.dropColumn('category_id');
  });
};
