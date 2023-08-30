import express from 'express';
import mysql from 'mysql2';
import middlewares from "./middlewares/middlewares";
import router from "./routes/usersRoutes";
import {errorHandler} from "./middlewares/errorHandler";

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host     : '192.168.0.15',
  port     : 3011,
  user     : 'root',
  password : 'silab',
  database : 'WikiLAB'
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to Db:', error);
    process.exit(1); // Termine l'application avec un code d'erreur
  }
  console.log('Connection established');
});

middlewares(app);

// Gestion des routes
app.use('/api', router(connection));

// Utilisation du gestionnaire d'erreurs
app.use(errorHandler);

// Lancement du serveur
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});