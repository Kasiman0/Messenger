const Database = require('@system/database/database-client')

class messageRepository {
    constructor() {
        this.db = Database
    }

    async findMessages(roomId) {
        return this.db.query('SELECT * FROM messages WHERE room_id = $1', [roomId])
    }

    async pushMessage(userId, roomId, content) {
        const dateTime = new Date()
        this.db.query('INSERT INTO messages(user_id, room_id, content, date_time) VALUES ($1, $2, $3, $4)', [userId, roomId, content, dateTime])
    }
}

module.exports = new messageRepository()