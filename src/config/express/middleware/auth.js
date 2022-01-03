const jwt = require("jsonwebtoken")

const { TOKEN_KEY } = process.env

function checkToken(req, res, next) {
    const token = req.cookies["x-access-token"]

    if (!token) {
        return res.status(403).send({ error: "A token is required for authentication" })
    }

    try {
        const decoded = jwt.verify(token, TOKEN_KEY)
        req.user = decoded
        return next()
    } catch (err) {
        return res.status(401).send({ error: "Invalid Token" })
    }
}

export { checkToken }
