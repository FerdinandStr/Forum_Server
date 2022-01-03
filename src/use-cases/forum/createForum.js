import makeForumDb from "../../controller/data/forumDb"
import makeForum from "../../entities/forum"

export default function createForum(forum) {
    const forumEntity = makeForum(forum)
    const forumDb = makeForumDb()
    const exists = false //TODO check if Forum with same name exists already
    return forumDb.insertForum(forumEntity)
}
