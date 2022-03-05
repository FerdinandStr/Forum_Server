import makeForumDb from "../../controller/data/forumDb"
import makeForum from "../../entities/forum"
const forumDb = makeForumDb()

export default async function createForum(forum) {
    const forumEntity = makeForum(forum)

    //check if Subforum with same name in same forum exists already
    const alreadyExists = await forumDb.selectForumListByQuery({ idParentForum: forumEntity.idParentForum, name: forumEntity.name })
    if (alreadyExists.length > 0) {
        throw new Error("Ein Unterforum mit dem selben Namen existiert in diesem Forum bereits!")
    }

    const idForum = await forumDb.insertForum(forumEntity)
    if (idForum) {
        return idForum
    }
    console.log("ERROR !!!!!!??????", idForum)
    throw new Error("Unkown insertion error on Forum! Contact admin" + idForum)
}
