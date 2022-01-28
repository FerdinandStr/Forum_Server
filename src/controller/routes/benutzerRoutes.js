import { Router } from "express"
import createBenutzer from "../../use-cases/benutzer/createBenutzer"
import deleteBenutzer from "../../use-cases/benutzer/deleteBenutzerById"
import getBenutzer from "../../use-cases/benutzer/getBenutzer"
import listBenutzer from "../../use-cases/benutzer/listBenutzer"

const router = Router()

router.post("/register", function postBenutzer(req, res, next) {
    const { idStudiengang, vorname, nachname, passwort, email } = req.body

    createBenutzer({ idStudiengang, vorname, nachname, passwort, email })
        .then(() => {
            return res.status(201).send()
        })
        .catch(next)
})
// get all Users
router.get("/all", function getUserList(req, res, next) {
    const idBenutzer = req.params.idBenutzer
    listBenutzer(idBenutzer)
        .then((benutzerList) => {
            return res.status(200).json(benutzerList)
        })
        .catch(next)
})
// get User by Id
router.get("/:idBenutzer", function getUsersById(req, res, next) {
    const idBenutzer = req.params.idBenutzer
    getBenutzer(idBenutzer)
        .then((benutzer) => {
            return res.status(200).json(benutzer)
        })
        .catch(next)
})
// delete User by Id
router.delete("/:idBenutzer", (req, res, next) => {
    const idBenutzer = req.params.idBenutzer
    deleteBenutzer(idBenutzer)
        .then(() => {
            return res.status(200).send()
        })
        .catch(next)
})

export default router
