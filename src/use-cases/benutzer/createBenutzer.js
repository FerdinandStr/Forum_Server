import makeBenutzerDb from "../../controller/data/benutzerDb"
import makeBenutzer from "../../entities/benutzer"

const benutzerDb = makeBenutzerDb()

export default async function createBenutzer(benutzer) {
    const benutzerEntity = await makeBenutzer(benutzer)
    const result = await benutzerDb.insertBenutzer(benutzerEntity)
    return result
}
