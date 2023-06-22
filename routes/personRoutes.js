const router = require('express').Router()

const Person = require('../models/Person')

router.post('/', async (req, res) => {

    const {name, salary, boolean} = req.body

    
    if(!name){
        res.status(422).json({ error: "O nome é obrigatório!"})
        return
    }
    if(!salary){
        res.status(422).json({ error: "O salário é obrigatório!"})
        return
    }
    if(!boolean){
        res.status(422).json({ error: "O status de aprovação é obrigatório!"})
        return
    }
    
    const approved = ( boolean === "true")
    
    
    const person = {
        name,
        salary,
        approved,
    }
    
    try{

        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida com sucesso!'})
        console.log(person)


    }catch (error){
        res.status(500).json({error: error})
    }

})

router.get('/', async (req, res) => {

    try{

        const people = await Person.find()

        res.status(200).json(people)

    }catch (error){
        res.status(500).json({error: error})
    }

})

router.get('/:id', async (req, res) => {

    const id = req.params.id
    
    try{
        
        const person = await Person.findOne({_id: id})
        
        console.log(person)

        if(!person){
            res.status(422).json({ message: "Usuário não encontrado"})
            return
        }

        res.status(200).json(person)

    }catch(error){
        res.status(500).json({error: error})
    }

})

module.exports = router