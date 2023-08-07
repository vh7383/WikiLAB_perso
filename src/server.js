const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3000;
//const pageRouter = require('./routes/page');

const connection = mysql.createConnection({
  host     : '192.168.0.15',
  port     : '3011',
  user     : 'root',
  password : 'silab',
  database : 'WikiLAB'
});

connection.connect(error => {
  if(error) {
    console.log('Error connecting to Db');
    return;
  }
  console.log('Connection established');
});
connection.ping(error => {
  if(error) {
    console.log('Error pinging to Db');
    return;
  }
  console.log('Connection is active');
});

app.use(cors());
app.use(bodyParser.json());

/*
// Montage du routeur pageRouter à l'URL de base
app.use('/pages', pageRouter);
*/

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM utilisateur', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/pages', (req, res) => {
  connection.query('SELECT * FROM pages', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/pages/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM pages WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

app.post('/pages', (req, res) => {
  const { title, content } = req.body;
  connection.query(`INSERT INTO pages (title, content) VALUES ('${title}', '${content}')`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.put('/pages/:id', (req, res) => {
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

app.delete('/pages/:id', (req, res) => {
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

app.get('/users', (req, res) => {
  connection.query('SELECT * FROM users', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM users WHERE id = '${userId}'`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result[0]);
  });
});

app.post('/users', (req, res) => {
  const { username, password } = req.body;
  const sql = `INSERT INTO users ( username, password) VALUES ('${username}', '${password}')`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

// Endpoint pour mettre à jour un utilisateur existant
app.put('/users/:id', (req, res) => {
  const userId = req.params.id;
  const { name, password } = req.body;
  const sql = `UPDATE users SET name = '${name}', password = '${password}' WHERE id = '${userId}'`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result);
  });
});

// Endpoint pour supprimer un utilisateur
app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `DELETE FROM users WHERE id = '${userId}'`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.send({ message: `Utilisateur avec l'ID ${userId} supprimé avec succès` });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
