import { Router } from "express"
import createBenutzer from "../../use-cases/benutzer/createBenutzer"
import getBenutzerById from "../../use-cases/benutzer/getBenutzerById"

const router = Router()

router.post("/", async function postBenutzer(req, res, next) {
    const { idStudiengang, vorname, nachname, passwort, email } = req.body

    createBenutzer({ idStudiengang, vorname, nachname, passwort, email })
        .then((result) => {
            console.log("User created", result)
            return res.status(201).send()
        })
        .catch(next)
})

router.get("/:idBenutzer", async function getUsersById(req, res, next) {
    const idBenutzer = req.params.idBenutzer
    getBenutzerById(idBenutzer)
        .then((benutzer) => {
            if (benutzer) {
                return res.send(benutzer)
            }
            return next(new Error("Kein Benutzer für id " + idBenutzer + " gefunden!"))
        })
        .catch(next)
})

export default router
