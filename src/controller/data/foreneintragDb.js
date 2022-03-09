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
    function insertForeneintrag(foreneintrag, trx) {
        const db = trx || dbConnection
        const foreneintragRow = convertEntityToForeneintragRow(foreneintrag)
        return db
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
            // @formatter:off
            // prettier-ignore
            "select i.*, " +
                "lbe.id_studiengang, " +
                "lbe.vorname, " +
                "lbe.nachname, " +
                "lbe.bild_pfad, " +
                "s.kuerzel, " +
                "s.name as studiengang_name, " +
                "k.name as kategorie_name " +
            "from ( " +
                    "select max.last_beitrag, " +
                            "max.count_beitrag, " +
                            "b.ersteller  as last_beitrag_id_ersteller, " +
                            "b.created_at as last_beitrag_created_at, " +
                            "b.updated_at as last_beitrag_updated_at, " +
                            "fe.id_foreneintrag, " +
                            "fe.id_forum, " +
                            "fe.id_kategorie, " +
                            "fe.name " +
                    "from foreneintrag fe " +
                            "inner join (select max(b.id_beitrag) as last_beitrag, " +
                                                "count(b.*)        as count_beitrag, " +
                                                "b.id_foreneintrag " +
                                        "from beitrag b " +
                                        "group by b.id_foreneintrag) max on fe.id_foreneintrag = max.id_foreneintrag " +
                            "inner join beitrag b on max.last_beitrag = b.id_beitrag " +
                ") as i " +
                    "inner join benutzer lbe on i.last_beitrag_id_ersteller = lbe.id_benutzer " +
                    "left join studiengang s on lbe.id_studiengang = s.id_studiengang " +
                    "left join kategorie k on i.id_kategorie = k.id_kategorie " +
            "where i.id_forum = ? " +
            "order by i.last_beitrag desc " + 
            "limit ? offset ? ",
            [idForum, limitParam, offsetParam]
        )

        return query.then((result) =>
            result.rows.map((row) => ({
                ...convertForeneintragRowToEntity(row),
                lastBeitrag: {
                    idBeitrag: row.last_beitrag,
                    createdAt: row.last_beitrag_created_at,
                    updatedAt: row.last_beitrag_updated_at,
                    ...setupErstellerInfo({ ...row, ersteller: row.last_beitrag_id_ersteller }),
                },
                kategorieName: row.kategorie_name,
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
        if (limit || offset) {
            query.limit(limit).offset(offset)
        }

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
