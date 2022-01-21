exports.up = function (knex) {
    console.log("Creating rolle_benutzer_tab table...")
    return knex.schema.createTable("rolle_benutzer_tab", (table) => {
        table.integer("id_benutzer").unsigned().notNullable().references("benutzer.id_benutzer")
        table.integer("id_rolle").unsigned().notNullable().references("rolle.id_rolle")
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    console.log("Dropping rolle_benutzer_tab table...")
    return knex.schema.dropTable("rolle_benutzer_tab")
}
