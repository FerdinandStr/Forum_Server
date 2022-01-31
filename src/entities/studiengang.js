export default function makeStudiengang(studiengang) {
    const { idStudiengang, name, kuerzel } = studiengang
    if (!name) {
        throw new Error("Studiengang Name is missing")
    }
    if (!kuerzel) {
        throw new Error("Kuerzel name is missing")
    }

    return Object.freeze(studiengang)
}
