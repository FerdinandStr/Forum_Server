exports.up = function (knex) {
    console.log("Creating rolle table...")
    return knex.schema.createTable("rolle", (table) => {
        table.increments("id_rolle")
        table.string("name").notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    console.log("Dropping rolle table...")
    return knex.schema.dropTable("rolle")
}
