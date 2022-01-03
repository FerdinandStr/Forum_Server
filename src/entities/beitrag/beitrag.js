//TODO Beitrag
export default function buildMakeForum({}) {
    return function makeForum(comment) {
        const { idForum, name, creator } = comment

        if (idForum) {
            throw new Error("idForum is missing")
        }
        if (!name) {
            throw new Error("Forum name is missing")
        }
        if (name.length < 5) {
            throw new Error("Forum name must be longer than 5 chars")
        }
        if (!creator) {
            throw new Error("Forum creator is missing")
        }

        return { idForum, name, creator }
    }
}
