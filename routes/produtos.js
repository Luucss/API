const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;


//Consulta de produto
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error}) }
        conn.query(
            'SELECT * FROM produto_cad;',
            (error, resultado, fields) => {
                if (error) {return res.status(500).send({ error: error}) }
                return res.status(200).send({response: resultado})
            }
        )
    });
});

//Consulta de produto pelo ID
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM produto_cad WHERE id = ?;',
            [req.params.id_produto],
            (error, resultado, fields) => {
                if (error) { return res.status(500).send({ error: error}) }
                return res.status(200).send({response: resultado})
            }
        )
    });   
});

//Cadastrar produto
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error}) }
        conn.query(
            'INSERT INTO produto_cad (codigo, nome, quantidade) VALUES (?,?,?)',
            [req.body.codigo, req.body.nome, req.body.quantidade],
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error}) }

                res.status(201).send({
                    mensagem: 'Produto Cadastrado!',
                    id_produto: resultado.insertId
                });
            }    
        )
    });
});


//Alterar produto
router.put('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error}) }
        conn.query(
            `UPDATE produto_cad 
                SET codigo     = ?,
                    nome       = ?,
                    quantidade = ?
              WHERE id =?`,
            [req.body.codigo, req.body.nome,
                req.body.quantidade,
                req.body.id
            ],
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error}) }

                res.status(202).send({
                    mensagem: 'Alterado!'
                });
            }    
        )
    });
});

//Deleter produto
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {return res.status(500).send({ error: error}) }
        conn.query(
            `DELETE FROM produto_cad WHERE id =?`,
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if (error) {return res.status(500).send({ error: error}) }

                res.status(202).send({
                    mensagem: 'Deletado!'
                });
            }    
        )
    });
});

module.exports = router;