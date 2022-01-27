import makeBenutzerDb from "../../controller/data/benutzerDb"
import makeBenutzer from "../../entities/benutzer"

const benutzerDb = makeBenutzerDb()

export default function createBenutzer(benutzer) {
    const benutzerEntity = makeBenutzer(benutzer)
    return benutzerDb.insertBenutzer(benutzerEntity)
}
