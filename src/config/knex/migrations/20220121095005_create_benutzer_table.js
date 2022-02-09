exports.up = function (knex) {
    console.log("Creating benutzer table...")
    return knex.schema.createTable("benutzer", (table) => {
        table.increments("id_benutzer")
        table.integer("id_studiengang")
        table.string("vorname")
        table.string("nachname")
        table.string("passwort").notNullable()
        table.string("email").notNullable().unique("email")
        table.string("bild_pfad")
        table.integer("status_aktiv").notNullable().defaultTo("1")
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    console.log("Dropping benutzer table...")
    return knex.schema.dropTable("benutzer")
}
