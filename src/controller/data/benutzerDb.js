import dbConnection from "./dbConnection"

function convertBenutzerRowToEntity(benutzerRow) {
    return {
        idBenutzer: benutzerRow.id_benutzer,
        idStudiengang: benutzerRow.id_studiengang,
        vorname: benutzerRow.vorname,
        nachname: benutzerRow.nachname,
        passwort: benutzerRow.passwort, //TODO hmmmmm?
        email: benutzerRow.email,
        bildPfad: benutzerRow.bild_pfad,
        statusAktiv: benutzerRow.status_aktiv,
    }
}

function convertEntityToBenutzerRow(benutzerEntity) {
    return {
        id_benutzer: benutzerEntity.idBenutzer,
        id_studiengang: benutzerEntity.idStudiengang,
        vorname: benutzerEntity.vorname,
        nachname: benutzerEntity.nachname,
        passwort: benutzerEntity.passwort,
        email: benutzerEntity.email,
        bild_pfad: benutzerEntity.bildPfad,
        status_aktiv: benutzerEntity.statusAktiv,
    }
}

export default function makeBenutzerDb() {
    //Insert new Forum
    function insertBenutzer(benutzer) {
        const benutzerRow = convertEntityToBenutzerRow(benutzer)
        console.log("row", benutzerRow)
        return dbConnection.insert(benutzerRow).into("benutzer")
    }

    //Get ForumList by ParentId
    function getForumListByParentId(idForum) {
        return dbConnection("forum")
            .where("id_parent_forum", idForum)
            .then((forumList) => forumList.map((forumRow) => convertForumRowToEntity(forumRow)))
    }

    function getBenutzerById(idBenutzer) {
        console.log("GET", idBenutzer)
        return dbConnection("benutzer")
            .where("id_benutzer", idBenutzer)
            .then((benutzerList) => (benutzerList[0] ? convertBenutzerRowToEntity(benutzerList[0]) : null))
    }

    return { insertBenutzer, getForumListByParentId, getBenutzerById }
}
