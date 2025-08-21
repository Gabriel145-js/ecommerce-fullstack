const express = require('express')
const cors = require('cors')
require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Cloudnary configs
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Importar rotas de categorias
const categoriasRoutes = require('./routes/categorias')
const produtosRoutes = require('./routes/produtos')
const imagensProdutos = require('./routes/imagens')

// Usar as rotas de categorias
app.use('/api/categorias', categoriasRoutes)
app.use('/api/produtos', produtosRoutes)
app.use('/api/imagens', imagensProdutos)

//Ping para ver se esta 'acordando' o servidor da Render via GitHub Actions
app.get('/ping', (req, res) => {
  res.send('pong ok');
});


//PORT é defenido no Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



