import { BadRequestError, NotFoundError } from "../../config/express/middleware/custErrors"
import makeForumDb from "../../controller/data/forumDb"
import makeForum from "../../entities/forum"
const forumDb = makeForumDb()

export default async function deleteForum(idForum) {
    if (idForum) {
        const result = await forumDb.deleteForum(idForum)

        if (result === 1) {
            console.log("Forum " + idForum + " deleted successfully; res=", result)
            return true
        }
        throw new NotFoundError("Forum with id " + idForum + " not found; result=" + result)
    } else {
        throw new BadRequestError("idForum is missing => " + idForum)
    }
}
