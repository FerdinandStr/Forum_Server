import makeForeneintragDb from "../../controller/data/foreneintragDb"
import makeForeneintrag from "../../entities/foreneintrag"

const foreneintragDb = makeForeneintragDb()

export default async function createForeneintrag(foreneintrag) {
    const foreneintragEntity = makeForeneintrag(foreneintrag)
    const idForeneintrag = await foreneintragDb.insertForeneintrag(foreneintragEntity)
    if (idForeneintrag) {
        return idForeneintrag
    }
    console.log("ERROR !!!!!!??????", idForeneintrag)
    throw new Error("Unkown insertion error on Foreneintrag! Contact admin" + idForeneintrag)
}
