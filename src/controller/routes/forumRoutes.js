import { Router } from "express"
import createForum from "../../use-cases/forum/createForum"
import deleteForum from "../../use-cases/forum/deleteForum"
import getForumParentPath from "../../use-cases/forum/getForumParentPath"
import listForeneintraegeForForum from "../../use-cases/foreneintrag/listForeneitraegeInForum"
import { verifyToken } from "./benutzerRoutes"
import countForeneintraegeInForum from "../../use-cases/foreneintrag/countForeneintraegeInForum"
import listChildForen from "../../use-cases/forum/listChildForen"
import countChildForen from "../../use-cases/forum/countChildForen"
import getForenByQuery from "../../use-cases/forum/getForenByQuery"

const router = Router()

router.get("/", function getForumsByQuery(req, res, next) {
    const { idForum, idParentForum, name, ersteller } = req.query
    getForenByQuery({ idForum, idParentForum, name, ersteller })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.get("/:idForum/unterforen", function getUnterforen(req, res, next) {
    const { idForum } = req.params
    const { limit, offset } = req.query

    listChildForen(idForum, limit, offset)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.get("/:idForum/foreneintraege", function getForeneintraegeByForumId(req, res, next) {
    const { idForum } = req.params
    const { limit, offset } = req.query

    listForeneintraegeForForum(idForum, limit, offset)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.get("/:idForum/forumParents", function getForumParentPathRoute(req, res, next) {
    const { idForum } = req.params
    getForumParentPath(idForum)
        .then((data) => {
            res.json(data)
        })
        .catch(next)
})

router.get("/:idForum/unterforen/count", function getCountUnterforen(req, res, next) {
    const { idForum } = req.params

    countChildForen(idForum)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.get("/:idForum/foreneintraege/count", function getCountForeneintraegeInForum(req, res, next) {
    const { idForum } = req.params

    countForeneintraegeInForum(idForum)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.use("/", verifyToken)
// ######################## ALL ROUTES BELOW ARE SECURED ######################## //
router.post("/", function postForum(req, res, next) {
    const { name, idParentForum, rollen } = req.body
    const ersteller = req.benutzer.idBenutzer

    createForum({ name, idParentForum, rollen, ersteller })
        .then((idForum) => {
            console.log("forum commited", idForum)
            return res.status(201).json({ idForum })
        })
        .catch(next)
})

router.delete("/:idForum", function deletForumById(req, res, next) {
    const { idForum } = req.params
    deleteForum(idForum)
        .then(() => {
            return res.status(200).send()
        })
        .catch(next)
})

export default router
