function isValidMail(email) {
    return email
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
}

export default function makeBenutzer(benutzer) {
    const { idBenutzer, idStudiengang, vorname = "", nachname = "", passwort = "", email = "", bildPfad = "", statusAktiv = 1 } = benutzer

    if (!passwort) {
        throw new Error("Passwort is missing")
    }
    if (!email) {
        throw new Error("E-Mail is missing")
    }

    if (!isValidMail(email)) {
        throw new Error("E-Mail validation error, please enter a correct E-Mail")
    }

    if (statusAktiv !== 1 && statusAktiv !== 0) {
        throw new Error("statusAktiv needs to be 0 or 1")
    }

    return { idBenutzer, idStudiengang, vorname, nachname, passwort, email, bildPfad, statusAktiv }
}
