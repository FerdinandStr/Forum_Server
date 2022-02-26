import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeForumDb from "../../controller/data/forumDb"

export default async function listChildForen(idParentForum, limit, offset) {
    const forumDb = makeForumDb()

    const forumList = await forumDb.getForumListByParentId(idParentForum, limit, offset)
    if (forumList.length > 0) {
        return forumList
    }
    throw new NotFoundError("Keine Unterforen gefunden")
}
