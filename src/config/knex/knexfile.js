// Update with your config settings.

//running migration
//npx knex migrate:latest --knexfile .\src\config\knex\knexfile.js --env postgresql
//npx knex migrate:latest --knexfile .\src\config\knex\knexfile.js --env sqlite

//INFO cheatsheet!!!
//https://devhints.io/knex

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
            database: "forum_db", //TODO!!!!!!!!!
            user: "root", //TODO!!!!!!!!!
            password: "ForumLTMF20postgreSQL14", //TODO!!!!!!!!!
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
