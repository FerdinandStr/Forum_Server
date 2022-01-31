import { BadRequestError, NotFoundError } from "../../config/express/middleware/custErrors"
import makeStudiengangDb from "../../controller/data/studiengangDb"
const studiengangDb = makeStudiengangDb()

export default async function deleteStudiengang(idStudiengang) {
    if (idStudiengang) {
        const result = await studiengangDb.deleteStudiengang(idStudiengang)

        if (result === 1) {
            console.log("Studiengang " + idStudiengang + " deleted successfully; res=", result)
            return true
        }
        throw new NotFoundError("Studiengang with id " + idStudiengang + " not found; result=" + result)
    } else {
        throw new BadRequestError("idStudiengang is missing => " + idStudiengang)
    }
}
