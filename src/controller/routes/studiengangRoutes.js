import { Router } from "express"
import createStudiengang from "../../use-cases/studiengang/createStudiengang"
import deleteStudiengang from "../../use-cases/studiengang/deleteStudiengang"
import listStudiengang from "../../use-cases/studiengang/listStudiengang"
import { verifyToken } from "./benutzerRoutes"

const router = Router()

router.get("/", function getBeitraegeByQuery(req, res, next) {
    const { idStudiengang, name, kuerzel } = req.query
    listStudiengang({ idStudiengang, name, kuerzel })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.use("/", verifyToken)
// ######################## ALL ROUTES BELOW ARE SECURED ######################## //

router.post("/", function postStudiengang(req, res, next) {
    const { name, kuerzel } = req.body

    createStudiengang({ name, kuerzel })
        .then((idStudiengang) => {
            console.log("Studiengang commited", idStudiengang)
            return res.status(201).json({ idStudiengang })
        })
        .catch(next)
})

router.delete("/:idStudiengang", function deleteStudiengangById(req, res, next) {
    const { idStudiengang } = req.params
    deleteStudiengang(idStudiengang)
        .then(() => {
            return res.status(200).send()
        })
        .catch(next)
})

export default router
