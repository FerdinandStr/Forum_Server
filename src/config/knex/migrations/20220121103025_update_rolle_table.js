//als Beispiel für Anpassung an Tabellen
exports.up = function (knex) {
    console.log("update rolle with recht ...")
    knex.schema.table("rolle", function (table) {
        table.string("recht")
    })
}

exports.down = function (knex) {
    console.log("remove rolle from recht ...")
    knex.schema.table("rolle", function (table) {
        table.dropColumn("recht")
    })
}