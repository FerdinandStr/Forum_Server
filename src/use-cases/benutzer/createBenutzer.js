import makeBenutzerDb from "../../controller/data/benutzerDb"
import makeBenutzer from "../../entities/benutzer"

const benutzerDb = makeBenutzerDb()

export default async function createBenutzer(benutzer) {
    const benutzerEntity = await makeBenutzer(benutzer)
    return benutzerDb.insertBenutzer(benutzerEntity)
}
