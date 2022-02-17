exports.up = function (knex) {
    console.log("Creating kategorie table...")
    return knex.schema.createTable("kategorie", (table) => {
        table.increments("id_kategorie")
        table.string("name").notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    console.log("Dropping kategorie table...")
    return knex.schema.dropTable("kategorie")
}
