
exports.up = function(knex, Promise) {
    return knex.schema.createTable('school_period', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.integer('school_year_id').unsigned().notNullable()

        table.foreign('school_year_id').references('id').inTable('school_year')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('school_period')
};
