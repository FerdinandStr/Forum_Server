import makeForumDb from "../../controller/data/forumDb"
import makeForum from "../../entities/forum"
const forumDb = makeForumDb()

export default async function createForum(forum) {
    const forumEntity = makeForum(forum)
    const idForum = await forumDb.insertForum(forumEntity)
    if (idForum) {
        return idForum
    }
    console.log("ERROR !!!!!!??????", idForum)
    throw new Error("Unkown insertion error on Forum! Contact admin" + idForum)
}
