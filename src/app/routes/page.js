const express = require('express');
const router = express.Router();

// Modèle de Page
const Page = require('../models/page');

// Endpoint pour récupérer toutes les pages
router.get('/pages', (req, res) => {
  connection.query('SELECT * FROM pages', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Endpoint pour récupérer une page spécifique
router.get('/pages/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM pages WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Endpoint pour créer une nouvelle page
router.post('/pages', (req, res) => {
  const { title, content } = req.body;
  connection.query(`INSERT INTO pages (title, content) VALUES ('${title}', '${content}')`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Endpoint pour mettre à jour une page existante
router.put('/pages/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const sql = `UPDATE pages SET title = ?, content = ? WHERE id = ?`;
  connection.query(sql, [title, content, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la maj de la page');
    } else {
      res.status(200).send('Page maj avec succès');
    }
  });
});

// Endpoint pour supprimer une page
router.delete('pages/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM pages WHERE id = ${id}`;
  connection.query(sql, (error, results) => {
    if (error) {
      throw error;
      console.log(error);
    }
    res.send({ message: `Page with id ${id} deleted succesfully` });
  });
});

module.exports = router;
