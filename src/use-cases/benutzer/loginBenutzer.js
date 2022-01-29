import makeBenutzerDb from "../../controller/data/benutzerDb"
import bcrypt from "bcrypt"
import { BadRequestError, UnauthorizedError } from "../../config/express/middleware/custErrors"
const benutzerDb = makeBenutzerDb()

export default async function loginBenutzer(email, password) {
    if (!email || !password) {
        throw new BadRequestError("E-Mail und Passwort benötigt.")
    }

    const benutzer = await benutzerDb.getBenutzerForLogin(email)
    if (benutzer) {
        const match = await bcrypt.compare(password, benutzer.passwort)
        if (match) {
            return { idBenutzer: benutzer.idBenutzer }
        }
        throw new UnauthorizedError("Email und Passwort Kombination stimmen nicht überein!")
    }
}
