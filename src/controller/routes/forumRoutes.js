import { Router } from "express"
import listForeneintraege from "../../use-cases/foreneintrag/listForeneintrag"
import createForum from "../../use-cases/forum/createForum"
import deleteForum from "../../use-cases/forum/deleteForum"
import getForumParents from "../../use-cases/forum/getForumParents"
import listChildForums from "../../use-cases/forum/listChildForums"
import { verifyToken } from "./benutzerRoutes"

const router = Router()

router.get("/", function getForumsByQuery(req, res, next) {
    const { idParentForum } = req.query //hier erweitern oder route löschen
    listChildForums(idParentForum)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.get("/:idForum/unterforen", function getUnterforen(req, res, next) {
    const { idForum } = req.params
    listChildForums(idForum)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.get("/:idForum/foreneintraege", function getForeneintraegeByForumId(req, res, next) {
    const { idForum } = req.params
    listForeneintraege({ idForum })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.get("/:idForum/forumParents", function getForumParentPath(req, res, next) {
    const { idForum } = req.params
    getForumParents(idForum)
        .then((data) => {
            res.json(data)
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
