//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql
//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql migrate:make create_benutzer_table
//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql migrate:latest
//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql seed:make 00_forum_data
//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql seed:run
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env
module.exports = {
    postgresql: {
        client: "postgresql",
        connection: {
            host: DB_HOST,
            port: DB_PORT,
            database: DB_NAME,
            user: DB_USER,
            password: DB_PASS,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    production: {
        client: "postgresql",
        connection: {
            database: "my_db",
            user: "username",
            password: "password",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
}
