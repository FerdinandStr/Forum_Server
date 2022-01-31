import { BadRequestError, NotFoundError } from "../../config/express/middleware/custErrors"
import makeForeneintragDb from "../../controller/data/foreneintragDb"
const foreneintragDb = makeForeneintragDb()

export default async function deleteForeneintrag(idForeneintrag) {
    if (idForeneintrag) {
        const result = await foreneintragDb.deleteForeneintrag(idForeneintrag)

        if (result === 1) {
            console.log("Foreneintrag " + idForeneintrag + " deleted successfully; res=", result)
            return true
        }
        throw new NotFoundError("Foreneintrag with id " + idForeneintrag + " not found; result=" + result)
    } else {
        throw new BadRequestError("idForeneintrag is missing => " + idForeneintrag)
    }
}
