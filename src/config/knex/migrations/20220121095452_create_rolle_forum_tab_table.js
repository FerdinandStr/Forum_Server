exports.up = function (knex) {
    console.log("Creating rolle_forum_tab table...")
    return knex.schema.createTable("rolle_forum_tab", (table) => {
        table.integer("id_forum").unsigned().notNullable().references("forum.id_forum")
        table.integer("id_rolle").unsigned().notNullable().references("rolle.id_rolle")
        table.timestamps(true, true)
    })
}

exports.down = function (knex) {
    console.log("Dropping rolle_forum_tab table...")
    return knex.schema.dropTable("rolle_forum_tab")
}
