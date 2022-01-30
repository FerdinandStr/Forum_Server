//als Beispiel für Anpassung an Tabellen
exports.up = async function (knex) {
    console.log("update foreneintrag with id_kategorie ...")
    await knex.schema.table("foreneintrag", function (table) {
        table.integer("id_kategorie").unsigned().references("kategorie.id_kategorie")
    })
    return true
}

exports.down = async function (knex) {
    console.log("remove id_kategorie from foreneintrag ...")
    await knex.schema.table("foreneintrag", function (table) {
        table.dropColumn("id_kategorie")
    })
    return true
}
