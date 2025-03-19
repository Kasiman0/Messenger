const { Client } = require('pg')

class Database {

    #init

    constructor() {
        this.#init = false
    }

    setConfig(dbConfig) {
        this.dbConfig = dbConfig
        this.client = new Client(dbConfig)
    }


    async initialize() {
        if(this.#init) {
            throw new Error('Can not initialize a connection to db again')
        }
        await this.client.connect()
        console.log('Connected to the database successfully')
    }

    async query(queryString, params) {
        return this.client.query(queryString, params)
    }
}


module.exports = new Database()