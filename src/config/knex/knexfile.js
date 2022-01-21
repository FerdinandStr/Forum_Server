//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql
//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql migrate:make create_benutzer_table
//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql migrate:latest
//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql seed:make 00_forum_data
//npx knex  --knexfile .\src\config\knex\knexfile.js --env postgresql seed:run

module.exports = {
    //   development: {
    //     client: 'sqlite3',
    //     connection: {
    //       filename: './dev.sqlite3'
    //     }
    //   },

    postgresql: {
        client: "postgresql",
        connection: {
            host: "192.168.2.148",
            port: 5432,
            database: "forum_db", //TODO!!!!!!!!!.env
            user: "root", //TODO!!!!!!!!!.env
            password: "ForumLTMF20postgreSQL14", //TODO!!!!!!!!!.env
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
    sqlite: {
        client: "sqlite",
        connection: {
            //FILE
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
