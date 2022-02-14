const { database } = require("pg/lib/defaults");

exports.seed = async function (knex) {
  const idMainForum = await knex("forum")
    .where({

      name: "Hauptforum",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])

  console.log("add stuvforum data...")

  const idstuvforum = await knex("forum")                                 //Forum
    .insert({
      id_parent_forum: idMainForum.id_forum,
      name: "Stuv",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])



  const idSitzungen = await knex("forum")                             //Unterforum
    .insert({
      id_parent_forum: idstuvforum,
      name: "Sitzungen",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])


  const idSitzung1 = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idSitzungen,
      name: "Sitzung1",
      ersteller: 1,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])


  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idSitzungen,
      id_foreneintrag: idSitzung1,
      inhalt: "Ich fand die Besprechung super",
      ersteller: 1,

    },
    {
      id_forum: idSitzungen,
      id_foreneintrag: idSitzung1,
      inhalt: "Ich fand die Besprechung super",
      ersteller: 1,

    },
  ])
  console.log("03_stuv added")
  return true
};
