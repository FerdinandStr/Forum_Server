exports.seed = async function (knex) {
    console.log("delete forum data...")
    await knex("forum").del()
    console.log("delete benutzer data...")
    await knex("benutzer").del()

    console.log("add benutzer data...")
    await knex("benutzer").insert({
        id_benutzer: 1,
        vorname: "SYSTEM",
        nachname: "SYSTEM",
        email: "SYSTEM",
        passwort: "",
        bild_pfad: "",
        status_aktiv: 0,
    })

    console.log("add forum data...")
    await knex("forum").insert([
        {
            id_forum: 1,
            id_parent_forum: 1,
            name: "Hauptforum",
            ersteller: 1,
        },
        {
            id_forum: 2,
            id_parent_forum: 1,
            name: "Wirtschaftsinformatik",
            ersteller: 1,
        },
        {
            id_forum: 3,
            id_parent_forum: 1,
            name: "Informatik",
            ersteller: 1,
        },
    ])

    console.log("=> initial_data done")
    return true
}
