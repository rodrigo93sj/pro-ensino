
exports.up = function(knex, Promise) {
    return knex.schema.createTable('school_year', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('year').notNullable()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('school_year')
};
