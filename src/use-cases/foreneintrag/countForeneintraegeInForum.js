import makeForeneintragDb from "../../controller/data/foreneintragDb"
const foreneintragDb = makeForeneintragDb()

export default async function countForeneintraegeInForum(idForum) {
    const count = await foreneintragDb.countForeneintraegeInForum(idForum)
    if (count.length) {
        return count[0].count
    }
    throw new Error("Unexpected error: count failed")
}
