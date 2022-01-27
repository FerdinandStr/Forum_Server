import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import errorController from "./config/express/middleware/errorController"
import { checkToken } from "./config/express/middleware/auth"
import forumRoutes from "./controller/routes/forumRoutes"
import benutzerRoutes from "./controller/routes/benutzerRoutes"

const { port } = process.env

const server = express()
server.listen(port, () => {
    console.log("test server listening on ", port)
})
//Middlewares
server.use(cors({ allowedHeaders: "Content-Type", credentials: true, origin: true }))
server.use(express.json())
server.use(cookieParser())
server.use("/foren", forumRoutes)
server.use("/benutzer", benutzerRoutes)
server.use(errorController)

//DB Routes
// server.use(checkToken)
