
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const routes = require('./src/routes');

app.use(routes);

app.get('/', (req, res) => {
    res.send('API de Registro de Consumo de Energia funcionando!');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});