import { BadRequestError, NotFoundError } from "../../config/express/middleware/custErrors"
import deactivateBenutzerById from "../../controller/data/benutzerDb"
const benutzerDb = deactivateBenutzerById()

export default async function deactivateBenutzer(idBenutzer) {
    if (idBenutzer) {
        const result = await benutzerDb.deactivateBenutzerById(idBenutzer)
        if (result === 1) {
            console.log("User " + idBenutzer + " deactivation successfull; res=", result)
            return true
        }
        throw new NotFoundError("User with id " + idBenutzer + " not found; result=" + result)
    } else {
        throw new BadRequestError("idBenutzer is necessary => " + idBenutzer)
    }
}
