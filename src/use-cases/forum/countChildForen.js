import makeForumDb from "../../controller/data/forumDb"
const forumDb = makeForumDb()

export default async function countChildForen(idForum) {
    const count = await forumDb.countChildForums(idForum)
    if (count.length) {
        return count[0].count
    }
    throw new Error("Unexpected error: count failed")
}
