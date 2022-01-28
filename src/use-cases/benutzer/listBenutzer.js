import makeBenutzerDb from "../../controller/data/benutzerDb"
const benutzerDb = makeBenutzerDb()

export default async function listBenutzer(idBenutzer) {
    const benutzerList = await benutzerDb.getBenutzerList(idBenutzer)
    return benutzerList
}
