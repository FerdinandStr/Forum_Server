import { BadRequestError, NotFoundError } from "../../config/express/middleware/custErrors"
import makeRolleDb from "../../controller/data/rolleDb"
const rolleDb = makeRolleDb()

export default async function deleteRolle(idRolle) {
    if (idRolle) {
        const result = await rolleDb.deleteRolle(idRolle)

        if (result === 1) {
            console.log("Rolle " + idRolle + " deleted successfully; res=", result)
            return true
        }
        throw new NotFoundError("Rolle with id " + idRolle + " not found; result=" + result)
    } else {
        throw new BadRequestError("idRolle is missing => " + idRolle)
    }
}
