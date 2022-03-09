export default function makeBeitrag(beitrag) {
    const { idForum, idForeneintrag, inhalt, ersteller } = beitrag

    if (!idForum) {
        throw new Error("Beitrag idForum is missing")
    }
    if (!Number.isInteger(idForum)) {
        throw new Error("Beitrag idForum needs to be an Integer")
    }
    if (!idForeneintrag) {
        throw new Error("Beitrag idForeneintrag is missing")
    }
    if (!Number.isInteger(idForeneintrag)) {
        throw new Error("Beitrag idForeneintrag needs to be an Integer")
    }
    if (!inhalt || inhalt.length < 1) {
        throw new Error("Inhalt kann nicht leer sein")
    }
    if (!ersteller) {
        throw new Error("Beitrag Ersteller fehlt")
    }

    return { idForum, idForeneintrag, inhalt, ersteller }
}
