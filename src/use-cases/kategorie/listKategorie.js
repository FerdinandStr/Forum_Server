import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeKategorieDb from "../../controller/data/kategorieDb"
const kategorieDb = makeKategorieDb()

export default async function listKategorie({ idKategorie, name }) {
    const kategorieList = await kategorieDb.getKategorieList(idKategorie, name)
    if (kategorieList.length > 0) {
        return kategorieList
    }
    throw new NotFoundError("Keine Foreneinträge gefunden")
}
