import validator from "validator"

export default function buildMakeForeneintrag({ makeKategorie }) {
    return function makeForeneintrag(comment) {
        const { idForeneintrag, idForum, name, idKategorie, ersteller } = comment

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

        if (idKategorie && !Number.isInteger(idKategorie)) {
            throw new Error("idKategorie must be numeric")
        }

        console.log("!", idKategorie)

        return Object.freeze({ idForeneintrag, idForum, name, idKategorie, ersteller })
    }
}
