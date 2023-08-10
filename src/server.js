const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');

const app = express();
const port = 3000;

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

// Endpoint pour récupérer toutes les pages
app.get('/pages', (req, res) => {
  connection.query('SELECT * FROM pages', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Endpoint pour récupérer une page
app.get('/pages/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM pages WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result[0]);
  });
});

// Endpoint pour créer une page
app.post('/pages', (req, res) => {
  const { title, content } = req.body;
  connection.query(`INSERT INTO pages (title, content) VALUES ('${title}', '${content}')`, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Endpoint pour mettre à jour une page existante
app.put('/pages/:id', (req, res) => {
  const id = req.params.id;
  const { title, content } = req.body;
  const sql = `UPDATE pages SET title = ?, content = ? WHERE id = ?`;
  connection.query(sql, [title, content, id], (err) => {
    if (err) {
      console.log(err);
      res.status(500).send('Erreur lors de la maj de la page');
    } else {
      res.status(200).send('Page maj avec succès');
    }
  });
});

// Endpoint pour supprimer une page
app.delete('/pages/:id', (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM pages WHERE id = ${id}`;
  connection.query(sql, (error) => {
    if (error) {
      throw error;
    }
    res.send({ message: `Page with id ${id} deleted succesfully` });
  });
});

// Endpoint pour récupérer tous les utilisateurs
app.get('/users', (req, res) => {
  connection.query('SELECT * FROM utilisateur', (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Endpoint pour récupérer un utilisateur
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT * FROM users WHERE id = '${userId}'`;
  connection.query(sql, (error, result) => {
    if (error) throw error;
    res.send(result[0]);
  });
});

// Endpoint pour la connexion d'un utilisateur
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = `SELECT * FROM users WHERE username = '${username}'`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erreur lors de la connexion');
    }
    if (result.length === 0) {
      res.status(401).send('Utilisateur inconnu');
    }
    const user = result[0];
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.log(err);
        res.status(500).send('Erreur lors de la comparaison des mots de passe');
      }
      if (isMatch) {
        // Passwords match, user is authenticated
        res.send(user);
      } else {
        // Passwords don't match, authentication failed
        res.status(401).send('Mot de passe incorrect');
      }
    });
  });
});

// Endpoint pour créer un utilisateur
app.post('/register', (req, res) => {
  const { username, password } = req.body;

  // Vérifier si l'utilisateur existe déjà
  const checkUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
  connection.query(checkUserQuery, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erreur lors de la vérification de l\'utilisateur');
      return;
    }

    if (result.length > 0) {
      res.status(400).send('Cet utilisateur existe déjà');
    }
  });

  // Si l'utilisateur n'existe pas, on le crée
  const sql = `INSERT INTO users ( username, password) VALUES ('${username}', '${password}')`;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Erreur lors de la création de l\'utilisateur');
      return;
    }
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
  connection.query(sql, (error) => {
    if (error) throw error;
    res.send({ message: `Utilisateur avec l'ID ${userId} supprimé avec succès` });
  });
});

// Endpoint pour vérifier la présence d'un doublon
app.get('/checkDuplicateUser/:username', (req, res) => {
    const username = req.params.username;
    const sql = `SELECT COUNT(*) AS count FROM users WHERE username = '${username}'`;
    connection.query(sql, (error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send(false);
        } else {
          const count = result[0].count;
          res.send(count > 0);
        }
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
