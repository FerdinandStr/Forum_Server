import makeForeneintragDb from "../../controller/data/foreneintragDb"
import makeForeneintrag from "../../entities/foreneintrag"

const foreneintragDb = makeForeneintragDb()

export default async function updateForeneintrag(foreneintragData) {
    const foreneintragEntity = makeForeneintrag(foreneintragData)
    const result = await foreneintragDb.updateForeneintrag(foreneintragEntity)
    if (result > 0) {
        return true
    }
    throw new Error("Update failed; result=" + result)
}
