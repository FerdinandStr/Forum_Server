exports.seed = async function (knex) {
    console.log("delete beitrag data...")
    await knex("beitrag").del()
    console.log("delete foreneintrag data...")
    await knex("foreneintrag").del()
    console.log("delete forum data...")
    await knex("forum").del()
    console.log("delete studiengang data...")
    await knex("studiengang").del()
    console.log("delete benutzer data...")
    await knex("benutzer").del()
    console.log("delete kategorie data...")
    await knex("kategorie").del()
    console.log("delete rolle data...")
    await knex("rolle").del()

    console.log("add studiengang data...")

    await knex("studiengang").insert({
        id_studiengang: 1,
        name: "Wirtschaftsinformatik",
        kuerzel: "WWI20B",
    })

    await knex("studiengang").insert({
        id_studiengang: 2,
        name: "Wirtschaftsinformatik",
        kuerzel: "WWI20A",
    })

    await knex("studiengang").insert({
        id_studiengang: 3,
        name: "Informatik",
        kuerzel: "IT20B",
    })

    await knex("studiengang").insert({
        id_studiengang: 4,
        name: "Betriebswirtschaftslehre",
        kuerzel: "BWL20A",
    })
    console.log("add benutzer data...")
    await knex("benutzer").insert({
        id_benutzer: 1,
        vorname: "SYSTEM",
        nachname: "SYSTEM",
        email: "SYSTEM",
        passwort: "",
        bild_pfad: "",
        status_aktiv: 1,
    })




    await knex("benutzer").insert({
        id_benutzer: 2,
        vorname: "Manfred",
        nachname: "Meier",
        email: "Manfred@meier.de",
        passwort: "12345678",
        bild_pfad: "",
        id_studiengang: 1,
        status_aktiv: 1,
    })

    await knex("benutzer").insert({
        id_benutzer: 3,
        vorname: "Timo",
        nachname: "Oswald",
        email: "oswaldt.wwi20@student.dhbw-heidenheim.de",
        passwort: "12345678",
        bild_pfad: "",
        id_studiengang: 1,
        status_aktiv: 1,
    })

    await knex("benutzer").insert({
        id_benutzer: 4,
        vorname: "Max",
        nachname: "Mustermann",
        email: "Max@mustermann.de",
        passwort: "12345678",
        bild_pfad: "",
        id_studiengang: 3,
        status_aktiv: 1,
    })
    console.log("add kategorie data...")
    await knex("kategorie").insert({
        id_kategorie: 1,
        name: "Information",
    })
    await knex("kategorie").insert({
        id_kategorie: 2,
        name: "Allgemeines",
    })
    await knex("kategorie").insert({
        id_kategorie: 3,
        name: "Frage",
    })
    await knex("kategorie").insert({
        id_kategorie: 4,
        name: "Prüfung",
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
            id_kategorie: 1,
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
