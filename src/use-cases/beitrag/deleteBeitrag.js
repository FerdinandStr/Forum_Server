import { BadRequestError, NotFoundError } from "../../config/express/middleware/custErrors"
import makeBeitragDb from "../../controller/data/beitragDb"
const beitragDb = makeBeitragDb()

export default async function deleteBeitrag(idBeitrag) {
    if (idBeitrag) {
        const result = await beitragDb.deleteBeitrag(idBeitrag)

        if (result === 1) {
            console.log("Beitrag " + idBeitrag + " deleted successfully; res=", result)
            return true
        }
        throw new NotFoundError("Beitrag with id " + idBeitrag + " not found; result=" + result)
    } else {
        throw new BadRequestError("idBeitrag is missing => " + idBeitrag)
    }
}
