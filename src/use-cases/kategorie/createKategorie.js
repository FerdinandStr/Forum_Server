import makeKategorieDb from "../../controller/data/kategorieDb"
import makeKategorie from "../../entities/kategorie"

const kategorieDb = makeKategorieDb()

export default async function createKategorie(kategorie) {
    const kategorieEntity = makeKategorie(kategorie)
    const idKategorie = await kategorieDb.insertKategorie(kategorieEntity)
    if (idKategorie) {
        return idKategorie
    }
    console.log("ERROR !!!!!!??????", idKategorie)
    throw new Error("Unkown insertion error on Kategorie! Contact admin" + idKategorie)
}
