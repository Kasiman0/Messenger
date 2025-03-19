const Database = require('@system/database/database-client')

class roomRepository {
    constructor(){
        this.db = Database
    }

    async findRooms(userId) {
        return this.db.query('SELECT * FROM rooms WHERE $1 = ANY(users)', [userId])
    }

    async checkRoom(roomId) {
        return this.db.query('SELECT * FROM rooms WHERE room_id = $1', [roomId])
    }

    async pushRoom(userId, idArr){
        const temp1 = []
        temp1.push(userId)
        idArr.forEach(id => {
            temp1.push(id)
        })
        const temp2 = []
        if(temp1.length === 2) {
            temp2.push('admin', 'admin')
        } else {
            temp2.push('admin')
            for(let i = 1; i < temp1.length; i++) {
                temp2.push('user')
            }
        }
        const temp = []
        temp.push(temp1, temp2)
        this.db.query('INSERT INTO rooms(users, roles) VALUES ($1, $2)', temp)
    }
}

module.exports = new roomRepository()