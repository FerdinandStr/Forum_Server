exports.up = function (knex) {
    console.log("Creating foreneintrag table...")
    return knex.schema.createTable("foreneintrag", (table) => {
        table.increments("id_foreneintrag")
        table.integer("id_forum").unsigned().notNullable().references("forum.id_forum")
        table.string("name", 255).notNullable()
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    console.log("Dropping foreneintrag table...")
    return knex.schema.dropTable("foreneintrag")
}
