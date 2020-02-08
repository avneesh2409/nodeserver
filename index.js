const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const app = express();
const PORT = process.env.PORT || 5005;
const cors = require('cors');
const path = require('path');
const url = require('url');
app.use(cors());

app.use(express.static('uploads/'));
app.get("/uploads/image", (req,res)=>{
let url_parts = url.parse(req.url,true);
res.sendFile(__dirname + '/uploads/'+url_parts.query.image)
})


app.use('/user', users);


app.listen(PORT, () => {
    console.log("server is listening on :- port ", PORT)
})
