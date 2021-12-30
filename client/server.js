const express = require('express');
const app = express();
const path = require("path");

const port = 3002;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/public', express.static(path.join(__dirname, './public')));

app.get('/', (req, res) => {
    console.log('*** serving root of demo app ( / )');
    res.sendFile(path.resolve(__dirname + '/public' + '/index.html'))
})

//Global 404 handler
app.use('*', (req, res) => {
    return res.status(404).send('********** GLOBAL BAD REQUEST / 404 ERROR **********');
});

const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
