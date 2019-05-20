module.exports = {
    client: 'postgresql',
    connection: {
        database: 'db_school',
        user:     'postgres',
        password: '7416',
        dateStrings: true
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};
