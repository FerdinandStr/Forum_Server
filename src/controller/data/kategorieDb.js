//THIS SHOULD BE INJECTED
import dbConnection from "../../config/knex/dbConnection"

function convertKategorieRowToEntity(kategorieRow) {
    return {
        idKategorie: kategorieRow.id_kategorie,
        name: kategorieRow.name,
        createdAt: kategorieRow.created_at,
        updatedAt: kategorieRow.updated_at,
    }
}

function convertEntityToKategorieRow(kategorieEntity) {
    return {
        id_kategorie: kategorieEntity.idKategorie,
        name: kategorieEntity.name,
    }
}

export default function makeKategorieDb() {
    //Insert new Kategorie
    function insertKategorie(kategorie) {
        const kategorieRow = convertEntityToKategorieRow(kategorie)
        console.log("ROW", kategorieRow)
        return dbConnection
            .insert(kategorieRow)
            .into("kategorie")
            .returning("id_kategorie")
            .then((id) => id[0])
    }

    function getKategorieList(idKategorie, name) {
        const query = dbConnection("kategorie")
        if (idKategorie) {
            query.where("id_kategorie", idKategorie)
        }
        if (name) {
            query.where("name", name) //and default
        }
        return query.then((kategorieList) => kategorieList.map((row) => convertKategorieRowToEntity(row)))
    }

    function deleteKategorie(idKategorie) {
        return dbConnection("kategorie").where("id_kategorie", idKategorie).del()
    }

    return { insertKategorie, getKategorieList, deleteKategorie }
}
