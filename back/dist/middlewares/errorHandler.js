"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.HttpError = void 0;
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Classe d'erreur personnalisée pour gérer les codes d'état
class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.HttpError = HttpError;
// Gestionnaire d'erreurs middleware
const errorHandler = (err, req, res) => {
    console.error(err.stack); // Log de l'erreur dans la console
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    // Erreur interne du serveur par défaut
    res.status(500).json({ message: 'Une erreur interne est survenue' });
};
exports.errorHandler = errorHandler;
app.use(exports.errorHandler);
