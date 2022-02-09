//THIS SHOULD BE INJECTED
import dbConnection from "../../config/knex/dbConnection"

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

    function getForeneintragList({ idForeneintrag, idForum, idKategorie, name }) {
        const query = dbConnection("foreneintrag")
        if (idForeneintrag) {
            query.where("id_foreneintrag", idForeneintrag)
        }
        if (idForeneintrag) {
            query.where("id_forum", idForum) //and default
        }
        if (idKategorie) {
            query.where("id_kategorie", idKategorie) //and default
        }
        if (name) {
            query.where("name", name)
        }
        return query.then((foreneintragList) => foreneintragList.map((row) => convertForeneintragRowToEntity(row)))
    }

    function deleteForeneintrag(idForeneintrag) {
        return dbConnection("foreneintrag").where("id_foreneintrag", idForeneintrag).del()
    }

    return { insertForeneintrag, updateForeneintrag, getForeneintragList, deleteForeneintrag }
}
