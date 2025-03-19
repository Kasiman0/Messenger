require('module-alias/register')
const express  = require("express")
const cors     = require("cors")
const Config   = require('./config')
const Database = require('./system/database/database-client.js')
const AuthController = require('./domain/auth/auth.controller.js')
const roomController = require('./domain/rooms/room.controller.js')
const messageController = require('./domain/messages/message.controller.js')

// TODO: Who can do this better?
async function main() {
    Database.setConfig(Config.db)
    await Database.initialize()
    const app = express()
    
    app.use([ express.json(), cors() ])
    const Router = express.Router()
    const controllers = [AuthController, roomController, messageController]
    controllers.forEach(controller => Router.use(controller.router))
    app.use(Router)
    app.listen(Config.app.port, (req, res) => {
        console.log(`Server is listening on port ${Config.app.port}`)
    })
}

main()
