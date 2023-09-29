"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql2_1 = __importDefault(require("mysql2"));
const middlewares_1 = __importDefault(require("./middlewares/middlewares"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const pagesRoutes_1 = __importDefault(require("./routes/pagesRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
const port = 3000;
const connection = mysql2_1.default.createConnection({
    host: '192.168.0.15',
    port: 3011,
    user: 'root',
    password: 'silab',
    database: 'WikiLAB'
});
const usersRoutes = (0, usersRoutes_1.default)(connection);
const pagesRoutes = (0, pagesRoutes_1.default)(connection);
connection.connect(error => {
    if (error) {
        console.error('Error connecting to Db:', error);
        process.exit(1); // Termine l'application avec un code d'erreur
    }
    console.log('Connection established');
});
(0, middlewares_1.default)(app);
// Gestion des routes
app.use('/api/users', usersRoutes);
app.use('/api/pages', pagesRoutes);
// Utilisation du gestionnaire d'erreurs
app.use(errorHandler_1.errorHandler);
// Lancement du serveur
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
