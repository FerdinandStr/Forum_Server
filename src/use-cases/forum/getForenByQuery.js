import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeForumDb from "../../controller/data/forumDb"

export default async function getForenByQuery({ idForum, idParentForum, name, ersteller }) {
    const forumDb = makeForumDb()

    const forumList = await forumDb.selectForumListByQuery({ idForum, idParentForum, name, ersteller })
    if (forumList.length > 0) {
        return forumList
    }
    throw new NotFoundError("Keine Foren gefunden")
}
