//THIS SHOULD BE INJECTED
import dbConnection from "./dbConnection"

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
        console.log("ROW", foreneintragRow)
        return dbConnection
            .insert(foreneintragRow)
            .returning("id_foreneintrag")
            .into("foreneintrag")
            .then((id) => id[0])
    }

    function getForeneintragList(idForeneintrag, idForum, idKategorie) {
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
        return query.then((foreneintragList) => foreneintragList.map((row) => convertForeneintragRowToEntity(row)))
    }

    function deleteForeneintrag(idForeneintrag) {
        return dbConnection("foreneintrag").where("id_foreneintrag", idForeneintrag).del()
    }

    return { insertForeneintrag, getForeneintragList, deleteForeneintrag }
}
