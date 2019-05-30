const cors = require("cors")
const express = require("express")
const compress = require("compression")


const expressGraphQL = require("express-graphql")
const schema = require("./schema/schema")

const serverName = "graphql-server-example"
const port = 5000

const app = express()

app.use(cors()) // enable `cors` to set HTTP response header: Access-Control-Allow-Origin: *

app.use(compress());

app.use(
  "/",
  expressGraphQL({
    schema,
    graphiql: process.env.NODE_ENV === "development"
  })
)

app.listen(port, () => {
  console.info(`✅  Server "${serverName}" is up...`)
  console.info(`✅  NODE_ENV: ${process.env.NODE_ENV}`)
  console.info("")
  console.info(`> Started on port ${port}`)
})
