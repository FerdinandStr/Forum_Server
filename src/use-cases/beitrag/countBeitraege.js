import makeBeitragDb from "../../controller/data/beitragDb"
const beitragDb = makeBeitragDb()

export default async function countBeitraegeByQuery({ idForum, idForeneintrag, ersteller }) {
    const count = await beitragDb.countBeitraege(idForum, idForeneintrag, ersteller)
    if (count.length) {
        return count[0].count
    }
    throw new Error("Unexpected error: count failed")
}
