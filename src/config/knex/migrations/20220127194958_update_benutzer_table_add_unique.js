exports.up = function (knex) {
    console.log("Update benutzer_table_unique ...")
    return knex.schema.alterTable("benutzer", (t) => {
        t.unique("email")
    })
}

exports.down = function (knex) {
    console.log("NOTHING DONE, email unique not removed!")
}
