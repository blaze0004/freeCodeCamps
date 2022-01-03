var express = require('express');
const path = require('path');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

const fileMetadataMicroserviceRoutes = express.Router();

fileMetadataMicroserviceRoutes.use(express.static(path.resolve(__dirname, 'public')));

fileMetadataMicroserviceRoutes.post('/api/fileanalyse', upload.any() ,(req, res) => {
  const [file] = req.files;

  if (file) {
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    })
  }
})

fileMetadataMicroserviceRoutes.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

module.exports = fileMetadataMicroserviceRoutes;