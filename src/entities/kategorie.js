export default function makeKategorie(kategorie) {
    const { idKategorie, name } = kategorie
    //TODO validation
    return Object.freeze(kategorie)
}
