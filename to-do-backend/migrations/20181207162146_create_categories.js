exports.up = function (knex, Promise) {
    knex.schema.hasTable('categories')
        .then(function (exists) {
            if (!exists) {
                return knex.schema.createTable('categories', function (table) {
                    table.increments('id').primary()
                    table.string('category').notNullable()
                })
            }
        })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('categories')
}