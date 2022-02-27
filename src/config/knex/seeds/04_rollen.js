exports.seed = async function (knex) {

    await knex("rolle").insert({
        id_rolle: 1,
        name: "Administrator",
    })

    await knex("rolle").insert({
        id_rolle: 2,
        name: "Moderator",
    })

    await knex("rolle").insert({
        id_rolle: 3,
        name: "Student",
    })
    await knex("rolle").insert({
        id_rolle: 4,
        name: "Dozent",
    })
    await knex("rolle").insert({
        id_rolle: 5,
        name: "StuV",
    })
    await knex("rolle").insert({
        id_rolle: 6,
        name: "Studiengangsleiter",
    })

    console.log("04_rollen added")
    return true
};