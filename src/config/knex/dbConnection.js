import knex from "knex"
import knexfile from "./knexfile"

const dbConnection = knex(knexfile.postgresql)

export default dbConnection
