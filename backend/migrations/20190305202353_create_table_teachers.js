
exports.up = function(knex, Promise) {
    return knex.schema.createTable('teachers', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('phone').notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('teachers')
};
