const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// DB_USER = dsl
// DB_PASSWORD = d9erlyeuKmEwhF7G


//JSON
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

const authRoutes = require('./routes/authRoutes')
app.use('/auth', authRoutes)

//Rotas
app.get('/', (req, res) => {

    res.json({  message: 'Oi Express!'  })

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

