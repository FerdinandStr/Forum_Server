exports.up = function (knex) {
    console.log("Creating studiengang table...")
    return knex.schema.createTable("studiengang", (table) => {
        table.increments("id_studiengang")
        table.string("name")
        table.string("jahrgang")
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    console.log("Dropping studiengang table...")
    return knex.schema.dropTable("studiengang")
}
