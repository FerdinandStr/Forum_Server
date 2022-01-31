import { BadRequestError, NotFoundError } from "../../config/express/middleware/custErrors"
import makeKategorieDb from "../../controller/data/kategorieDb"
const kategorieDb = makeKategorieDb()

export default async function deleteKategorie(idKategorie) {
    if (idKategorie) {
        const result = await kategorieDb.deleteKategorie(idKategorie)

        if (result === 1) {
            console.log("Kategorie " + idKategorie + " deleted successfully; res=", result)
            return true
        }
        throw new NotFoundError("Kategorie with id " + idKategorie + " not found; result=" + result)
    } else {
        throw new BadRequestError("idKategorie is missing => " + idKategorie)
    }
}
