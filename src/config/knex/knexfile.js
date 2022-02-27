require("dotenv").config({ path: "../../../.env" })
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
}
