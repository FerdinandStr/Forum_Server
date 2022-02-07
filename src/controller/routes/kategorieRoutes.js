import { Router } from "express"
import createKategorie from "../../use-cases/kategorie/createKategorie"
import deleteKategorie from "../../use-cases/kategorie/deleteKategorie"
import listKategorie from "../../use-cases/kategorie/listKategorie"
import { verifyToken } from "./benutzerRoutes"

const router = Router()

router.get("/", function getBeitraegeByQuery(req, res, next) {
    const { idKategorie, name } = req.query
    listKategorie({ idKategorie, name })
        .then((result) => {
            return res.status(200).json(result)
        })
        .catch(next)
})

router.use("/", verifyToken)
// ######################## ALL ROUTES BELOW ARE SECURED ######################## //

router.post("/", function postKategorie(req, res, next) {
    const { name } = req.body

    createKategorie({ name })
        .then((idKategorie) => {
            console.log("Kategorie commited", idKategorie)
            return res.status(201).json({ idKategorie })
        })
        .catch(next)
})

router.delete("/:idKategorie", function deleteKategorieById(req, res, next) {
    const { idKategorie } = req.params
    deleteKategorie(idKategorie)
        .then(() => {
            return res.status(200).send()
        })
        .catch(next)
})

export default router
