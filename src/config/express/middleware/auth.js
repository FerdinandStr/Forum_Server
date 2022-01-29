import { UnauthorizedError } from "./custErrors"

const jwt = require("jsonwebtoken")

const { TOKEN_KEY } = process.env
const LOGIN_DURATION = 60 * 60 * 24

function createToken(tokenData) {
    const token = jwt.sign(tokenData, TOKEN_KEY, { expiresIn: LOGIN_DURATION })
    return token
}

function checkToken(token) {
    try {
        const decoded = jwt.verify(token, TOKEN_KEY)
        return decoded
    } catch (err) {
        throw new UnauthorizedError("Invalid Token")
    }
}

export { createToken, checkToken, LOGIN_DURATION }
