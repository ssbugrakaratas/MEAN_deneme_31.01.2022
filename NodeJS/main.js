const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db_connection.js');
const calisan_controller = require('./controllers/calisan_controller');

const app = express();
app.use(bodyParser.json());


app.use(cors({
    origin: '*'
}));

app.listen(3000, () => console.log('Express bu portta çalışıyor : 3000'));

app.use('/calisanlar', calisan_controller);