import makeBenutzerDb from "../../controller/data/benutzerDb"
const benutzerDb = makeBenutzerDb()

export default function getBenutzerById(idBenutzer) {
    return benutzerDb.getBenutzerById(idBenutzer)
}
