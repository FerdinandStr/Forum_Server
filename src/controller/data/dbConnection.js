import knex from "knex"
import knexfile from "../../config/knex/knexfile"

const dbConection = knex(knexfile.postgresql)

export default dbConection
