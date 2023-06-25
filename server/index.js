const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
require('dotenv').config()

// DB_USER = dsl
// DB_PASSWORD = d9erlyeuKmEwhF7G


//JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.use(cors)

//Rotas de pessoas do CRUD
const personRoutes = require('./routes/personRoutes.js')
app.use('/person', personRoutes)

//Rotas de autenticação de usuário
const authRoutes = require('./routes/authRoutes.js')
app.use('/auth', authRoutes)

//Rotas de usuários logados
const userRoutes = require('./routes/userRoutes.js')
app.use('/user', userRoutes)

//Rotas
app.get('/', (req, res) => {

    res.json({  message: 'Oi Express!'  })

})

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



