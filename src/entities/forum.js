function makeRolle(e) {
    //TODO
    console.log("MAKEROLLE TODO", e)
}

export default function makeForum(forum) {
    console.log("FORUM", forum)
    const { idForum = 0, idParentForum = 1, name = "", rollen = [], ersteller, createdAt, updatedAt } = forum

    if (!idParentForum) {
        throw new Error("idParentForum is missing")
    }
    if (!Number.isInteger(idParentForum)) {
        throw new Error("idParentForum must be numeric")
    }
    if (!name) {
        throw new Error("Forum name is missing")
    }
    if (name.length < 5) {
        throw new Error("Forum name must be longer than 5 chars")
    }
    if (!ersteller) {
        throw new Error("Forum Ersteller is missing")
    }
    //TODO rollen
    const validRollen = rollen ? rollen.map((rolle) => makeRolle(rolle)) : []

    return { idForum, idParentForum, name, rollen: validRollen, ersteller, createdAt, updatedAt }
}
