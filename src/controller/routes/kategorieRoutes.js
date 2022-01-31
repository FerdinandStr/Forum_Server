import { Router } from "express"
import createKategorie from "../../use-cases/kategorie/createKategorie"
import deleteKategorie from "../../use-cases/kategorie/deleteKategorie"
import listKategorie from "../../use-cases/kategorie/listKategorie"

const router = Router()

router.post("/", function postKategorie(req, res, next) {
    const { name } = req.body

    createKategorie({ name })
        .then((kategorie) => {
            console.log("Kategorie commited", kategorie)
            return res.status(201).json({ kategorie })
        })
        .catch(next)
})

router.get("/", function getBeitraegeByQuery(req, res, next) {
    const { idKategorie, name } = req.query
    listKategorie({ idKategorie, name })
        .then((result) => {
            return res.status(200).json(result)
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
