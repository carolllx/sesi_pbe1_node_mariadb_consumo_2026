
const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gestao_consumo'
});

conexao.connect((erro) => {
    if (erro) {
        console.log('Erro ao conectar ao banco:', erro);
        return;
    }

    console.log('Conectado ao banco de dados gestao_consumo!');
});

module.exports = conexao;