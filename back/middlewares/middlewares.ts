import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import {authConfig} from '../environment/auth';
import {Request, Response, NextFunction} from 'express';
import {User} from '../models/user.model';

// Ajout de la propriété user à l'objet Request
declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export default function (app: any) {
    app.use(cors());
    app.use(bodyParser.json());

    // Vérification du token
    const jwtCheck = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization'];
        jwt.verify(token as string, authConfig.secret, (err, decoded) => {
            if (err) return res.status(401).send('Vous n\'êtes pas autorisé à accéder à cette ressource.');
            req.user = decoded as User;
            next();
        });
    };

    app.use(jwtCheck);

    // Vérification du rôle de l'utilisateur
    const checkRole = (role: string) => {
        return (req: Request, res: Response, next: NextFunction) => {
            if (req.user.role !== role) {
                return res.status(403).send('Accès refusé, droits insuffisants.');
            }
            next();
        };
    };

    // Utilisation du middleware pour protéger ces route
    app.get('/api/users', jwtCheck, checkRole('admin'), (req: Request, res: Response) => {
        res.send('Vous avez accès à cette ressource car vous êtes authentifié comme administrateur.');
    });
    app.get('/api/register', jwtCheck, checkRole('admin'), (req: Request, res: Response) => {
        res.send('Vous avez accès à cette ressource car vous êtes authentifié comme administrateur.');
    });
    app.get('/api/users/:id', jwtCheck, checkRole('admin'), (req: Request, res: Response) => {
        res.send('Vous avez accès à cette ressource car vous êtes authentifié comme administrateur.');
    });
}