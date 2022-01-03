export default function buildMakeKategorie() {
    return function makeKategorie(kategorie) {
        const { idKategorie, name } = kategorie
        //TODO validation
        return Object.freeze(kategorie)
    }
}
