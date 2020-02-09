const express = require('express');
const router = express.Router();
const path1 = require('path');
const fs = require('fs');
var multer = require('multer');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })

router.get('/', (req, res) => {
  res.json({
    message: "got it"
  });
});

router.post('/login', function (req, res) {
  console.log(req.body)
  res.json({
    message: "successfully logged In"
  })
});


router.post('/register', upload.array('file', 5), function (req, res) {
  let path = {}
  for (const i of req.files) {
    path[i.originalname] = req.rawHeaders[1] + '/uploads/image?image=' + i.filename
  }
  fs.readFile(path1.join(__dirname, '../mockfile', 'users.json'), 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).send(err.message)
    } else {
      obj = JSON.parse(data); //now it an object
      obj.user.push({
        username: req.body.username,
        password: req.body.password,
        pictures: path
      });
      json = JSON.stringify(obj);
      fs.writeFile(path1.join(__dirname, '../mockfile', 'users.json'), json, 'utf8', (callback) => {
        console.log("data is written :-", callback)
      });
      res.status(200).json({
        message: "successfully registered"
      })
    }
  });
});

module.exports = router;
