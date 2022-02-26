import knex from "knex"
import knexfile from "./knexfile"

// # GLOBAL POSTGRES TYPE CONVERSION //
var types = require("pg").types
// string to int for count functions (can cause problems with postgres int8/bigint)
types.setTypeParser(20, function (val) {
    return parseInt(val, 10)
})
// # //

const dbConnection = knex(knexfile.postgresql)

export default dbConnection
