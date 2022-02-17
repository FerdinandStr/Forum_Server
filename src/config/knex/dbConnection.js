import knex from "knex"
import knexfile from "./knexfile"

//const dbConnection = knex(knexfile.postgresql)
const dbConnection = knex(knexfile.postgresql_manni)

export default dbConnection
