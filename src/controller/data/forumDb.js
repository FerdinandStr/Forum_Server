//THIS SHOULD BE INJECTED
import dbConnection from "./dbConnection"

function convertForumRowToEntity(forumRow) {
    return {
        idForum: forumRow.id_forum,
        idParentForum: forumRow.id_parent_forum,
        name: forumRow.name,
        ersteller: forumRow.ersteller,
        createdAt: forumRow.created_at,
        updatedAt: forumRow.updated_at,
    }
}

function convertEntityToForumRow(forumEntity) {
    return {
        id_forum: forumEntity.idForum,
        id_parent_forum: forumEntity.idParentForum,
        name: forumEntity.name,
        ersteller: forumEntity.ersteller,
    }
}

export default function makeForumDb() {
    //Insert new Forum
    function insertForum(forum) {
        const forumRow = convertEntityToForumRow(forum)
        return dbConnection
            .insert(forumRow)
            .into("forum")
            .returning("id_forum")
            .then((id) => id[0])
    }

    //Get ForumList by ParentId
    function getForumListByParentId(idForum) {
        return dbConnection("forum")
            .where("id_parent_forum", idForum)
            .then((forumList) => forumList.map((forumRow) => convertForumRowToEntity(forumRow)))
    }

    function deleteForum(idForum) {
        return dbConnection("forum").where("id_forum", idForum).del()
    }

    return { insertForum, getForumListByParentId, deleteForum }
}
