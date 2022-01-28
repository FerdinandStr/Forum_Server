import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeBenutzerDb from "../../controller/data/benutzerDb"
const benutzerDb = makeBenutzerDb()

export default async function getBenutzer(idBenutzer) {
    const benutzer = await benutzerDb.getBenutzerById(idBenutzer)
    if (benutzer) {
        return benutzer
    }
    throw new NotFoundError("Kein Benutzer für id " + idBenutzer + " gefunden!")
}
