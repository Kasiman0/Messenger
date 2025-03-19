const roomRepository = require('./room.repository')
const Router = require('express').Router

class roomController {
    constructor(){
        
        this.rrep = roomRepository

        this.router = Router()
        this.router.post('/api/postroom', this.postRoom)
        this.router.get('/api/fetchrooms', this.fetchRooms)
        this.router.get('/api/getroom', this.getRoom)        
    }

    getRoom = async(req, res) => {
        const {roomId, userId} = req.body
        const result = await this.rrep.checkRoom(roomId)
        const idArr = []
        let role
        result.rows[0].users.forEach(user => {
            idArr.push(user)
        })
        for(let i = 0; i < idArr.length; i++)
        {
            if(idArr[i] === userId) {
                role = result.rows[0].roles[i]
                break;
            }
        }
        res.status(200).json({idArr, role})
    }

    fetchRooms = async(req, res) => {
        const {userId} = req.body
        const result = await this.rrep.findRooms(userId)
        const idArr = []
        result.rows.forEach(row => {
            idArr.push(row.room_id)
        })
        res.status(200).json(idArr)
    }

    postRoom = async (req, res) => {
        let {userId, idArr} = req.body
        await this.rrep.pushRoom(userId, idArr)
        res.status(200).json()
    }
}

module.exports = new roomController()