import { Router } from "express"
import User from "../models/User"

const router = Router()

//*get all Users
router.get("/", (req, res) => {
    User.find()
        .then((result) => {
            return res.json(result)
        })
        .catch((error) => {
            return res.json(next)
        })
})
//*ind user by ID
router.get("/:userId", (req, res, next) => {
    User.findById(req.params.userId)
        .then((result) => {
            return res.json(result)
        })
        .catch(next)
})
//*delete user
router.delete("/:userId", (req, res, next) => {
    User.deleteOne({ _id: req.params.userId })
        .then((result) => res.json(result))
        .catch(next)
})

//*patch user
//patch like put but for single elements (put "always" update/overwrite whole element)
//req.body will replace whatever is inside (only elements in model are possible)
router.patch("/:userId", (req, res, next) => {
    User.updateOne({ _id: req.params.userId }, { $set: req.body })
        .then((result) => res.json(result))
        .catch(next)
})

// export default router
