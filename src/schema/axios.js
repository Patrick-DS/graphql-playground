// Third-party imports
import axios from "axios"

// Global imports
import config from "../config"

// Local imports

////////////////////////////////////////////////////////////////////////////////

const jsonAxios = axios.create({
	baseURL: config.JSON_SERVER_URL,
})

export default jsonAxios
