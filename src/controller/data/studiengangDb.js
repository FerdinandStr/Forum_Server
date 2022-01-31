//THIS SHOULD BE INJECTED
import dbConnection from "../../config/knex/dbConnection"

function convertStudiengangRowToEntity(studiengangRow) {
    return {
        idStudiengang: studiengangRow.id_studiengang,
        name: studiengangRow.name,
        kuerzel: studiengangRow.kuerzel,
        createdAt: studiengangRow.created_at,
        updatedAt: studiengangRow.updated_at,
    }
}

function convertEntityToStudiengangRow(studiengangEntity) {
    return {
        id_studiengang: studiengangEntity.idStudiengang,
        name: studiengangEntity.name,
        kuerzel: studiengangEntity.kuerzel,
    }
}

export default function makeStudiengangDb() {
    //Insert new Studiengang
    function insertStudiengang(studiengang) {
        const studiengangRow = convertEntityToStudiengangRow(studiengang)
        console.log("ROW", studiengangRow)
        return dbConnection
            .insert(studiengangRow)
            .into("studiengang")
            .returning("id_studiengang")
            .then((id) => id[0])
    }

    function getStudiengangList(idStudiengang, name, kuerzel) {
        const query = dbConnection("studiengang")
        if (idStudiengang) {
            query.where("id_studiengang", idStudiengang)
        }
        if (name) {
            query.where("name", name) //and default
        }
        if (kuerzel) {
            query.where("kuerzel", kuerzel) //and default
        }
        return query.then((studiengangList) => studiengangList.map((row) => convertStudiengangRowToEntity(row)))
    }

    function deleteStudiengang(idStudiengang) {
        return dbConnection("studiengang").where("id_studiengang", idStudiengang).del()
    }

    return { insertStudiengang, getStudiengangList, deleteStudiengang }
}
