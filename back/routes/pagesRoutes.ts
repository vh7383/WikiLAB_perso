import express from "express";
import { Connection } from "mysql2";
import { HttpError } from "../middlewares/errorHandler";

const router = express.Router();

export default (connection: Connection) => {

    // Endpoint pour récupérer toutes les pages
    router.get('/pages', (req, res, next) => {
        connection.query('SELECT * FROM pages', (error, results) => {
            if (error) return next(new HttpError('Erreur lors de la récupération des pages', 500));
            res.send(results);
        });
    });

    // Endpoint pour récupérer une page
    router.get('/pages/:id', (req, res, next) => {
        const id = req.params.id;
        const sql = `SELECT * FROM pages WHERE id = ?`;
        connection.query(sql, [id], (error, result: any[]) => {
            if (error) return next(new HttpError('Erreur lors de la récupération de la page', 500));
            res.send(result[0]);
        });
    });

    // Endpoint pour créer une page
    router.post('/pages', (req, res, next) => {
        const { title, content } = req.body;
        const sql = `INSERT INTO pages (title, content) VALUES (?, ?)`;
        // Validation des données
        if (!title || !content || title.trim() === '' || content.trim() === '') {
            return next(new HttpError('Title and content cannot be empty', 400));
        }
        connection.query(sql, [title, content], (error, result) => {
            if (error) return next(new HttpError('Erreur lors de la création de la page', 500));
            res.send(result);
        });
    });

    // Endpoint pour mettre à jour une page existante
    router.put('/pages/:id', (req, res, next) => {
        const { id, title, content } = req.body;
        const sql = `UPDATE pages SET title = ?, content = ? WHERE id = ?`;
        connection.query(sql, [title, content, id], (error) => {
            if (error) return next(new HttpError('Erreur lors de la mise à jour de la page', 500));
            res.send({ message: `Page with id ${id} updated succesfully` });
        });
    });

    // Endpoint pour supprimer une page
    router.delete('/pages/:id', (req, res, next) => {
        const id = req.params.id;
        const sql = `DELETE FROM pages WHERE id = ?`;
        connection.query(sql, [id], (error) => {
            if (error) return next(new HttpError('Erreur lors de la suppression de la page', 500));
            res.send({ message: `Page with id ${id} deleted succesfully` });
        });
    });

    return router;
}