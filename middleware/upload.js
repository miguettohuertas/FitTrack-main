const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Cria a pasta de uploads se não existir
const pasta = path.join(__dirname, '..', 'public', 'images', 'usuarios');
if (!fs.existsSync(pasta)) {
    fs.mkdirSync(pasta);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pasta);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname); 
    const nomeArquivo = Date.now() + ext;
    cb(null, nomeArquivo);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;