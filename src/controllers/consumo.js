
const db = require('../db');

// Listar consumos
exports.listar = (req, res) => {
    db.query('SELECT * FROM consumo', (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }
        res.json(resultado);
    });
};

// Cadastrar consumo
exports.cadastrar = (req, res) => {
    const { usuarioId, local, equipamento, consumoKwh, mesReferencia, status } = req.body;

    db.query(
        'INSERT INTO consumo (usuarioId, local, equipamento, consumoKwh, mesReferencia, status) VALUES (?, ?, ?, ?, ?, ?)',
        [usuarioId, local, equipamento, consumoKwh, mesReferencia, status],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }
            res.status(201).json({
                mensagem: 'Consumo cadastrado com sucesso!',
                id: resultado.insertId
            });
        }
    );
};

// Atualizar consumo
exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { usuarioId, local, equipamento, consumoKwh, mesReferencia, status } = req.body;

    db.query(
        'UPDATE consumo SET usuarioId = ?, local = ?, equipamento = ?, consumoKwh = ?, mesReferencia = ?, status = ? WHERE id = ?',
        [usuarioId, local, equipamento, consumoKwh, mesReferencia, status, id],
        (erro) => {
            if (erro) {
                return res.status(500).json(erro);
            }
            res.json({ mensagem: 'Consumo atualizado com sucesso!' });
        }
    );
};

// Excluir consumo
exports.excluir = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM consumo WHERE id = ?', [id], (erro) => {
        if (erro) {
            return res.status(500).json(erro);
        }
        res.json({ mensagem: 'Consumo excluído com sucesso!' });
    });
};

// Resumo: média de consumo em kWh
exports.resumo = (req, res) => {
    db.query(
        'SELECT AVG(consumoKwh) AS mediaConsumoKwh FROM consumo',
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }
            res.json(resultado[0]);
        }
    );
};