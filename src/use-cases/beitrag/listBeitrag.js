import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeBeitragDb from "../../controller/data/beitragDb"
const beitragDb = makeBeitragDb()

export default async function listBeitrag({ idBeitrag, idForum, idForeneintrag, ersteller }) {
    const beitragList = await beitragDb.getBeitragList(idBeitrag, idForum, idForeneintrag, ersteller)
    if (beitragList.length > 0) {
        return beitragList
    }
    throw new NotFoundError("Keine Foreneinträge gefunden")
}
