const router = require('express').Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')


const User = require('../models/User.js')

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.status(401).json({ message: "Acesso negado" })
    }
    
    try {
        
        const secret = process.env.SECRET
        
        jwt.verify(token, secret)

        next()
        

    }catch(error){
        res.status(400).json({message: "Token inválido"})
    }
}

router.get("/:id", checkToken ,async (req, res) => {

    const id = req.params.id

    const user = await User.findById(id, '-password')

    if(!user){
        return res.status(404).json({message: "Usuário não encontrado"})
    }

    res.status(200).json({user})


})

module.exports = router