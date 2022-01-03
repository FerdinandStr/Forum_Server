import { Router } from "express"
import User from "../models/User"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { checkToken } from "../middleware/auth"

const router = Router()

//* create new User
router.post("/register", (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body
    const user = new User({ username, email, password, passwordConfirm })
    console.log("sanity")

    user.save()
        .then((user) => {
            console.log("SAVED!", user)
            addCookieToken(user, res)
            return res.status(201).json({ username: user.username, _id: user._id })
        })
        .catch(next)
})

//* login User
router.post("/login", (req, res, next) => {
    const { login, password } = req.body

    if (!login || !password) {
        console.log("LOGIN FAILED", req.body)
        return res.status(400).send({ error: "E-Mail and password is required." })
    }

    User.findByLogin(login)
        .then((user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, check) => {
                    if (check) {
                        addCookieToken(user, res)

                        return res.status(200).json({ username: user.username, _id: user._id })
                    }
                    return res.status(400).send({ error: "Invalid credentials." })
                })
            } else {
                return res.status(404).send({ error: "User does not exist." })
            }
        })
        .catch(next)
})

//removes cookie/token
router.post("/logout", (req, res, next) => {
    const options = {
        path: "/",
        expires: new Date(1996, 0),
    }
    res.cookie("x-access-token", "", options)
    return res.status(200).send()
})

//This will check if a cookie is provided and tell the JS application that the cookie is valid and the user is login in "automatically"
router.use("/checkLogin", checkToken)
router.post("/checkLogin", (req, res, next) => {
    return res.status(200).send({ username: req.user.username, _id: req.user._id })
})

function addCookieToken(user, res) {
    const token = jwt.sign({ username: user.username, _id: user._id }, process.env.TOKEN_KEY, { expiresIn: "2h" })
    const options = {
        httpOnly: true,
        path: "/",
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24, //24h
    }
    res.cookie("x-access-token", token, options)
}
