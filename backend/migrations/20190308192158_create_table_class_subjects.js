
exports.up = function(knex, Promise) {
    return knex.schema.createTable('class_subjects', table => {
        table.integer('class_id').unsigned().notNullable()
        table.integer('subject_id').unsigned().notNullable()
        table.integer('teacher_id').unsigned().notNullable()

        table.foreign('class_id').references('id').inTable('classes')
        table.foreign('subject_id').references('id').inTable('subjects')
        table.foreign('teacher_id').references('id').inTable('teachers')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('class_subjects')
};
