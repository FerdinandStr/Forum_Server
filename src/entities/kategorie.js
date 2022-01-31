export default function makeKategorie(kategorie) {
    const { idKategorie, name } = kategorie
    if (!name) {
        throw new Error("Kategorie name is missing")
    }
    return Object.freeze(kategorie)
}
