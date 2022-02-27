exports.seed = async function (knex) {
  const idMainForum = await knex("forum")
    .where({

      name: "Hauptforum",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])



  console.log("add Studiengänge data...")
  const idStudiengaenge = await knex("forum")                                 //Forum
    .insert({
      id_parent_forum: idMainForum.id_forum,
      name: "Studiengänge",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])




  //----------------------------------------------------------------------------------------------
  const idinformatik = await knex("forum")                                 //Forum
    .insert({
      id_parent_forum: idStudiengaenge,
      name: "Informatik",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])

  const idVorlesungsplaninformatik = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idinformatik,
      name: "Vorlesungsplan",
      ersteller: 1,
      id_kategorie: 1,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idinformatik,
      id_foreneintrag: idVorlesungsplaninformatik,
      inhalt: "Was haltet ihr von dem neuen Vorlesungsplan?",
      ersteller: 1,

    },
    {
      id_forum: idinformatik,
      id_foreneintrag: idVorlesungsplaninformatik,
      inhalt: "Ich finde den neuen gut strukturiert.",
      ersteller: 1,

    },
  ])

  const idVolkswirtschaftslehreinformatik = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idinformatik,
      name: "Volkswirtschaftslehre",
      ersteller: 1,
      id_kategorie: 3,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idinformatik,
      id_foreneintrag: idVolkswirtschaftslehreinformatik,
      inhalt: "Hat jemand einen Aufschrieb für die Vorlesung heute?",
      ersteller: 1,

    },
    {
      id_forum: idinformatik,
      id_foreneintrag: idVolkswirtschaftslehreinformatik,
      inhalt: "Ja, ich schicke dir meinen Aufschrieb nach der Vorlesung.",
      ersteller: 1,

    },
  ])

  const idKlausurfrageninformatik = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idinformatik,
      name: "Klausurfragen",
      ersteller: 1,
      id_kategorie: 4,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idinformatik,
      id_foreneintrag: idKlausurfrageninformatik,
      inhalt: "Müssen wir die Skizze zu Kryptographie auch können?",
      ersteller: 1,

    },
    {
      id_forum: idinformatik,
      id_foreneintrag: idKlausurfrageninformatik,
      inhalt: "Ja, leider...",
      ersteller: 1,

    },
  ])
  //-----------------------------------------------------------------------------------------------




  const idWirtschaftsinformatik = await knex("forum")                                 //Forum
    .insert({
      id_parent_forum: idStudiengaenge,
      name: "Wirtschaftsinformatik",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])

  const idVorlesungsplanwirtschaftsinformatik = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idWirtschaftsinformatik,
      name: "Vorlesungsplan",
      ersteller: 1,
      id_kategorie: 1,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idWirtschaftsinformatik,
      id_foreneintrag: idVorlesungsplanwirtschaftsinformatik,
      inhalt: "Was haltet ihr von dem neuen Vorlesungsplan?",
      ersteller: 1,

    },
    {
      id_forum: idWirtschaftsinformatik,
      id_foreneintrag: idVorlesungsplanwirtschaftsinformatik,
      inhalt: "Ich finde den neuen gut strukturiert.",
      ersteller: 1,

    },
  ])

  const idVolkswirtschaftslehrewirtschaftsinformatik = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idWirtschaftsinformatik,
      name: "Volkswirtschaftslehre",
      ersteller: 1,
      id_kategorie: 3,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idWirtschaftsinformatik,
      id_foreneintrag: idVolkswirtschaftslehrewirtschaftsinformatik,
      inhalt: "Hat jemand einen Aufschrieb für die Vorlesung heute?",
      ersteller: 1,

    },
    {
      id_forum: idWirtschaftsinformatik,
      id_foreneintrag: idVolkswirtschaftslehrewirtschaftsinformatik,
      inhalt: "Ja, ich schicke dir meinen Aufschrieb nach der Vorlesung.",
      ersteller: 1,

    },
  ])

  const idKlausurfragenwirtschaftsinformatik = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idWirtschaftsinformatik,
      name: "Klausurfragen",
      ersteller: 1,
      id_kategorie: 4,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idWirtschaftsinformatik,
      id_foreneintrag: idKlausurfragenwirtschaftsinformatik,
      inhalt: "Müssen wir die Skizze zu Kryptographie auch können?",
      ersteller: 1,

    },
    {
      id_forum: idWirtschaftsinformatik,
      id_foreneintrag: idKlausurfragenwirtschaftsinformatik,
      inhalt: "Ja, leider...",
      ersteller: 1,

    },
  ])



  //------------------------------------------------------------------



  const idBWL = await knex("forum")                                 //Forum
    .insert({
      id_parent_forum: idStudiengaenge,
      name: "BWL",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])

  const idVorlesungsplanbwl = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idBWL,
      name: "Vorlesungsplan",
      ersteller: 1,
      id_kategorie: 1,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idBWL,
      id_foreneintrag: idVorlesungsplanbwl,
      inhalt: "Was haltet ihr von dem neuen Vorlesungsplan?",
      ersteller: 1,

    },
    {
      id_forum: idBWL,
      id_foreneintrag: idVorlesungsplanbwl,
      inhalt: "Ich finde den neuen gut strukturiert.",
      ersteller: 1,

    },
  ])

  const idVolkswirtschaftslehrebwl = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idBWL,
      name: "Volkswirtschaftslehre",
      ersteller: 1,
      id_kategorie: 3,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idBWL,
      id_foreneintrag: idVolkswirtschaftslehrebwl,
      inhalt: "Hat jemand einen Aufschrieb für die Vorlesung heute?",
      ersteller: 1,

    },
    {
      id_forum: idBWL,
      id_foreneintrag: idVolkswirtschaftslehrebwl,
      inhalt: "Ja, ich schicke dir meinen Aufschrieb nach der Vorlesung.",
      ersteller: 1,

    },
  ])

  const idKlausurfragenbwl = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idBWL,
      name: "Klausurfragen",
      ersteller: 1,
      id_kategorie: 4,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idBWL,
      id_foreneintrag: idKlausurfragenbwl,
      inhalt: "Müssen wir die Skizze zu Kryptographie auch können?",
      ersteller: 1,

    },
    {
      id_forum: idBWL,
      id_foreneintrag: idKlausurfragenbwl,
      inhalt: "Ja, leider...",
      ersteller: 1,

    },
  ])



  //------------------------------------------------------------------





  const idMaschinenbau = await knex("forum")                                 //Forum
    .insert({
      id_parent_forum: idStudiengaenge,
      name: "Maschinenbau",
      ersteller: 1,
    })
    .returning("id_forum")
    .then((id) => id[0])

  const idVorlesungsplanMaschinenbau = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idMaschinenbau,
      name: "Vorlesungsplan",
      ersteller: 1,
      id_kategorie: 1,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idMaschinenbau,
      id_foreneintrag: idVorlesungsplanMaschinenbau,
      inhalt: "Was haltet ihr von dem neuen Vorlesungsplan?",
      ersteller: 1,

    },
    {
      id_forum: idMaschinenbau,
      id_foreneintrag: idVorlesungsplanMaschinenbau,
      inhalt: "Ich finde den neuen gut strukturiert.",
      ersteller: 1,

    },
  ])

  const idVolkswirtschaftslehreMaschinenbau = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idMaschinenbau,
      name: "Volkswirtschaftslehre",
      ersteller: 1,
      id_kategorie: 3,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idMaschinenbau,
      id_foreneintrag: idVolkswirtschaftslehreMaschinenbau,
      inhalt: "Hat jemand einen Aufschrieb für die Vorlesung heute?",
      ersteller: 1,

    },
    {
      id_forum: idMaschinenbau,
      id_foreneintrag: idVolkswirtschaftslehreMaschinenbau,
      inhalt: "Ja, ich schicke dir meinen Aufschrieb nach der Vorlesung.",
      ersteller: 1,

    },
  ])

  const idKlausurfragenMaschinenbau = await knex("foreneintrag")                       //Foreneintrag
    .insert({
      id_forum: idMaschinenbau,
      name: "Klausurfragen",
      ersteller: 1,
      id_kategorie: 4,
    })
    .returning("id_foreneintrag")
    .then((id) => id[0])

  await knex("beitrag").insert([                                      //Beitrag
    {
      id_forum: idMaschinenbau,
      id_foreneintrag: idKlausurfragenMaschinenbau,
      inhalt: "Müssen wir die Skizze zu Kryptographie auch können?",
      ersteller: 1,

    },
    {
      id_forum: idMaschinenbau,
      id_foreneintrag: idKlausurfragenMaschinenbau,
      inhalt: "Ja, leider...",
      ersteller: 1,

    },
  ])

  console.log("01_Studiengänge added")


  return true
};
