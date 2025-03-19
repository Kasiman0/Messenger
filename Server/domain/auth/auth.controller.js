const validator = require('validator')
const jwt = require('jsonwebtoken')
const UserRepository = require('../users/user.repository')
const authConfig = require('../../config')
const Router = require('express').Router

class AuthController {
    constructor(){
        this.urep = UserRepository
        this.jwtSK = authConfig.auth.jwtSK
        
        this.router = Router()
        this.router.post('/api/register', this.registerUser)
        this.router.get('/api/login', this.loginUser)
    }

    createToken = async (email) => {
        return jwt.sign({email}, this.jwtSK, {expiresIn: '3d'})
    }

    registerUser = async (req, res) => {
        const {name, email, password} = req.body
        try{
            const result = await this.urep.checkUser(email)
            if (result.rowCount) {
                return res.status(400).json("User already exists")
            }
            if (!name || !email || !password) {
                return res.status(400).json("All fields required")
            }
            if (!validator.isEmail(email)) {
                return res.status(400).json("Email must be valid")
            }
            if (!validator.isStrongPassword(password)) {
                return res.status(400).json("Password must contain upper- and lowercase letters, numbers and special symbols")
            }
            const user = this.urep.createUser(name, email, await this.urep.hashPassword(password))
            await this.urep.pushUser(await user)
            const token = await this.createToken(email)
            res.status(200).json({name, email, token})
        } catch(error) {
            console.log(error)
            res.status(500).json(error)
        }

    }

    loginUser = async(req, res) => {
        const {email, password} = req.body
        const searchRes = await this.urep.checkUser(email)
        if (!(await searchRes.rows[0])) {
            console.log('error 1')
            return res.status(400).json("Wrong email or password")
        }
        if(!(await this.urep.checkPassword(password, await searchRes.rows[0].password))) {
            console.log('error 2')
            return res.status(400).json("Wrong email or password")
        }
        const token = await this.createToken(email)
        const name = await searchRes.rows[0].name
        res.status(200).json({name, email, token})
    }
}

module.exports = new AuthController()