//THIS SHOULD BE INJECTED
import dbConnection from "../../config/knex/dbConnection"

function convertBeitragRowToEntity(beitragRow) {
    return {
        idBeitrag: beitragRow.id_beitrag,
        idForum: beitragRow.id_forum,
        idForeneintrag: beitragRow.id_foreneintrag,
        inhalt: beitragRow.inhalt,
        ersteller: beitragRow.ersteller,
        createdAt: beitragRow.created_at,
        updatedAt: beitragRow.updated_at,
    }
}

function convertEntityToBeitragRow(beitragEntity) {
    return {
        id_beitrag: beitragEntity.idBeitrag,
        id_forum: beitragEntity.idForum,
        id_foreneintrag: beitragEntity.idForeneintrag,
        inhalt: beitragEntity.inhalt,
        ersteller: beitragEntity.ersteller,
    }
}

export default function makeBeitragDb() {
    //Insert new Beitrag
    function insertBeitrag(beitrag) {
        const beitragRow = convertEntityToBeitragRow(beitrag)
        console.log("ROW", beitragRow)
        return dbConnection
            .insert(beitragRow)
            .into("beitrag")
            .returning("id_beitrag")
            .then((id) => id[0])
    }

    function getBeitragList(idBeitrag, idForum, idForeneintrag, ersteller) {
        const query = dbConnection("beitrag")
        if (idBeitrag) {
            query.where("id_beitrag", idBeitrag)
        }
        if (idForum) {
            query.where("id_forum", idForum) //and default
        }
        if (idForeneintrag) {
            query.where("id_foreneintrag", idForeneintrag) //and default
        }
        if (ersteller) {
            query.where("ersteller", ersteller) //and default
        }
        return query.then((beitragList) => beitragList.map((row) => convertBeitragRowToEntity(row)))
    }

    function getBeitragListForForeneintrag(idForeneintrag) {
        return dbConnection("beitrag")
            .join("benutzer", "benutzer.id_benutzer", "=", "beitrag.ersteller")
            .leftJoin("studiengang", "studiengang.id_studiengang", "=", "benutzer.id_studiengang")
            .where("id_foreneintrag", idForeneintrag)
            .then((beitragList) =>
                beitragList.map((dataRow) => ({
                    ...convertBeitragRowToEntity(dataRow),
                    ersteller: {
                        idErsteller: dataRow.ersteller,
                        erstellerName: dataRow.vorname + " " + dataRow.nachname,
                        pfad: dataRow.bild_pfad,
                        studiengangKuerzel: dataRow.kuerzel,
                        studiengangName: dataRow.name,
                    },
                }))
            )
    }

    function deleteBeitrag(idBeitrag) {
        return dbConnection("beitrag").where("id_beitrag", idBeitrag).del()
    }

    return { insertBeitrag, getBeitragList, getBeitragListForForeneintrag, deleteBeitrag }
}
