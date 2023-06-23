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

    if(id.length!=24){
        res.status(422).json({ message: "O número de caracteres de um usuário é de 24 digitos. Por favor verifique se você o digitou corretamente."})
    }
    else{
        try{
            
            const person = await Person.findOne({_id: id})
            
            console.log("Pessoa: " + person)

            if(!person){
                res.status(422).json({ message: "Usuário não encontrado"})
                return
            }

            res.status(200).json(person)

        }catch(error){
            res.status(500).json({error: error})
        }
    }
})

router.patch('/:id', async (req, res) => {

    const id = req.params.id

    if(id.length!=24){
        res.status(422).json({ message: "O número de caracteres de um usuário é de 24 digitos. Por favor verifique se você o digitou corretamente."})
    }
    else{
        const { name, salary, boolean } = req.body

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

            const updatePerson = await Person.updateOne({_id: id}, person)
        
            res.status(200).json(person)

        }catch(error){
        res.status(500).json({error: error})
        }

    }
})

router.delete('/:id', async (req, res) => {

    const id = req.params.id

    if(id.length!=24){
        res.status(422).json({ message: "O número de caracteres de um usuário é de 24 digitos. Por favor verifique se você o digitou corretamente."})
    }
    else{
        
        const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({ message: 'O usuário não foi encontrado! '})
            return
        }
        
        try {
            
            await Person.deleteOne({_id: id})
            
            res.status(200).json({message: "Usuário removido com sucesso!"})

        }catch(error){
            res.status(500).json({ error: error})
        }
    }
})



module.exports = router