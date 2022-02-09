import makeForeneintragDb from "../../controller/data/foreneintragDb"
import makeForeneintrag from "../../entities/foreneintrag"

const foreneintragDb = makeForeneintragDb()

export default async function createForeneintrag(foreneintragData) {
    const foreneintragEntity = makeForeneintrag(foreneintragData)

    //check if Foreneintrag with same name in same forum exists already
    const alreadyExists = await foreneintragDb.getForeneintragList({ idForum: foreneintragEntity.idForum, name: foreneintragEntity.name })
    if (alreadyExists.length > 0) {
        throw new Error("Ein Foreneintrag mit dem selben Namen existiert in diesem Forum bereits!")
    }

    const idForeneintrag = await foreneintragDb.insertForeneintrag(foreneintragEntity)
    if (idForeneintrag) {
        return idForeneintrag
    }
    console.log("ERROR !!!!!!??????", idForeneintrag)
    throw new Error("Unkown insertion error on Foreneintrag! Contact admin" + idForeneintrag)
}
