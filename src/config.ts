import { EnvironmentConfiguration } from "./types/types"

const envName = import.meta.env.VITE_ENV

const envs = {
    debug: {
        baseUrl: 'http://localhost:3000'
    }
}

let environment: EnvironmentConfiguration

switch (envName) {
    case 'debug':
        environment = envs.debug
        break
    default:
        environment = {}
}

export default environment