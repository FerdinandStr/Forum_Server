import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeStudiengangDb from "../../controller/data/studiengangDb"
const studiengangDb = makeStudiengangDb()

export default async function listStudiengang({ idStudiengang, name, kuerzel }) {
    const studiengangList = await studiengangDb.getStudiengangList(idStudiengang, name, kuerzel)
    if (studiengangList.length > 0) {
        return studiengangList
    }
    throw new NotFoundError("Keine Studiengänge gefunden")
}
