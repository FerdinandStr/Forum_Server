import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeBeitragDb from "../../controller/data/beitragDb"
const beitragDb = makeBeitragDb()

export default async function listBeitraegeForForeneintrag(idForeneintrag, limit, offset) {
    const foreneintragList = await beitragDb.getBeitragListForForeneintrag(idForeneintrag, limit, offset)
    if (foreneintragList.length > 0) {
        return foreneintragList
    }
    throw new NotFoundError("Keine Beiträge für Foreneintrag " + idForeneintrag + " gefunden")
}
