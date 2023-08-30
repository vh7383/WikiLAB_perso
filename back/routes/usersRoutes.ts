import express from "express";
import { Connection } from "mysql2";
import * as bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import {authConfig} from "../environment/auth";
import {HttpError} from "../middlewares/errorHandler";


const router = express.Router();

// Utilisation de la connexion pour définir les routes d'utilisateurs
export default (connection: Connection) => {

    // Endpoint pour récupérer tous les utilisateurs
    router.get('/users', (req, res, next) => {
        connection.query('SELECT * FROM users', (error, results) => {
            if (error) return next(new HttpError('Erreur lors de la récupération des utilisateurs', 500));
            res.send(results);
        });
    });

    // Endpoint pour récupérer un utilisateur
    router.get('/users/:id', (req, res, next) => {
        const id = req.params.id; // Ici, userId prend la valeur du paramètre de route :id
        const sql = `SELECT * FROM users WHERE id = ?`;
        connection.query(sql, [id], (error, result: any[]) => {
            if (error) return next(error);
            res.send(result[0]);
        });
    });

    // Endpoint pour la connexion d'un utilisateur
    router.post('/login', (req, res, next) => {
        const { name, password } = req.body;

        const sql = `SELECT * FROM users WHERE name = ?`;
        connection.query(sql, [name], (error, result: any[]) => {
            if (error) return next(error);
            const user = result[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Erreur lors de la comparaison des mots de passe');
                }
                if (isMatch) {
                    // Les mots de passe correspondent, l'utilisateur est authentifié
                    // Génération du token JWT
                    const token = jwt.sign({ id: user.id, role: user.role }, authConfig.secret, {
                        expiresIn: '1h'
                    });
                    // Envoi du token au client
                    res.json({ token });
                } else {
                    // Les mots de passe ne correspondent pas, échec de l'authentification
                    res.status(401).send('Mot de passe incorrect');
                }
            });
        });
    });

    // Endpoint pour créer un utilisateur
    router.post('/register', async (req, res) => {
        const { username, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const checkUserQuery = `SELECT * FROM users WHERE username = '${username}'`;
        connection.query(checkUserQuery, (error, result: any[]) => {
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
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users ( username, password) VALUES ('${username}', '${hashedPassword}')`;
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
    router.put('/users/:id', (req, res) => {
        const userId = req.params.id;
        const { name, password } = req.body;
        const sql = `UPDATE users SET name = '${name}', password = '${password}' WHERE id = '${userId}'`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            res.send(result);
        });
    });

    // Endpoint pour supprimer un utilisateur
    router.delete('/users/:id', (req, res) => {
        const userId = req.params.id;
        const sql = `DELETE FROM users WHERE id = '${userId}'`;
        connection.query(sql, (error) => {
            if (error) throw error;
            res.send({ message: `Utilisateur avec l'ID ${userId} supprimé avec succès` });
        });
    });

    // Endpoint pour vérifier la présence d'un doublon
    router.get('/checkDuplicateUser/:username', (req, res) => {
        const username = req.params.username;
        const sql = `SELECT COUNT(*) AS count FROM users WHERE username = '${username}'`;
        connection.query(sql, (error, result: any[]) => {
            if (error) {
                console.log(error);
                res.status(500).send(false);
            } else {
                const count = result[0].count;
                res.send(count > 0);
            }
        });
    });

    return router;
}