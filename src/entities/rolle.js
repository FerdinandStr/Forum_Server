export default function makeRolle(rolle) {
    const { idRolle, name } = rolle
    if (!name) {
        throw new Error("Rolle name is missing")
    }
    return Object.freeze(rolle)
}
