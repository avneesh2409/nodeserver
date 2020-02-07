const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.static('public/'));
app.get('/', (req, res) => {
    res.send('index.html');
})
app.use('/user', users);

app.use('*', (err, req, res) => {
    res.status(404).send("404 Error occured");

})


app.listen(PORT, () => {
    console.log("server is listening on :- port ", PORT)
})