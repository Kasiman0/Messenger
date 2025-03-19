const bcrypt = require('bcrypt')
const Database = require('@system/database/database-client')
const User = require('./user')

class UserRepository {

    constructor() {
        this.db = Database
    }

    async checkUser(email)
    {
        return this.db.query('SELECT * FROM users WHERE email = $1', [email])
    }

    async createUser(name, email, password) {
        return new User(name, email, password)
    }

    async hashPassword(password) {
        try{
        const slt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, slt)
        }catch(error){
            console.log(error)
        }
    }

    async checkPassword(pass, passdb) {
        return await bcrypt.compare(pass, passdb)
    }

    async pushUser(user) {
        try {
            const temp = []
            temp.push(user.name, user.email, user.password)
            await this.db.query('INSERT INTO users(name, email, password) VALUES ($1, $2, $3)', temp)
        } catch(error)
        {
            return console.log(error)
        }
    }
}



module.exports = new UserRepository()