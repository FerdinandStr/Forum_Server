import { Router } from "express"
import createForum from "../../use-cases/forum/createForum"
import deleteForum from "../../use-cases/forum/deleteForum"
import listChildForums from "../../use-cases/forum/listChildForums"

const router = Router()

router.post("/", function postForum(req, res, next) {
    console.log("what", req.body)
    const { name, idParentForum, rollen, ersteller } = req.body
    createForum({ name, idParentForum, rollen, ersteller })
        .then((result) => {
            console.log("forum commited", result)
            return res.status(201).send()
        })
        .catch(next)
})

router.get("/", function getForumsByQuery(req, res, next) {
    const { idParentForum } = req.query
    listChildForums({ idParentForum })
        .then((result) => {
            return res.status(200).json(result)
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
