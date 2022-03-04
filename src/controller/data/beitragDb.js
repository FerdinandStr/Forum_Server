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

export function setupErstellerInfo(dataRow) {
    return {
        ersteller: {
            idErsteller: dataRow.ersteller,
            erstellerName: dataRow.vorname + " " + dataRow.nachname,
            studiengangKuerzel: dataRow.kuerzel,
            studiengangName: dataRow.studiengang_name,
            pfad: dataRow.bild_pfad,
        },
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

    function getBeitragListForForeneintrag(idForeneintrag, limit, offset) {
        return dbConnection
            .select("*", "studiengang.name as studiengang_name", "beitrag.created_at as created_at", "beitrag.updated_at as updated_at")
            .from({ beitrag: dbConnection("beitrag").where("beitrag.id_foreneintrag", idForeneintrag).limit(limit).offset(offset) })
            .join("benutzer", "benutzer.id_benutzer", "=", "beitrag.ersteller")
            .leftJoin("studiengang", "studiengang.id_studiengang", "=", "benutzer.id_studiengang")
            .orderBy("beitrag.id_beitrag")
            .then((beitragList) => {
                console.log("beitragList", beitragList)
                return beitragList.map((dataRow) => ({
                    ...convertBeitragRowToEntity(dataRow),
                    ...setupErstellerInfo(dataRow),
                }))
            })
    }

    function deleteBeitrag(idBeitrag) {
        return dbConnection("beitrag").where("id_beitrag", idBeitrag).del()
    }

    function countBeitraege(idForum, idForeneintrag, ersteller) {
        const query = dbConnection("beitrag").count("*")
        if (idForum) {
            query.where("id_forum", idForum)
        }
        if (idForeneintrag) {
            query.where("id_foreneintrag", idForeneintrag)
        }
        if (ersteller) {
            query.where("ersteller", ersteller)
        }
        return query
    }

    return { insertBeitrag, getBeitragList, getBeitragListForForeneintrag, deleteBeitrag, countBeitraege }
}
