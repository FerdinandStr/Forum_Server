import makeForumDb from "../../controller/data/forumDb"
import makeForum from "../../entities/forum"
const forumDb = makeForumDb()

export default function createForum(forum) {
    const forumEntity = makeForum(forum)
    return forumDb.insertForum(forumEntity)
}
