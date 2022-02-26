import { Router } from "express"
import countBeitraegeByQuery from "../../use-cases/beitrag/countBeitraege"
import createBeitrag from "../../use-cases/beitrag/createBeitrag"
import deleteBeitrag from "../../use-cases/beitrag/deleteBeitrag"
import listBeitrag from "../../use-cases/beitrag/listBeitrag"
import { verifyToken } from "./benutzerRoutes"

const router = Router()

router.get("/", function getBeitraegeByQuery(req, res, next) {
    const { idBeitrag, idForum, idForeneintrag, ersteller } = req.query
    listBeitrag({ idBeitrag, idForum, idForeneintrag, ersteller })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.get("/count", function getCountBeitraegeByQuery(req, res, next) {
    const { idForum, idForeneintrag, ersteller } = req.query
    countBeitraegeByQuery({ idForum, idForeneintrag, ersteller })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.use("/", verifyToken)
// ######################## ALL ROUTES BELOW ARE SECURED ######################## //

router.post("/", function postBeitrag(req, res, next) {
    const { idForum, idForeneintrag, inhalt } = req.body
    const ersteller = req.benutzer.idBenutzer

    createBeitrag({ idForum, idForeneintrag, inhalt, ersteller })
        .then((idBeitrag) => {
            console.log("Beitrag commited", idBeitrag)
            return res.status(201).json({ idBeitrag })
        })
        .catch(next)
})

router.delete("/:idBeitrag", function deleteBeitragById(req, res, next) {
    const { idBeitrag } = req.params
    deleteBeitrag(idBeitrag)
        .then(() => {
            return res.status(200).send()
        })
        .catch(next)
})

export default router
