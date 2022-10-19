// Third-party imports
import { graphqlHTTP } from "express-graphql"

// Global imports
import { RootSchema } from "../schema"
import config from "../config"

// Local imports

////////////////////////////////////////////////////////////////////////////////

const GraphQLHandler = graphqlHTTP({
	schema: RootSchema,
	graphiql: config.USE_GRAPHIQL,
})

export default GraphQLHandler
