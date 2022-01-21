exports.up = function (knex) {
    console.log("Creating beitrag table...")
    return knex.schema.createTable("beitrag", (table) => {
        table.increments("id_beitrag")
        table.integer("id_forum").unsigned().notNullable().references("forum.id_forum")
        table.integer("id_foreneintrag").unsigned().notNullable().references("id_foreneintrag").inTable("foreneintrag")
        table.string("inhalt", 65535).notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    console.log("Dropping beitrag table...")
    return knex.schema.dropTable("beitrag")
}
