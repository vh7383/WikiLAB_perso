const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

// Endpoint pour enregistrer un nouvel utilisateur
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Cet utilisateur existe déjà' });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insérer l'utilisateur dans la base de données
    const result = await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

    // Générer un jeton d'authentification
    const token = jwt.sign({ username: username }, 'your_secret_key');

    res.status(201).json({ message: 'Utilisateur enregistré avec succès', token: token });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de l\'utilisateur', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'enregistrement de l\'utilisateur' });
  }
});

// Endpoint pour se connecter
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Vérifier si l'utilisateur existe dans la base de données
    const user = await db.query('SELECT * FROM users WHERE username = ?', [username]);
    if (user.length === 0) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    // Vérifier si le mot de passe correspond
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }

    // Générer un jeton d'authentification
    const token = jwt.sign({ username: username }, 'your_secret_key');

    res.status(200).json({ message: 'Authentification réussie', token: token });
  } catch (error) {
    console.error('Erreur lors de l\'authentification de l\'utilisateur', error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'authentification de l\'utilisateur' });
  }
});

module.exports = router;
