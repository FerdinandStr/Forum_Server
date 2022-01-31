import makeStudiengangDb from "../../controller/data/studiengangDb"
import makeStudiengang from "../../entities/studiengang"

const studiengangDb = makeStudiengangDb()

export default async function createStudiengang(studiengang) {
    const studiengangEntity = makeStudiengang(studiengang)
    const idStudiengang = await studiengangDb.insertStudiengang(studiengangEntity)
    if (idStudiengang) {
        return idStudiengang
    }
    console.log("ERROR !!!!!!??????", idStudiengang)
    throw new Error("Unkown insertion error on Studiengang! Contact admin" + idStudiengang)
}
