"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt = __importStar(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../environment/auth");
const errorHandler_1 = require("../middlewares/errorHandler");
const router = express_1.default.Router();
// Utilisation de la connexion pour définir les routes d'utilisateurs
exports.default = (connection) => {
    // Endpoint pour récupérer tous les utilisateurs
    router.get('/getAllUsers', (req, res, next) => {
        connection.query('SELECT * FROM users', (error, results) => {
            if (error)
                return next(new errorHandler_1.HttpError('Erreur lors de la récupération des utilisateurs', 500));
            res.send(results);
        });
    });
    // Endpoint pour récupérer un utilisateur
    router.get('/getUserById/:id', (req, res, next) => {
        const id = req.params.id; // Ici, userId prend la valeur du paramètre de route :id
        const sql = `SELECT * FROM users WHERE id = ?`;
        connection.query(sql, [id], (error, result) => {
            if (error)
                return next(new errorHandler_1.HttpError('Erreur lors de la récupération de l\'utilisateur', 500));
            res.send(result[0]);
        });
    });
    // Endpoint pour la connexion d'un utilisateur
    router.post('/login', (req, res, next) => {
        const { name, password } = req.body;
        const sql = `SELECT * FROM users WHERE name = ?`;
        connection.query(sql, [name], (error, result) => {
            if (error)
                return next(error);
            const user = result[0];
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Erreur lors de la comparaison des mots de passe');
                }
                if (isMatch) {
                    // Les mots de passe correspondent, l'utilisateur est authentifié
                    // Génération du token JWT
                    const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, auth_1.authConfig.secret, {
                        expiresIn: '1h'
                    });
                    // Envoi du token au client
                    res.json({ token });
                }
                else {
                    // Les mots de passe ne correspondent pas, échec de l'authentification
                    res.status(401).send('Mot de passe incorrect');
                }
            });
        });
    });
    // Endpoint pour créer un utilisateur
    router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { username, password } = req.body;
        // Vérifier si l'utilisateur existe déjà
        const checkUserQuery = `SELECT * FROM users WHERE name = '${username}'`;
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
        const hashedPassword = yield bcrypt.hash(password, 10);
        const sql = `INSERT INTO users ( name, password) VALUES ('${username}', '${hashedPassword}')`;
        connection.query(sql, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send('Erreur lors de la création de l\'utilisateur');
                return;
            }
            res.send(result);
        });
    }));
    // Endpoint pour mettre à jour un utilisateur existant
    router.put('/users/:id', (req, res) => {
        const userId = req.params.id;
        const { name, password } = req.body;
        const sql = `UPDATE users SET name = '${name}', password = '${password}' WHERE id = '${userId}'`;
        connection.query(sql, (error, result) => {
            if (error)
                throw error;
            res.send(result);
        });
    });
    // Endpoint pour supprimer un utilisateur
    router.delete('/users/:id', (req, res) => {
        const userId = req.params.id;
        const sql = `DELETE FROM users WHERE id = '${userId}'`;
        connection.query(sql, (error) => {
            if (error)
                throw error;
            res.send({ message: `Utilisateur avec l'ID ${userId} supprimé avec succès` });
        });
    });
    // Endpoint pour vérifier la présence d'un doublon
    router.get('/checkDuplicateUser/:username', (req, res) => {
        const username = req.params.username;
        const sql = `SELECT COUNT(*) AS count FROM users WHERE username = '${username}'`;
        connection.query(sql, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send(false);
            }
            else {
                const count = result[0].count;
                res.send(count > 0);
            }
        });
    });
    return router;
};
