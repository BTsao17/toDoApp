exports.up = function(knex, Promise) {
  knex.schema.hasTable('toDos')
    .then(function(exists) {
      if (!exists) {
        return knex.schema.createTable('toDos', function(table) {
          table.increments('id').primary();
          table.string('task').notNullable();
          table.boolean('completed').notNullable();
        });
      }
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('toDos');
};
