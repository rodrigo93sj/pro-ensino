
exports.up = function(knex, Promise) {
    return knex.schema.createTable('enroll_student', table => {
        table.increments('id').primary()
        table.integer('student_id').unsigned().notNullable()       
        table.integer('course_id').unsigned().notNullable()
        table.integer('class_id').unsigned().notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.boolean('status').notNullable().defaultTo(true)

        table.foreign('student_id').references('id')
            .inTable('students')
        table.foreign('course_id').references('id')
            .inTable('courses')
        table.foreign('class_id').references('id')
            .inTable('classes')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('enroll_student')
};
