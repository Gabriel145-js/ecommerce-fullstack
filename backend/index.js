const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app = express()

app.use(cors())
app.use(express.json())

// Importar rotas de categorias
const categoriasRoutes = require('./routes/categorias')


// Usar as rotas de categorias
app.use('/api/categorias', categoriasRoutes)

// Rota de teste

app.listen(5000, () => {
    console.log('Servidor rodando na porta 5000')
    console.log('Acesse: http://localhost:5000')
    console.log('Categorias: http://localhost:5000/api/categorias')

    console.log('database', process.env.DATABASE_URL)
})