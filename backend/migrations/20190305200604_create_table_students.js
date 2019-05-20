
exports.up = function(knex, Promise) {
    return knex.schema.createTable('students', table => {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.string('email').notNullable().unique()
        table.string('phone').notNullable()
        table.date('dt_nasc').notNullable()
        table.string('cpf').notNullable().unique()
        table.string('rg').notNullable().unique()
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('students')
};
