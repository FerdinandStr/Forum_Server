export default function makeBeitrag(beitrag) {
    const { idForum, idForeneintrag, inhalt, ersteller } = beitrag

    if (!idForum) {
        throw new Error("idForum is missing")
    }
    if (!Number.isInteger(idForum)) {
        throw new Error("idForum needs to be an Integer")
    }
    if (!idForeneintrag) {
        throw new Error("Forum idForeneintrag is missing")
    }
    if (!Number.isInteger(idForeneintrag)) {
        throw new Error("idForeneintrag needs to be an Integer")
    }
    if (!inhalt || inhalt.length < 1) {
        throw new Error("Inhalt cant be empty")
    }
    if (!ersteller) {
        throw new Error("Forum ersteller is missing")
    }

    return { idForum, idForeneintrag, inhalt, ersteller }
}
