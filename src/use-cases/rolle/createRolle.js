import makeRolleDb from "../../controller/data/rolleDb"
import makeRolle from "../../entities/rolle"

const rolleDb = makeRolleDb()

export default async function createRolle(rolle) {
    const rolleEntity = makeRolle(rolle)
    const idRolle = await rolleDb.insertRolle(rolleEntity)
    if (idRolle) {
        return idRolle
    }
    console.log("ERROR !!!!!!??????", idRolle)
    throw new Error("Unkown insertion error on Rolle! Contact admin" + idRolle)
}
