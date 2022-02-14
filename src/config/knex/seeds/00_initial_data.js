exports.seed = async function (knex) {
    console.log("delete beitrag data...")
    await knex("beitrag").del()
    console.log("delete foreneintrag data...")
    await knex("foreneintrag").del()
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
    const idMainForum = await knex("forum")
        .insert({

            name: "Hauptforum",
            ersteller: 1,
        })
        .returning("id_forum")
        .then((id) => id[0])

    console.log("MainForum added")


    const idinfo = await knex("foreneintrag")                       //Foreneintrag
        .insert({
            id_forum: idMainForum,
            name: "Infos zum Forum",
            ersteller: 1,
        })
        .returning("id_foreneintrag")
        .then((id) => id[0])


    await knex("beitrag").insert([                                      //Beitrag
        {
            id_forum: idMainForum,
            id_foreneintrag: idinfo,
            inhalt: "Willkommen in unserem Studentenforum. Bitte geht respektvoll miteinander um.",
            ersteller: 1,

        },
    ])

    console.log("=> initial_data done")
    return true
}
