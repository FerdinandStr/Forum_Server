export default function buildMakeForeneintrag({ makeKategorie }) {
    return function makeForeneintrag(comment) {
        const { idForeneintrag, idForum, name, kategorie, ersteller } = comment

        if (!idForeneintrag) {
            throw new Error("idForeneintrag is missing")
        }
        if (!idForum) {
            throw new Error("idForum foreignKey is missing")
        }
        if (!name) {
            throw new Error("Forum name is missing")
        }
        if (name.length < 5) {
            throw new Error("Forum name must be longer than 5 chars")
        }
        if (!ersteller) {
            throw new Error("Forum ersteller is missing")
        }
        const validKategorie = makeKategorie(kategorie)

        return Object.freeze({ idForum, name, kategorie: validKategorie, ersteller })
    }
}
