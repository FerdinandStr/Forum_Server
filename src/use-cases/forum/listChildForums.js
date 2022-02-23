import makeForumDb from "../../controller/data/forumDb"
import makeForum from "../../entities/forum"

export default async function listChildForums(idParentForum, limit, offset) {
    const forumDb = makeForumDb()

    const forumList = await forumDb.getForumListByParentId(idParentForum, limit, offset)
    console.log(forumList)
    forumList.map((forum) => makeForum(forum))
    return forumList
}
