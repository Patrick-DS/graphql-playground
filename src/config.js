// Third-party imports
import dotenv from "dotenv"

// Global imports

// Local imports

////////////////////////////////////////////////////////////////////////////////

dotenv.config()

const envNames = {
	DEV: "development",
}

const config = {
	USE_GRAPHIQL: process.env.NODE_ENV === envNames.DEV,
	GRAPHQL_API_PORT: process.env.GRAPHQL_API_PORT,
}

export default config
