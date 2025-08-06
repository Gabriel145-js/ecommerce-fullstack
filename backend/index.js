const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express()

app.use(cors())
app.use(express.json())


app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000')
})