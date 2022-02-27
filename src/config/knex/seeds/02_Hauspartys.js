exports.seed = async function (knex) {
  const idMainForum = await knex("forum")
    .where({

      name: "Hauptforum",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])





  console.log("add hauspartyforum data...")
  const idpartyforum = await knex("forum")
    .insert({
      id_parent_forum: idMainForum.id_forum,
      name: "Party",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])

  const id25022022 = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idpartyforum,
      name: "Fr. 25.02",
      ersteller: 1,
      id_kategorie: 3,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idpartyforum,
      id_foreneintrag: id25022022,
      inhalt: "Gibts am Freitag irgendwo ne Party?",
      ersteller: 1,

    },
    {
      id_forum: idpartyforum,
      id_foreneintrag: id25022022,
      inhalt: "Habe gehört im Studentenwohnheim werden ein paar Tornados entzündet.",
      ersteller: 1,

    },
  ])

  const id26022022 = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idpartyforum,
      name: "Sa. 26.02",
      ersteller: 1,
      id_kategorie: 3,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idpartyforum,
      id_foreneintrag: id26022022,
      inhalt: "Gibts am Samstag irgendwo ne Party?",
      ersteller: 1,

    },
    {
      id_forum: idpartyforum,
      id_foreneintrag: id26022022,
      inhalt: "Habe gehört im Studentenwohnheim werden ein paar Tornados entzündet.",
      ersteller: 1,

    },
  ])
  console.log("02_Hauspartys added")
  return true
};
