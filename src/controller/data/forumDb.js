//THIS SHOULD BE INJECTED
import dbConnection from "../../config/knex/dbConnection"

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
    function getForumListByParentId(idForum, limit, offset) {
        return dbConnection("forum")
            .where("id_parent_forum", idForum)
            .limit(limit)
            .offset(offset)
            .then((forumList) => forumList.map((forumRow) => convertForumRowToEntity(forumRow)))
    }

    function deleteForum(idForum) {
        return dbConnection("forum").where("id_forum", idForum).del()
    }

    function getForumParents(idForum) {
        return dbConnection
            .raw(
                "WITH RECURSIVE nodes_cte( " +
                    "id_forum, id_parent_forum, name, depth, id_path, name_path) AS( " +
                    "SELECT tn.id_forum, tn.id_parent_forum, tn.name, 1::INT AS depth, tn.id_forum::TEXT AS id_path, tn.name::TEXT AS name_path " +
                    "FROM public.forum AS tn  " +
                    "WHERE tn.id_parent_forum IS NULL " +
                    "UNION ALL " +
                    "SELECT c.id_forum, c.id_parent_forum, c.name, p.depth + 1 AS depth,  " +
                    "(p.id_path || '->' || c.id_forum::TEXT), " +
                    "(p.name_path || '->' || c.name::TEXT)  " +
                    "FROM nodes_cte AS p, public.forum AS c  " +
                    "WHERE c.id_parent_forum = p.id_forum " +
                    ") " +
                    "SELECT id_path, name_path FROM nodes_cte AS n WHERE n.id_forum = ? ",
                [idForum]
            )
            .then((result) => (result.rows[0] ? result.rows[0] : false))
    }

    return { insertForum, getForumListByParentId, deleteForum, getForumParents }
}
