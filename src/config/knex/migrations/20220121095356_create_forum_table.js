exports.up = function (knex) {
    console.log("Creating forum table...")
    return knex.schema.createTable("forum", (table) => {
        table.increments("id_forum")
        table.integer("id_parent_forum").unsigned().notNullable().references("forum.id_forum")
        table.string("name", 255).notNullable()
        table.integer("ersteller").unsigned().notNullable().references("benutzer.id_benutzer") //USER ID
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    console.log("Dropping forum table...")
    return knex.schema.dropTable("forum")
}
