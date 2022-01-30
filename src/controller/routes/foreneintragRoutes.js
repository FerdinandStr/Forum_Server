import { Router } from "express"
import createForeneintrag from "../../use-cases/foreneintrag/createForeneintrag"
import deleteForeneintrag from "../../use-cases/foreneintrag/deleteForeneintrag"
import listForeneintraege from "../../use-cases/foreneintrag/listForeneintrag"
import createForum from "../../use-cases/forum/createForum"
import deleteForum from "../../use-cases/forum/deleteForum"
import listChildForums from "../../use-cases/forum/listChildForums"

const router = Router()

router.post("/", function postForeneintrag(req, res, next) {
    const { idForum, name, idKategorie } = req.body
    const ersteller = req.benutzer.idBenutzer

    createForeneintrag({ idForum, name, idKategorie, ersteller })
        .then((result) => {
            console.log("foreneintrag commited", result)
            return res.status(201).json(result)
        })
        .catch(next)
})

router.get("/", function getForeneintraegeByQuery(req, res, next) {
    const { idForeneintrag, idForum, idKategorie } = req.query
    listForeneintraege({ idForeneintrag, idForum, idKategorie })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.delete("/:idForeneintrag", function deletForeneintragById(req, res, next) {
    const { idForeneintrag } = req.params
    deleteForeneintrag(idForeneintrag)
        .then(() => {
            return res.status(200).send()
        })
        .catch(next)
})

export default router
