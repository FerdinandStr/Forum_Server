//THIS SHOULD BE INJECTED
import dbConnection from "../../config/knex/dbConnection"
import { setupErstellerInfo } from "./beitragDb"

function convertForeneintragRowToEntity(foreneintragRow) {
    return {
        idForeneintrag: foreneintragRow.id_foreneintrag,
        idForum: foreneintragRow.id_forum,
        name: foreneintragRow.name,
        idKategorie: foreneintragRow.id_kategorie,
        ersteller: foreneintragRow.ersteller,
        createdAt: foreneintragRow.created_at,
        updatedAt: foreneintragRow.updated_at,
    }
}

function convertEntityToForeneintragRow(foreneintragEntity) {
    return {
        id_foreneintrag: foreneintragEntity.idForeneintrag,
        id_forum: foreneintragEntity.idForum,
        name: foreneintragEntity.name,
        id_kategorie: foreneintragEntity.idKategorie,
        ersteller: foreneintragEntity.ersteller,
    }
}

export default function makeForeneintragDb() {
    //Insert new Foreneintrag
    function insertForeneintrag(foreneintrag) {
        const foreneintragRow = convertEntityToForeneintragRow(foreneintrag)
        console.log("Insert Foreneintrag", foreneintragRow)
        return dbConnection
            .insert(foreneintragRow)
            .into("foreneintrag")
            .returning("id_foreneintrag")
            .then((id) => id[0])
    }

    function updateForeneintrag(foreneintragEntity) {
        const foreneintragRow = convertEntityToForeneintragRow(foreneintragEntity)
        console.log("Update Foreneintrag", foreneintragRow)

        return dbConnection("foreneintrag")
            .where("id_foreneintrag", foreneintragRow.id_foreneintrag)
            .update({ ...foreneintragRow, updated_at: new Date() })
    }

    function selectForeneintragListInForum(idForum, limit, offset) {
        const limitParam = limit ? limit : null
        const offsetParam = offset ? offset : null

        const query = dbConnection.raw(
            "select i.*, " +
                "b2.id_benutzer, " +
                "b2.id_studiengang, " +
                "b2.vorname, " +
                "b2.nachname, " +
                "b2.bild_pfad, " +
                "s.kuerzel, " +
                "s.name as studiengang_name " +
                "from ( " +
                "select max(b.id_beitrag) as last_beitrag, " +
                "count(b.*) as count_beitrag, " +
                "fe.* " +
                "from foreneintrag fe " +
                "inner join beitrag b on fe.id_foreneintrag = b.id_foreneintrag " +
                "group by fe.id_foreneintrag " +
                ") as i " +
                "inner join benutzer b2 on i.ersteller = b2.id_benutzer " +
                "left join studiengang s on b2.id_studiengang = s.id_studiengang " +
                "where i.id_forum = ? " +
                "order by i.last_beitrag desc " +
                "limit ? " +
                "offset ? ",
            [idForum, limitParam, offsetParam]
        )

        return query.then((result) =>
            result.rows.map((row) => ({
                ...convertForeneintragRowToEntity(row),
                ...setupErstellerInfo(row),
                kategorieName: row.kategorie_name,
                lastBeitrag: row.last_beitrag,
                countBeitrag: row.count_beitrag,
            }))
        )
    }

    function getForeneintragList({ idForeneintrag, idForum, idKategorie, name, limit, offset }) {
        const query = dbConnection("foreneintrag")
        if (idForeneintrag) {
            query.where("id_foreneintrag", idForeneintrag)
        }
        if (idForum) {
            query.where("id_forum", idForum) //and default
        }
        if (idKategorie) {
            query.where("id_kategorie", idKategorie) //and default
        }
        if (name) {
            query.where("name", name)
        }
        query.limit(limit).offset(offset)

        return query.then((foreneintragList) => foreneintragList.map((row) => convertForeneintragRowToEntity(row)))
    }

    function deleteForeneintrag(idForeneintrag) {
        return dbConnection("foreneintrag").where("id_foreneintrag", idForeneintrag).del()
    }

    function countForeneintraegeInForum(idForum) {
        return dbConnection("foreneintrag").count("*").where("id_forum", idForum)
    }

    return {
        insertForeneintrag,
        updateForeneintrag,
        selectForeneintragListInForum,
        getForeneintragList,
        deleteForeneintrag,
        countForeneintraegeInForum,
    }
}
