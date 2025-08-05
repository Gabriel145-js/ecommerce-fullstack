const express = require('express')
const {Pool} = require('pg')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

const db = new Pool ({
    connectionString: process.env.DATABASE_URL
})


app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000')
})