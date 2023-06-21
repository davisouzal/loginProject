const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()

const Person = require('./models/Person')

//JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//Rotas
app.get('/', (req, res) => {

    res.json({  message: 'Oi Express!'  })

})
app.post('/person', async (req, res) => {

    const {name, salary, approved} = req.body
    
    
    if(!name){
        res.status(422).json({ error: "O nome é obrigatório!"})
    }
    if(!salary){
        res.status(422).json({ error: "O salário é obrigatório!"})
    }
    if(!approved){
        res.status(422).json({ error: "O status de aprovação é obrigatório!"})
    }
    
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

//entregar uma porta
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.wwboavo.mongodb.net/?retryWrites=true&w=majority`
)
.then(() => {
    console.log("Conectamos ao MongoDB!")
    const PORT = 3000
    app.listen(PORT, function (){
        console.log("Server rodando!")
    })
})
.catch((err) => console.log(err))

