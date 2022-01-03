exports.up = function (knex) {
    console.log("Creating Tables...")
    return knex.schema
        .createTable("benutzer", (table) => {
            table.increments("id_benutzer")
            table.string("vorname")
            table.string("nachname")
            table.string("email").notNullable()
            table.string("passwort").notNullable()
            table.string("bild_pfad")
            table.integer("status_aktiv").notNullable().defaultTo("1")
            table.timestamps(true, true)
        })
        .createTable("forum", (table) => {
            table.increments("id_forum")
            table.integer("id_parent_forum").unsigned().notNullable().references("forum.id_forum")
            table.string("name", 255).notNullable()
            table.integer("ersteller").unsigned().notNullable().references("benutzer.id_benutzer") //USER ID
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
            table.string("inhalt", 65535).notNullable()
            table.timestamps(true, true)
        })
        .then(async () => {
            console.log("Tables Created - Inserting Data...")
            await knex("benutzer").insert({
                id_benutzer: 1,
                vorname: "SYSTEM",
                nachname: "SYSTEM",
                email: "SYSTEM",
                passwort: "",
                bild_pfad: "",
                status_aktiv: 0,
            })
            await knex("forum").insert([
                {
                    // id_forum: 1,
                    id_parent_forum: 1,
                    name: "Hauptforum",
                    ersteller: 1,
                },
                {
                    id_parent_forum: 1,
                    name: "Wirtschaftsinformatik",
                    ersteller: 1,
                },
                {
                    id_parent_forum: 1,
                    name: "Informatik",
                    ersteller: 1,
                },
            ])

            console.log("FINISHED")
        })
}

exports.down = function (knex) {
    return knex.schema.dropTable("beitrag").dropTable("foreneintrag").dropTable("forum").dropTable("benutzer")
}
