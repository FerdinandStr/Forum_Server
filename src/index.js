import "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"
import express from "express"
import errorController from "./config/express/middleware/errorController"
import forumRoutes from "./controller/routes/forumRoutes"
import foreneintragRoutes from "./controller/routes/foreneintragRoutes"
import beitragRoutes from "./controller/routes/beitragRoutes"
import kategorieRoutes from "./controller/routes/kategorieRoutes"
import studiengangRoutes from "./controller/routes/studiengangRoutes"
import benutzerRoutes, { verifyToken } from "./controller/routes/benutzerRoutes"

const { port } = process.env

const server = express()
server.listen(port, () => {
    console.log("test server listening on ", port)
})
//Middlewares
server.use(cors({ allowedHeaders: "Content-Type", credentials: true, origin: true }))
server.use(express.json())
server.use(cookieParser())
server.use("/benutzer", benutzerRoutes)
server.use(verifyToken)
// ######################## ALL ROUTES BELOW ARE SECURED ######################## //
server.use("/foren", forumRoutes)
server.use("/foreneintraege", foreneintragRoutes)
server.use("/beitraege", beitragRoutes)
server.use("/kategorien", kategorieRoutes)
server.use("/studiengaenge", studiengangRoutes)
server.use(errorController)

//DB Routes
// server.use(checkToken)
