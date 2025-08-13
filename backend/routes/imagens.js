const express = require('express');
const router = express.Router();
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'produtos',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage });

router.post('/upload', upload.fields([
    { name: 'imagemPrincipal', maxCount: 1 },
    { name: 'imagensAdicionais', maxCount: 10 },
]), async (req, res) => {
    try {
        const imagemPrincipal = req.files['imagemPrincipal']?.[0]?.path || null;
        const imagensAdicionais = req.files['imagensAdicionais']?.map(file => file.path) || [];

        res.json({
            imagemPrincipal,
            imagensAdicionais,
        });
    } catch (error) {
        console.error('Erro ao fazer upload:', error);
        res.status(500).json({ error: 'Erro ao fazer upload' });
    }
});

module.exports = router;