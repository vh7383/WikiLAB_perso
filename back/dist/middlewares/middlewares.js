"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../environment/auth");
function default_1(app) {
    app.use((0, cors_1.default)());
    app.use(body_parser_1.default.json());
    // Vérification du token
    const jwtCheck = (req, res, next) => {
        const token = req.headers['authorization'];
        jsonwebtoken_1.default.verify(token, auth_1.authConfig.secret, (err, decoded) => {
            if (err)
                return res.status(401).send('Vous n\'êtes pas autorisé à accéder à cette ressource.');
            req.user = decoded;
            next();
        });
    };
    // Vérification du rôle de l'utilisateur
    const checkRole = (role) => {
        return (req, res, next) => {
            if (req.user.role !== role) {
                return res.status(403).send('Accès refusé, droits insuffisants.');
            }
            next();
        };
    };
    // Utilisation du middleware pour protéger ces route
    /*
    app.get('/api/users', jwtCheck, checkRole('admin'), (req: Request, res: Response) => {
        res.send('Vous avez accès à cette ressource car vous êtes authentifié comme administrateur.');
    });
    app.get('/api/register', jwtCheck, checkRole('admin'), (req: Request, res: Response) => {
        res.send('Vous avez accès à cette ressource car vous êtes authentifié comme administrateur.');
    });
    app.get('/api/users/:id', jwtCheck, checkRole('admin'), (req: Request, res: Response) => {
        res.send('Vous avez accès à cette ressource car vous êtes authentifié comme administrateur.');
    });

     */
}
exports.default = default_1;
