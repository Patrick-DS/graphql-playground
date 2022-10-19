// Third-party imports
import express from "express"

// Global imports
import { GraphQLHandler } from "./middleware"

// Local imports
import config from "./config"

////////////////////////////////////////////////////////////////////////////////

const app = express()

app.use("/graphql", GraphQLHandler)
app.listen(config.GRAPHQL_API_PORT, () => {
	console.log(`Listening to incoming requests on port ${config.GRAPHQL_API_PORT}.`)
})
