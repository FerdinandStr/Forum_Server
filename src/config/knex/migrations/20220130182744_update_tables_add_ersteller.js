//als Beispiel für Anpassung an Tabellen
exports.up = async function (knex) {
    console.log("update foreneintrag with ersteller ...")
    await knex.schema.table("foreneintrag", function (table) {
        table.integer("ersteller").unsigned().notNullable().references("benutzer.id_benutzer") //USER ID
    })
    console.log("update beitrag with ersteller ...")
    await knex.schema.table("beitrag", function (table) {
        table.integer("ersteller").unsigned().notNullable().references("benutzer.id_benutzer") //USER ID
    })
    return true
}

exports.down = async function (knex) {
    console.log("remove ersteller from foreneintrag ...")
    await knex.schema.table("foreneintrag", function (table) {
        table.dropColumn("ersteller")
    })
    console.log("remove ersteller from beitrag ...")
    await knex.schema.table("beitrag", function (table) {
        table.dropColumn("ersteller")
    })

    return true
}
