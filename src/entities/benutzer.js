import bcrypt from "bcrypt"
import validator from "validator"

function isValidPassword(password) {
    return password && password.length < 8 && password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$/)
}

export default async function makeBenutzer(benutzer) {
    const { idBenutzer, idStudiengang, vorname = "", nachname = "", passwort = "", email = "", bildPfad = "", statusAktiv = 1 } = benutzer
    //TODO was noch prüfen?
    if (!email) {
        throw new Error("E-Mail is missing")
    }

    if (!validator.isEmail(email)) {
        throw new Error("E-Mail validation error, please enter a correct E-Mail")
    }

    if (isValidPassword(passwort)) {
        throw new Error("Passwort muss mindestens 8 Zeichen lang sein, Klein-/Großbuchstaben und eine Zahl enthalten.")
    }

    if (statusAktiv !== 1 && statusAktiv !== 0) {
        throw new Error("statusAktiv needs to be 0 or 1")
    }

    const passwortHash = await bcrypt.hash(passwort, 12)

    return { idBenutzer, idStudiengang, vorname, nachname, passwort: passwortHash, email, bildPfad, statusAktiv }
}
