
exports.up = function(knex, Promise) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('course_id').unsigned().notNullable()
        table.integer('school_year_id').unsigned().notNullable()
        table.date('start_date').notNullable()
        table.date('end_date').notNullable()

        table.foreign('course_id').references('id').inTable('courses')
        table.foreign('school_year_id').references('id').inTable('school_year')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('classes')
};
