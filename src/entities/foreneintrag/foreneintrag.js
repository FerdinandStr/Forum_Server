export default function buildMakeForeneintrag({ makeKategorie }) {
    return function makeForeneintrag(comment) {
        const { idForeneintrag, idForum, name, idKategorie, ersteller } = comment

        if (!idForum) {
            throw new Error("idForum foreignKey is missing")
        }
        if (!name) {
            throw new Error("Foreneintrag Name fehlt")
        }
        if (name.length < 5) {
            throw new Error("Foreneintrag Name muss mindestens 5 Zeichen lang sein")
        }
        if (!ersteller) {
            throw new Error("Foreneintrag Ersteller fehlt")
        }

        if (idKategorie && !Number.isInteger(idKategorie)) {
            throw new Error("idKategorie must be numeric")
        }

        return Object.freeze({ idForeneintrag, idForum, name, idKategorie, ersteller })
    }
}
