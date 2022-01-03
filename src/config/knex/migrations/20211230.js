exports.up = function (knex) {
    return knex.schema
        .createTable("forum", (table) => {
            table.increments("id_forum")
            table.integer("id_parent_forum").unsigned().notNullable().references("forum.id_forum")
            table.string("name", 255).notNullable()
            table.timestamps(true, true)
        })
        .createTable("foreneintrag", (table) => {
            table.increments("id_foreneintrag")
            table.integer("id_forum").unsigned().notNullable().references("forum.id_forum")
            table.string("name", 255).notNullable()
            table.timestamps(true, true)
        })
        .createTable("beitrag", (table) => {
            table.increments("id_beitrag")
            table.integer("id_forum").unsigned().notNullable().references("forum.id_forum")
            table.integer("id_foreneintrag").unsigned().notNullable().references("id_foreneintrag").inTable("foreneintrag")
            table.string("inhalt").notNullable()
            table.timestamps(true, true)
        })
}

exports.down = function (knex) {
    return knex.schema.dropTable("beitrag").dropTable("foreneintrag").dropTable("forum")
}
