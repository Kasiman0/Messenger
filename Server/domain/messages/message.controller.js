const messageRepository = require('./message.repository')
const Router = require('express').Router

class messageController {
    constructor() {
        this.mrep = messageRepository

        this.router = Router()
        this.router.get('/api/fetchmessages', this.fetchMessages)
        this.router.post('/api/postmessage', this.postMessage)
    }

    fetchMessages = async(req, res) => {
        const {roomId} = req.body
        const result = await this.mrep.findMessages(roomId)
        const mesArr = []
        result.rows.forEach(row => {
            mesArr.push(row)
        })
        res.status(200).json(mesArr)
    }

    postMessage = async(req, res) => {
        const {userId, roomId, content} = req.body
        if(!content) {
            return res.status(400).json("message empty")
        }
        this.mrep.pushMessage(userId, roomId, content)
        res.status(200).json()
    }
}

module.exports = new messageController()