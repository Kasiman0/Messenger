const dotenv = require('dotenv')
const path = require('node:path')

const NODE_ENV = process.env.NODE_ENV


class Config {
    constructor(nodeEnv) {
        this.nodeEnv = nodeEnv
        if(nodeEnv === 'local') {
            dotenv.config({
                path: path.resolve(__dirname, '..', `.env.${nodeEnv}`)
            })
        }
        this.#serializeEnvs()
    }

    #serializeEnvs() {
        this.db = {
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            database: process.env.DB_DATABASE_NAME
        }

        this.app = {
            port: Number(process.env.PORT),
            root: process.env.ROOT
        }

        this.auth = {
            jwtSK: process.env.JWT_SK
        }
    }
}


module.exports = new Config(NODE_ENV)