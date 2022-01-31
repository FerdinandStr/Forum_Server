import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeRolleDb from "../../controller/data/rolleDb"
const rolleDb = makeRolleDb()

export default async function listRolle({ idRolle, name }) {
    const rolleList = await rolleDb.getRolleList(idRolle, name)
    if (rolleList.length > 0) {
        return rolleList
    }
    throw new NotFoundError("Keine Rollen gefunden")
}
