import express from "express"
import cors from "cors"
import wrestlers from "./api/wrestlers.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/wrestlers", wrestlers)
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))

export default app