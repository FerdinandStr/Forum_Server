import { Router } from "express"
import createForeneintrag from "../../use-cases/foreneintrag/createForeneintrag"
import deleteForeneintrag from "../../use-cases/foreneintrag/deleteForeneintrag"
import listBeitraegeForForeneintrag from "../../use-cases/foreneintrag/listBeitraegeForForeneintrag"
import listForeneintraege from "../../use-cases/foreneintrag/listForeneintrag"
import updateForeneintrag from "../../use-cases/foreneintrag/updateForeneintrag"
import { verifyToken } from "./benutzerRoutes"

const router = Router()

router.get("/", function getForeneintraegeByQuery(req, res, next) {
    const { idForeneintrag, idForum, idKategorie, name } = req.query
    listForeneintraege({ idForeneintrag, idForum, idKategorie, name })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

//get all Beiträge for Foreneintrag with Creator and Info
router.get("/:idForeneintrag/beitraege", function getBeitraegeForForeneintrag(req, res, next) {
    const { idForeneintrag } = req.params

    listBeitraegeForForeneintrag(idForeneintrag)
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.use("/", verifyToken)
// ######################## ALL ROUTES BELOW ARE SECURED ######################## //

router.post("/", function postForeneintrag(req, res, next) {
    const { idForum, name, idKategorie } = req.body
    const ersteller = req.benutzer.idBenutzer

    createForeneintrag({ idForum, name, idKategorie, ersteller })
        .then((idForeneintrag) => {
            console.log("foreneintrag commited", idForeneintrag)
            return res.status(201).json({ idForeneintrag })
        })
        .catch(next)
})

router.patch("/:idForeneintrag", function patchForeneintrag(req, res, next) {
    const { idForum, name, idKategorie } = req.body
    const { idForeneintrag } = req.params
    const ersteller = req.benutzer.idBenutzer //OVERWRITE!!! //TODO weg lassen? was tun?

    updateForeneintrag({ idForeneintrag, idForum, name, idKategorie, ersteller })
        .then((result) => {
            console.log("foreneintrag updated", result)
            return res.status(201).send()
        })
        .catch(next)
})

router.delete("/:idForeneintrag", function deleteForeneintragById(req, res, next) {
    const { idForeneintrag } = req.params
    deleteForeneintrag(idForeneintrag)
        .then(() => {
            return res.status(200).send()
        })
        .catch(next)
})

export default router
