const router = require('express').Router()

const User = require('../models/User')

router.post('/register', async (req, res) => {

    const { name, email, password, confirmpassword } = req.body

    if(!name){
        return res.status(422).json({ message: "O nome é obrigatório "})
    }
    if(!email){
        return res.status(422).json({ message: "O email é obrigatório "})

    }
    if(!password){
        return res.status(422).json({ message: "A senha é obrigatória "})
    }
    
    if(password !== confirmpassword){
        return res.status(422).json({ message: "As senhas não conferem! "})
    }
})

module.exports = router