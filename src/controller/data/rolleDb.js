//THIS SHOULD BE INJECTED
import dbConnection from "../../config/knex/dbConnection"

function convertRolleRowToEntity(rolleRow) {
    return {
        idRolle: rolleRow.id_rolle,
        name: rolleRow.name,
        createdAt: rolleRow.created_at,
        updatedAt: rolleRow.updated_at,
    }
}

function convertEntityToRolleRow(rolleEntity) {
    return {
        id_rolle: rolleEntity.idRolle,
        name: rolleEntity.name,
    }
}

export default function makeRolleDb() {
    //Insert new Rolle
    function insertRolle(rolle) {
        const rolleRow = convertEntityToRolleRow(rolle)
        console.log("ROW", rolleRow)
        return dbConnection
            .insert(rolleRow)
            .into("rolle")
            .returning("id_rolle")
            .then((id) => id[0])
    }

    function getRolleList(idRolle, name) {
        const query = dbConnection("rolle")
        if (idRolle) {
            query.where("id_rolle", idRolle)
        }
        if (name) {
            query.where("name", name) //and default
        }
        return query.then((rolleList) => rolleList.map((row) => convertRolleRowToEntity(row)))
    }

    function deleteRolle(idRolle) {
        return dbConnection("rolle").where("id_rolle", idRolle).del()
    }

    return { insertRolle, getRolleList, deleteRolle }
}
