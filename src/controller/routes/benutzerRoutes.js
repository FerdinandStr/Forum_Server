import { Router } from "express"
import { checkToken, createToken, LOGIN_DURATION } from "../../config/express/middleware/auth"
import createBenutzer from "../../use-cases/benutzer/createBenutzer"
import deactivateBenutzer from "../../use-cases/benutzer/deactivateBenutzer"
import getBenutzer from "../../use-cases/benutzer/getBenutzer"
import listBenutzer from "../../use-cases/benutzer/listBenutzer"
import loginBenutzer from "../../use-cases/benutzer/loginBenutzer"
const COOKIE_NAME = "x-access-token"

const router = Router()
//create new User
router.post("/register", function postBenutzer(req, res, next) {
    const { idStudiengang, vorname, nachname, passwort, email } = req.body

    createBenutzer({ idStudiengang, vorname, nachname, passwort, email })
        .then((idBenutzer) => {
            const token = createToken({ idBenutzer: idBenutzer })
            addToken(res, token)
            return res.status(201).json({ idBenutzer })
        })
        .catch(next)
})

//* login User
router.post("/login", (req, res, next) => {
    const { email, passwort } = req.body

    loginBenutzer(email, passwort)
        .then((idBenutzer) => {
            const token = createToken({ idBenutzer: idBenutzer })
            addToken(res, token)

            return res.status(200).json({ idBenutzer })
        })
        .catch(next)
})
// ######################## ALL ROUTES BELOW ARE SECURED ######################## //
router.use("/", verifyToken)

//removes cookie/token
router.post("/logout", (req, res, next) => {
    res.clearCookie(COOKIE_NAME)
    return res.status(200).send()
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
    deactivateBenutzer(idBenutzer).then(() => {
        return res.status(200).send()
    }).catch(next)

    /*deleteBenutzer(idBenutzer)
        .then(() => {
            return res.status(200).send()
        })
        .catch(next)*/
})

//This will check if a cookie is provided and tell the JS application that the cookie is valid and the user is login in "automatically"
// router.use("/checkLogin", verifyLogin)
router.post("/checkLogin", (req, res, next) => {
    return res.status(200).send({ id: req.benutzer.idBenutzer })
})

function addToken(res, token) {
    const options = {
        httpOnly: true,
        path: "/",
        sameSite: true,
        maxAge: LOGIN_DURATION * 1000,
    }
    res.cookie(COOKIE_NAME, token, options)
}

export function verifyToken(req, res, next) {
    const token = req.cookies[COOKIE_NAME]
    if (!token) {
        return res.status(401).send({ error: "A token is required for authentication" })
    }
    const decodedToken = checkToken(token)

    req.benutzer = decodedToken
    return next()
}

export default router
