import makeForeneintragDb from "../../controller/data/foreneintragDb"
import makeForeneintrag from "../../entities/foreneintrag"
import createBeitrag from "../beitrag/createBeitrag"
import dbConnection from "../../config/knex/dbConnection"
const foreneintragDb = makeForeneintragDb()

export default async function createForeneintragWithBeitrag({ idForum, name, idKategorie, ersteller }, beitragInhalt) {
    const foreneintragEntity = makeForeneintrag({ idForum, name, idKategorie, ersteller })

    //check if Foreneintrag with same name in same forum exists already
    const alreadyExists = await foreneintragDb.getForeneintragList({ idForum: foreneintragEntity.idForum, name: foreneintragEntity.name })
    if (alreadyExists.length > 0) {
        throw new Error("Ein Foreneintrag mit dem selben Namen existiert in diesem Forum bereits!")
    }

    const trx = await dbConnection.transaction()
    try {
        //insert Foreneintrag
        const idForeneintrag = await foreneintragDb.insertForeneintrag(foreneintragEntity, trx)

        //insert required first Beitrag
        const idBeitrag = await createBeitrag(
            {
                idForum: foreneintragEntity.idForum,
                idForeneintrag: idForeneintrag,
                inhalt: beitragInhalt,
                ersteller: foreneintragEntity.ersteller,
            },
            trx
        )

        if (idForeneintrag && idBeitrag) {
            trx.commit()
            return { idForeneintrag, idBeitrag }
        }

        trx.rollback()
        console.log("ERROR ROLLBACK Foreneintrag !!!!!!??????", { idForeneintrag, idBeitrag })
        throw new Error("Unkown insertion error on Foreneintrag! Contact admin; IdForeneintrag=" + idForeneintrag + " IdBeitrag=" + idBeitrag)
    } catch (e) {
        console.log("ROLLBACK Foreneintrag insert!")
        trx.rollback() //should work automatically
        throw e
    }
}
