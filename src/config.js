// Third-party imports
import dotenv from "dotenv"

// Global imports

// Local imports

////////////////////////////////////////////////////////////////////////////////

dotenv.config()

const config = {
	GRAPHQL_API_PORT: process.env.GRAPHQL_API_PORT,
}

export default config
