import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import WrestlersDAO from "./dao/wrestlersDAO.js"
import CommentsDAO from "./dao/commentsDAO.js"
dotenv.config()
const MongoClient = mongodb.MongoClient



const port = process.env.PORT || 8000
MongoClient.connect(
    process.env.AEWWRESTLERS_DB_URI,
    {
      maxpoolSize: 50,
      wtimeoutMS: 2500,
      useNewUrlParser: true }
    )
    .catch(err => {
      console.error(err.stack)
      process.exit(1)
    })
    .then(async client => {
        await WrestlersDAO.injectDB(client)
        await CommentsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
      })
    })
