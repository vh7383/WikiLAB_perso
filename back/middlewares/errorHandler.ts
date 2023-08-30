import express from 'express';

const app = express();

// Classe d'erreur personnalisée pour gérer les codes d'état
export class HttpError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

// Gestionnaire d'erreurs middleware
export const errorHandler: express.ErrorRequestHandler = (err, req, res) => {
    console.error(err.stack); // Log de l'erreur dans la console

    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    // Erreur interne du serveur par défaut
    res.status(500).json({ message: 'Une erreur interne est survenue' });
};

app.use(errorHandler);