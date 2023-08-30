// Endpoint pour récupérer toutes les pages
app.get('/api/pages', (req, res) => {
    connection.query('SELECT * FROM pages', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// Endpoint pour récupérer une page
app.get('/api/pages/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM pages WHERE id = '${id}'`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});

// Endpoint pour créer une page
app.post('/api/pages', (req, res) => {
    const { title, content } = req.body;

    // Validation des données
    if (!title || !content || title.trim() === '' || content.trim() === '') {
        console.log('Erreur de validation', req.body);
        return res.status(400).send({ error: 'Title and content cannot be empty' });
    }
    console.log(req.body);
    connection.query('INSERT INTO pages (title, content) VALUES (?, ?)', [title, content], (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

// Endpoint pour mettre à jour une page existante
app.put('/api/pages/:id', (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const sql = `UPDATE pages SET title = ?, content = ? WHERE id = ?`;
    connection.query(sql, [title, content, id], (err) => {
        if (err) {
            console.log(err);
            res.status(500).send('Erreur lors de la maj de la page');
        } else {
            res.status(200).send('Page maj avec succès');
        }
    });
});

// Endpoint pour supprimer une page
app.delete('/api/pages/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM pages WHERE id = ${id}`;
    connection.query(sql, (error) => {
        if (error) {
            throw error;
        }
        res.send({ message: `Page with id ${id} deleted succesfully` });
    });
});