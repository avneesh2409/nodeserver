const express = require('express');
const router = express.Router();
const path = require('path');
var multer = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-'+file.originalname)
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
for(const i of req.files)
{
	path[i.originalname] = req.rawHeaders[1]+'/uploads/image?image='+i.filename
}
console.log(path)
if(req.files){
   res.status(200).json({
url:path
})
}
else{
res.status(400).send("error")
}
});

module.exports = router;
