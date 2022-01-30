import { BadRequestError, NotFoundError } from "../../config/express/middleware/custErrors"
import makeBenutzerDb from "../../controller/data/benutzerDb"
const benutzerDb = makeBenutzerDb()

export default async function deleteBenutzer(idBenutzer) {
    if (idBenutzer) {
        const result = await benutzerDb.deleteBenutzerById(idBenutzer)
        if (result === 1) {
            console.log("User " + idBenutzer + " deleted successfully; res=", result)
            return true
        }
        throw new NotFoundError("User with id " + idBenutzer + " not found; result=" + result)
    } else {
        throw new BadRequestError("idBenutzer is necessary => " + idBenutzer)
    }
}
