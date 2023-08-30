import { Request, Response } from 'express';
const userService = require('./userService');
export const getUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await userService.getUserById(userId);
        res.json(user);
    } catch (error) {
        // Gestion des erreurs
    }
};
