const express = require('express');
const router = express.Router();
const path = require('path');
var multer = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })

router.get('/', (req, res) => {
  console.log(req)
  res.status(200).json({
    message: "we got your request"
  });
});

router.post('/login', function (req, res) {
  console.log(req.body)
  res.json({
    message: "successfully logged In"
  })
});


router.post('/register', upload.array('file', 5), function (req, res) {
  console.log(req.body)
  res.json({
    message: "successfully registered",
    data: req.files
  });
});

module.exports = router;
