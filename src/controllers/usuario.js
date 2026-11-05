
const db = require('../db');

// Listar usuários
exports.listar = (req, res) => {
    db.query('SELECT * FROM usuario', (erro, resultado) => {
        if (erro) {
            return res.status(500).json(erro);
        }
        res.json(resultado);
    });
};

// Cadastrar usuário
exports.cadastrar = (req, res) => {
    const { nome, email, senha } = req.body;

    db.query(
        'INSERT INTO usuario (nome, email, senha) VALUES (?, ?, password(?))',
        [nome, email, senha],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }
            res.status(201).json({
                mensagem: 'Usuário cadastrado com sucesso!',
                id: resultado.insertId
            });
        }
    );
};

// Atualizar usuário
exports.atualizar = (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    db.query(
        'UPDATE usuario SET nome = ?, email = ?, senha = password(?) WHERE id = ?',
        [nome, email, senha, id],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }
            res.json({ mensagem: 'Usuário atualizado com sucesso!' });
        }
    );
};

// Excluir usuário
exports.excluir = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM usuario WHERE id = ?', [id], (erro) => {
        if (erro) {
            return res.status(500).json(erro);
        }
        res.json({ mensagem: 'Usuário excluído com sucesso!' });
    });
};

// Login
exports.login = (req, res) => {
    const { email, senha } = req.body;

    db.query(
        'SELECT * FROM usuario WHERE email = ? AND senha = password(?)',
        [email, senha],
        (erro, resultado) => {
            if (erro) {
                return res.status(500).json(erro);
            }

            if (resultado.length === 0) {
                return res.status(401).json({
                    mensagem: 'E-mail ou senha incorretos!'
                });
            }

            res.json({
                mensagem: 'Login realizado com sucesso!',
                usuario: resultado[0]
            });
        }
    );
};