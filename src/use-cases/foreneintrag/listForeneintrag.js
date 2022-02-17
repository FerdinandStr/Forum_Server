import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeForeneintragDb from "../../controller/data/foreneintragDb"
const foreneintragDb = makeForeneintragDb()

export default async function listForeneintraege({ idForeneintrag, idForum, idKategorie, name }) {
    const foreneintragList = await foreneintragDb.getForeneintragList({ idForeneintrag, idForum, idKategorie, name })
    if (foreneintragList.length > 0) {
        return foreneintragList
    }
    throw new NotFoundError("Keine Foreneinträge gefunden")
}
