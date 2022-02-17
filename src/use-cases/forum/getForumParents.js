import { NotFoundError } from "../../config/express/middleware/custErrors"
import makeForumDb from "../../controller/data/forumDb"

const forumDb = makeForumDb()

export default async function getForumParents(idForum) {
    const result = await forumDb.getForumParents(idForum)
    if (result) {
        return result
    }
    console.log("Error getting Path for Forum" + idForum, result)
    throw new NotFoundError("Das angegebene Forum wurde nicht gefunden")
}
