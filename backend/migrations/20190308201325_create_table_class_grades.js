
exports.up = function(knex, Promise) {
    return knex.schema.createTable('class_grade', table => {
        table.increments('id').primary()
        table.integer('student_id').unsigned().notNullable()
        table.integer('subject_id').unsigned().notNullable()
        table.integer('school_period_id').unsigned().notNullable()
        table.float('grade').notNullable()

        table.foreign('student_id').references('id').inTable('students')
        table.foreign('subject_id').references('id').inTable('subjects')
        table.foreign('school_period_id').references('id').inTable('school_period')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('class_grade')
};
