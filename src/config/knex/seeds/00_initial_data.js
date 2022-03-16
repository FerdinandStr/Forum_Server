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
        kuerzel: "wwi",
    })

    await knex("studiengang").insert({
        id_studiengang: 2,
        name: "International Students",
        kuerzel: "ais",
    })

    await knex("studiengang").insert({
        id_studiengang: 3,
        name: "Informatik",
        kuerzel: "tin",
    })

    await knex("studiengang").insert({
        id_studiengang: 4,
        name: "Angewandte Gesundheits- und Pflegewissenschaften",
        kuerzel: "gag",
    })

    await knex("studiengang").insert({
        id_studiengang: 5,
        name: "Angewandte Gesundheits- und Pflegewissenschaften",
        kuerzel: "gah",
    })
    await knex("studiengang").insert({
        id_studiengang: 6,
        name: "Interprofessionelle Gesundheitsversorgung",
        kuerzel: "gig",
    })

    await knex("studiengang").insert({
        id_studiengang: 7,
        name: "Medizintechnische Wissenschaften",
        kuerzel: "gmw",
    })

    await knex("studiengang").insert({
        id_studiengang: 8,
        name: "Case Management",
        kuerzel: "scm",
    })

    await knex("studiengang").insert({
        id_studiengang: 9,
        name: "Kinder- und Jugendhilfe",
        kuerzel: "skj",
    })

    await knex("studiengang").insert({
        id_studiengang: 10,
        name: "Soziale Dienste",
        kuerzel: "ssd",
    })

    await knex("studiengang").insert({
        id_studiengang: 11,
        name: "Soziale Arbeit mit älteren Menschen",
        kuerzel: "sse",
    })
    await knex("studiengang").insert({
        id_studiengang: 12,
        name: "Sozialmanagement",
        kuerzel: "ssm",
    })

    await knex("studiengang").insert({
        id_studiengang: 13,
        name: "Maschinenbau",
        kuerzel: "tmb",
    })

    await knex("studiengang").insert({
        id_studiengang: 14,
        name: "Wirtschaftsingenieurwesen",
        kuerzel: "twi",
    })

    await knex("studiengang").insert({
        id_studiengang: 15,
        name: "BWL - Bank",
        kuerzel: "wbk",
    })
    await knex("studiengang").insert({
        id_studiengang: 16,
        name: "BWL - Digital Business Management",
        kuerzel: "wdb",
    })
    await knex("studiengang").insert({
        id_studiengang: 17,
        name: "BWL – Digital Commerce Management",
        kuerzel: "wdc",
    })
    await knex("studiengang").insert({
        id_studiengang: 18,
        name: "BWL - Handel",
        kuerzel: "wha",
    })

    await knex("studiengang").insert({
        id_studiengang: 19,
        name: "BWL - International Business",
        kuerzel: "wib",
    })

    await knex("studiengang").insert({
        id_studiengang: 20,
        name: "BWL - Industrie",
        kuerzel: "win",
    })

    await knex("studiengang").insert({
        id_studiengang: 21,
        name: "BWL - Marketing Management",
        kuerzel: "wmm",
    })

    await knex("studiengang").insert({
        id_studiengang: 22,
        name: "BWL - Spedition, Transport und Logistik",
        kuerzel: "wst",
    })

    await knex("studiengang").insert({
        id_studiengang: 23,
        name: "BWL - Versicherung",
        kuerzel: "wvs",
    })

    return true
}
